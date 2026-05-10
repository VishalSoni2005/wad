import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/", userRoutes);

mongoose
  .connect(
    "mongodb+srv://vsoni0882:%40Vishal0702@prisma-trail-bookmark-p.dr2pibz.mongodb.net/?retryWrites=true&w=majority",
  )
  .then(() => console.log("connection done"))
  .catch(() => console.log("connection failed"));

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Server working",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
