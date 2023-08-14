import Order from "../models/order.js";
import { Stripe } from "stripe";
//! STRIPE SECRET
const stripe = new Stripe(
  "sk_test_51LMvKMJOhbFlN9vl544ryV91G9UwMJ92uCP3ANFmbAw9UI1L6gTqJxfYi0WZE17S9YrvjXnlexfJAQjysLuAQNQC00QdvAMlJV"
);

//* FIND ALL USER RELATED ORDERS
// PAGE: USER DASHBOARD OVERVIEW
const findUserOrders = async (req, res) => {
  //* Finding ALL orders based on the user "EMAIL"
  //? For more details on how its queried, refer section "Specify Equality Match on a Nested Field" here:
  //? https://www.mongodb.com/docs/upcoming/tutorial/query-embedded-documents/

  const { email } = req.body;
  try {
    const ordersFound = await Order.find({
      "customer_details.email": email,
    }).select("-__v -updatedAt");

    if (!ordersFound || ordersFound.length === 0)
      //* We send 'ordersFound' as an EMPTY ARRAY for it to be used during FRONTEND JSX conditional rendering
      //* i.e. if ordersFound is empty, show no order found. IF not empty, show the orders on frontend.
      return res.json({
        message: "Order(s) not found",
        status: "fail",
        orders: ordersFound,
      });

    return res.json({ status: "success", orders: ordersFound });
  } catch (error) {
    console.log(error.message);
  }
};

//* CREATE ORDER
const createOrder = async (req, res) => {
  //? "req.body" is to be received exactly as per the schema structure!
  //? And that is why we just dump it in the create function below.
  try {
    const order = await Order.create(req.body);

    if (!order)
      return res.json({ status: "fail", message: "Order not created" });

    return res.json({
      status: "success",
      message: "Order created successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

//* FIND ORDER BY ORDER ID
const findOrderById = async (req, res) => {
  //* Looking for "_id" allocated by MongoDB to the order
  const id = req.params.id;
  try {
    const orderFound = await Order.findById(id).select(
      "-__v -updatedAt -createdAt"
    );

    if (!orderFound)
      return res.json({ status: "fail", message: "Order not found" });

    return res.json({ status: "success", order: orderFound });
  } catch (error) {
    console.log(error.message);
  }
};

//* DELETE ALL ORDERS
const deleteAllOrders = async (req, res) => {
  Order.deleteMany()
    .then(() =>
      res.json({
        message: "All Orders deleted successfully",
        status: "success",
      })
    )
    .catch((err) => console.log(err.message));
};

//* DELETE ORDER BY ID
const deleteOrderById = async (req, res) => {
  const id = req.params.id;

  Order.findByIdAndDelete(id)
    .then(() =>
      res.json({ status: "success", message: "Order deleted successfully" })
    )
    .catch(() => console.log(error.message));
};

//* Fetch order details using Stripe Sessions ID
const getSessionDetails = async (req, res) => {
  try {
    // Retrieve SESSION
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    // Retrieve Line Items from that session
    const lineItems = await stripe.checkout.sessions.listLineItems(
      req.params.id
    );

    const session_details = {
      amount_details: {
        amount_subtotal: session.amount_subtotal,
        amount_total: session.amount_total,
        shipping_cost: session.shipping_cost.amount_total,
      },
      customer_details: session.customer_details,
      lineItems: lineItems.data,
    };

    res.json({ status: "success", session_details });
  } catch (err) {
    console.log(err.message);
  }
};

export {
  findUserOrders,
  createOrder,
  findOrderById,
  deleteAllOrders,
  deleteOrderById,
  getSessionDetails,
};
