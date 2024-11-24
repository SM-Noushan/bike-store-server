import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const getAllProductsFromDB = async (searchTerm: string) => {
  // search query
  const query = {
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { brand: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ],
  };
  const result = await Product.find(query);
  return result;
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
