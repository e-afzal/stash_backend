import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // AMOUNT DETAILS
    amount_details: {
      amount_subtotal: {
        type: Number,
        required: true,
      },
      amount_total: {
        type: Number,
        required: true,
      },
      shipping_cost: {
        type: Number,
        required: true,
      },
    },
    // CUSTOMER DETAILS
    customer_details: {
      address: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postal_code: { type: String, required: true },
      },
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
    // LINE ITEMS
    lineItems: [
      {
        amount_subtotal: { type: Number, required: true },
        amount_total: { type: Number, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: {
          unit_amount: { type: Number, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
