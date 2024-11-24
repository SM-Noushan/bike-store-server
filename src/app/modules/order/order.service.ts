import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};
const getTotalRevenueFromDB = async () => {
  const result = await Order.aggregate([
    // group by distinct product id and get order count
    {
      $group: {
        _id: "$product",
        orderQuantity: { $sum: "$quantity" },
      },
    },
    // match corresponding product from product collection and get product price
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    // calculate revenue for each product
    {
      $project: {
        _id: 0,
        revenue: {
          $multiply: [
            "$orderQuantity",
            { $arrayElemAt: ["$productDetails.price", 0] },
          ],
        },
      },
    },
    // calculate total revenue
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$revenue" },
      },
    },
  ]);
  return { totalRevenue: result[0]?.totalRevenue || 0 };
};

export const OrderServices = { createOrderIntoDB, getTotalRevenueFromDB };
