import { Product } from "./product.model";
import { TProduct } from "./product.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { ProductSearchableFields } from "./product.constant";

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productsQuery.modelQuery;
  const meta = await productsQuery.countTotal();

  return { meta, result };
};

const getSingleProductByIdFromDB = async (productId: string) => {
  const result = await Product.findById(productId);

  //   check if the document was found
  if (!result) throw new Error("Bike not found");
  return result;
};

const getAllBrandModelAndCategoryFromDB = async () => {
  const result = await Product.aggregate([
    {
      $project: {
        brand: { $toLower: "$brand" },
        model: { $toLower: "$model" },
        category: { $toLower: "$category" },
      },
    },
    {
      $group: {
        _id: null,
        brands: { $addToSet: "$brand" },
        models: { $addToSet: "$model" },
        categories: { $addToSet: "$category" },
      },
    },
    {
      $project: {
        _id: 0,
        brands: { $sortArray: { input: "$brands", sortBy: 1 } },
        models: { $sortArray: { input: "$models", sortBy: 1 } },
        categories: { $sortArray: { input: "$categories", sortBy: 1 } },
      },
    },
  ]);
  return result.length ? result[0] : { brands: [], models: [], categories: [] };
};

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const updateProductIntoDB = async (
  productId: string,
  productData: Partial<TProduct>,
) => {
  if (productData?.quantity === 0) productData.inStock = false;
  else productData.inStock = true;

  const result = await Product.findByIdAndUpdate(
    productId,
    { $set: productData },
    { new: true },
  );

  // check if the document was modified
  if (!result) throw new Error("Bike not found");
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);

  //   check if the document was deleted
  if (!result) throw new Error("Bike not found");
  return result;
};

export const ProductServices = {
  getAllProductsFromDB,
  getSingleProductByIdFromDB,
  getAllBrandModelAndCategoryFromDB,
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
