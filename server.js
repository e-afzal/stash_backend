import express from "express";
const app = express();
// Read ENV file variables
import { config } from "dotenv";
config();
// Body Parser
app.use(express.json());

// ROUTES
import orderRoutes from "./routes/orderRouter.js";
import connectDB from "./dbConnect.js";

connectDB();

// ROUTES
app.use("/api/orders", orderRoutes);

// SERVER LISTENING
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
