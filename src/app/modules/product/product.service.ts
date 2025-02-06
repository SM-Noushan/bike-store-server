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

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const updateProductIntoDB = async (
  productId: string,
  productData: Partial<TProduct>,
) => {
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
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
