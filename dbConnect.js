import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => console.log("Connected to DB"))
    .catch((err) => console.log(err.message));
}

export default connectDB;
