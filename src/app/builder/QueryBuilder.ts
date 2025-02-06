import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm: string = this.query.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field: string) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }
    return this;
  }

  filter() {
    const filterQueryObj = { ...this.query };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach(field => delete filterQueryObj[field]);

    const caseInsensitiveFilter: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(filterQueryObj)) {
      // Skip empty strings
      if (typeof value === "string" && value.trim() === "") continue;

      // If the value is an array, use $in
      if (Array.isArray(value)) {
        // You can optionally transform each element if needed (e.g., trim, etc.)
        caseInsensitiveFilter[key] = { $in: value };
      }
      // If the value is a string and contains a comma, split it and use $in
      else if (typeof value === "string" && value.includes(",")) {
        const vals = value
          .split(",")
          .map(v => v.trim())
          .filter(Boolean);
        if (vals.length) {
          caseInsensitiveFilter[key] = { $in: vals };
        }
      }
      // If the value is a string that looks numeric, convert to a number
      else if (
        typeof value === "string" &&
        !Number.isNaN(Number(value)) &&
        value.trim() !== ""
      ) {
        caseInsensitiveFilter[key] = Number(value);
      }
      // If the value is a number, add it directly
      else if (typeof value === "number" && !Number.isNaN(value)) {
        caseInsensitiveFilter[key] = value;
      }
      // Otherwise, treat non-empty strings with regex for case-insensitive matching.
      else if (typeof value === "string") {
        if (value === "true" || value === "false")
          caseInsensitiveFilter[key] = value === "true";
        else
          caseInsensitiveFilter[key] = {
            $regex: `^${value}$`,
            $options: "i",
          };
      }
      // Skip null, undefined, and other types
    }

    this.modelQuery = this.modelQuery.find(caseInsensitiveFilter);
    return this;
  }

  sort() {
    const sort: string =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const page: number = parseInt(this.query?.page as string) || 1;
    const limit: number = parseInt(this.query?.limit as string) || 0;
    const skip: number = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = (this.query?.fields as string)?.split(",")?.join(" ");
    this.modelQuery = this.modelQuery.select(fields || "");
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page: number = parseInt(this.query?.page as string) || 1;
    const limit: number = parseInt(this.query?.limit as string) || 0;
    const totalPages = limit ? Math.ceil(total / limit) : 1;
    return {
      page,
      limit,
      total,
      totalPages,
    };
  }
}

export default QueryBuilder;
