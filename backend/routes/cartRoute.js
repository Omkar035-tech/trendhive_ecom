import express from 'express'
import authUser from '../middleware/auth.js'
import { addtoCart, updateCart, getCartdetails } from '../controllers/cartController.js'

const cartRouter = express.Router();

cartRouter.post('/getcart', authUser, getCartdetails);
cartRouter.post('/addcart', authUser, addtoCart);
cartRouter.post('/updatecart', authUser, updateCart);

export default cartRouter;