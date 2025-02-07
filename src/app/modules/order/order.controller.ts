import status from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { OrderServices } from "./order.service";
// import OrderValidationSchema from "./order.validation";

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const orderData: TOrder = req.body;

//     // validate the incoming data with the zod schema
//     const { success, data, error } = OrderValidationSchema.safeParse(orderData);
//     if (!success) throw error;

//     // create the product in the database
//     const result = await OrderServices.createOrderIntoDB(data);

//     res.status(200).json({
//       success: true,
//       message: "Order placed successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: (error as Error).message || "Failed to place Order",
//       error,
//       stack: (error as Error).stack,
//     });
//   }
// };

// const totalRevenue = async (req: Request, res: Response) => {
//   try {
//     const result = await OrderServices.getTotalRevenueFromDB();

//     res.status(200).json({
//       success: true,
//       message: "Revenue calculated successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: (error as Error).message || "Failed to calculate revenue",
//       error,
//       stack: (error as Error).stack,
//     });
//   }
// };

const checkout = catchAsync(async (req, res) => {
  const result = await OrderServices.checkout(req.user.email, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Checkout successful",
    data: result,
  });
});

export const OrderControllers = { checkout };
