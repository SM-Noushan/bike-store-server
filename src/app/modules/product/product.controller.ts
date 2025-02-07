import status from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ProductServices } from "./product.service";

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bikes retrieved successfully",
    data: result.result,
    meta: result.meta,
  });
});

const getSingleProductById = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductByIdFromDB(
    req.params.productId,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bike retrieved successfully",
    data: result,
  });
});

const getAllBrandModelAndCategory = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllBrandModelAndCategoryFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Brands, Models and Category retrieved successfully",
    data: result,
  });
});

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Bike created successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProductIntoDB(
    req.params.productId,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  await ProductServices.deleteProductFromDB(req.params.productId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bike deleted successfully",
    data: {},
  });
});

export const ProductControllers = {
  getAllProducts,
  getSingleProductById,
  getAllBrandModelAndCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
