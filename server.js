import express from "express";
import { config } from "dotenv";
import orderRoutes from "./routes/orderRouter.js";
import connectDB from "./dbConnect.js";

// Express App
const app = express();

// Body Parser
app.use(express.json());
// Read ENV file variables
config();

// Connect to MongoDB
connectDB();

// ROUTES
app.use("/api/orders", orderRoutes);

// SERVER LISTENING
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
