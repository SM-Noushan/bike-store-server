import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { ProductCategory } from "./product.interface";
import ProductValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: ProductCategory = req.body;

    // validate the incoming data with the zod schema
    const { success, data, error } =
      ProductValidationSchema.safeParse(productData);
    if (!success) throw error;

    // create the product in the database
    const result = await ProductServices.createProductIntoDB(data);

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error,
      stack: (error as Error).stack,
    });
  }
};

export const ProductControllers = { createProduct };
