import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/userRouter.js";
import path from 'path'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//Routes
app.use("/uploads", express.static(path.join("uploads")));
app.use("/api/users/", userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
