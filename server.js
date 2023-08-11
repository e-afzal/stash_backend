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

app.use(function (req, res, next) {
  const corsWhiteList = [
    "http://localhost:3000",
    "https://stash-ead.vercel.app",
  ];

  if (corsWhiteList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    // ROUTES
    app.use("/api/orders", orderRoutes);
    next();
  } else {
    return res.status(403).send("Access denied");
  }
});

// SERVER LISTENING
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
