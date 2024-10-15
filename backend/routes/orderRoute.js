import express from 'express'
import { placeCOD, placeOrderDetailsAdmin, placeRazor, placeStripe, userOrders, updateOrderStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminauth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

// admin Features
orderRouter.post("/allorder", adminAuth, placeOrderDetailsAdmin);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// payment feature
orderRouter.post("/place", authUser, placeCOD);
orderRouter.post("/stripe", authUser, placeStripe);
orderRouter.post("/razorpay", authUser, placeRazor);

// verify stripe

orderRouter.post('/verifystripe', authUser, verifyStripe);

// user feature
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
