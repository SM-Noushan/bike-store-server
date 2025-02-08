import Stripe from "stripe";
import status from "http-status";
import config from "../../config";
import { Order } from "./order.model";
import AppError from "../errors/AppError";
import mongoose, { Types } from "mongoose";
import { Product } from "../product/product.model";
import { IOrder, TCheckout } from "./order.interface";

const createOrderIntoDB = async (orderData: IOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Order.create([orderData], { session });

    const { items } = orderData;
    const productIds = items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } }).session(
      session,
    );
    if (products.length !== productIds.length) {
      await session.abortTransaction();
      return false;
    }

    const updates = items.map(item => {
      const product = products.find(
        p => p._id.toString() === item.product.toString(),
      );

      if (!product) return false;

      if (product.quantity < item.quantity) return false;

      return Product.updateOne(
        { _id: item.product },
        { $inc: { quantity: -item.quantity } },
        { session },
      );
    });

    const results = await Promise.all(updates);

    if (results.includes(false)) {
      await session.abortTransaction();
      return false;
    }
    await session.commitTransaction();
    session.endSession();

    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    return false;
  } finally {
    session.endSession();
  }
};

// const getTotalRevenueFromDB = async () => {
//   const result = await Order.aggregate([
//     // group by distinct product id and get order count
//     {
//       $group: {
//         _id: "$product",
//         orderQuantity: { $sum: "$quantity" },
//       },
//     },
//     // match corresponding product from product collection and get product price
//     {
//       $lookup: {
//         from: "products",
//         localField: "_id",
//         foreignField: "_id",
//         as: "productDetails",
//       },
//     },
//     // calculate revenue for each product
//     {
//       $project: {
//         _id: 0,
//         revenue: {
//           $multiply: [
//             "$orderQuantity",
//             { $arrayElemAt: ["$productDetails.price", 0] },
//           ],
//         },
//       },
//     },
//     // calculate total revenue
//     {
//       $group: {
//         _id: null,
//         totalRevenue: { $sum: "$revenue" },
//       },
//     },
//   ]);
//   return { totalRevenue: result[0]?.totalRevenue || 0 };
// };

const checkout = async (email: string, payload: TCheckout[]) => {
  // Extract product IDs & prepare a quantity map
  const productIds = payload.map(item => new Types.ObjectId(item.id));
  // Use aggregation to filter, attach `orderQuantity`, and validate stock
  const products = await Product.aggregate([
    { $match: { _id: { $in: productIds } } },
    {
      $addFields: {
        orderQuantity: {
          $switch: {
            branches: payload.map(item => ({
              case: { $eq: ["$_id", new Types.ObjectId(item.id)] },
              then: item.quantity,
            })),
            default: 0,
          },
        },
      },
    },
    {
      $match: { $expr: { $gte: ["$quantity", "$orderQuantity"] } },
    },
  ]);
  //Validate if all requested products were found & met the stock condition
  if (products.length !== payload.length) {
    throw new AppError(
      status.BAD_REQUEST,
      "One or more products have insufficient stock or do not exist .",
    );
  }

  const stripe = new Stripe(config.stripeSecretKey as string, {
    apiVersion: config.stripeApiVersion as undefined,
  });

  const formattingItems = products.map(product => ({
    quantity: product.orderQuantity,
    price_data: {
      currency: "usd",
      unit_amount: product.price * 100,
      product_data: {
        name: product.name,
        description: product.description,
        images: [product.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: formattingItems,
    mode: "payment",
    success_url: `${config.clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.clientUrl}`,
    metadata: {
      email,
      products: JSON.stringify(payload),
    },
  });

  return session.id;
};

export const OrderServices = { checkout, createOrderIntoDB };
