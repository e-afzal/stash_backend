import { Router } from "express";
const router = Router();

// LOCAL IMPORTS
// import { getOrders } from "../controllers/orderController.js";
import Order from "../models/order.js";

//? ROUTES

// CREATE ORDER
router.post("/", async (req, res) => {
  const { title } = req.body;

  const order = await Order.create({
    title,
  });

  if (!order) return res.json({ message: "Order not created", status: "fail" });
  return res.json({ message: "Order created successfully", status: "success" });
});

// FIND ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const ordersFound = await Order.find().select("-__v -updatedAt -createdAt");

    if (!ordersFound || ordersFound.length === 0)
      return res.json({ message: "Orders not found", status: "fail" });

    return res.json({ status: "success", orders: ordersFound });
  } catch (error) {
    console.log(error.message);
  }
});

// FIND ORDER BY ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const orderFound = await Order.findById(id).select(
      "-__v -updatedAt -createdAt"
    );

    if (!orderFound)
      return res.json({ message: "Order not found", status: "fail" });

    return res.json({ status: "success", order: orderFound });
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE ALL ORDERS
router.delete("/", async (req, res) => {
  Order.deleteMany()
    .then(() =>
      res.json({
        message: "All Orders deleted successfully",
        status: "success",
      })
    )
    .catch((err) => console.log(err.message));
});

// DELETE ORDER BY ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  Order.findByIdAndDelete(id)
    .then(() =>
      res.json({ status: "success", message: "Order deleted successfully" })
    )
    .catch(() => console.log(error.message));
});

export default router;
