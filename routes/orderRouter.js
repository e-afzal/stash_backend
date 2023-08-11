import { Router } from "express";
const router = Router();

// LOCAL IMPORTS
import {
  findUserOrders,
  createOrder,
  findOrderById,
  deleteAllOrders,
  deleteOrderById,
  getSessionDetails,
} from "../controllers/orderController.js";

router.post("/", createOrder);
router.get("/", findUserOrders);
router.get("/:id", findOrderById);
router.delete("/", deleteAllOrders);
router.delete("/:id", deleteOrderById);
router.get("/stripe-retrieve/:id", getSessionDetails);

export default router;
