import status from "http-status";
import catchAsync from "../utils/catchAsync";
import { OrderServices } from "./order.service";
import sendResponse from "../utils/sendResponse";

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

const getMyOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getMyOrdersFromDB(
    req.user.email,
    req.query,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Orders fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrderFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Orders fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getSingleOrderByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Order fetched successfully",
    data: result,
  });
});

const checkout = catchAsync(async (req, res) => {
  const result = await OrderServices.checkout(req.user.email, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Checkout successful",
    data: result,
  });
});

export const OrderControllers = {
  checkout,
  getMyOrders,
  getAllOrder,
  getSingleOrder,
};
