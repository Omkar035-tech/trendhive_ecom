import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js"
import mailRoute from "./routes/emailRoute.js";

// App config

const App = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middleware

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// api endpoint

App.use("/api/user", userRouter);
App.use("/api/product", productRouter);
App.use("/api/cart", cartRouter);
App.use("/api/orders", orderRouter);
App.use("/api/mail", mailRoute);


App.get('/', (req, res) => {
    res.send("API working")
})

App.listen(port, () => console.log("server started on Port: http://localhost:" + port));