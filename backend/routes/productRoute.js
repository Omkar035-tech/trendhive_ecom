import express from 'express';
import { addProduct, totalProductlist, removeProduct, getSingleProductData } from "../controllers/productcontroller.js";
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminauth.js';

const productRouter = express.Router();


productRouter.post("/add", adminAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }]
    ), addProduct)
productRouter.post("/delete", adminAuth, removeProduct)
productRouter.post("/single", getSingleProductData)
productRouter.get("/all", totalProductlist)


export default productRouter;