import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// global variables
const currency = 'inr'
const diliveryCharges = 10

// COD order placement
const placeCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }

        const orderFill = await orderModel(orderData);
        await orderFill.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ sucess: true, mes: "Order Placed" })

    } catch (error) {
        console.error(error.message)
        res.json({ sucess: false, mes: error.message })
    }
}
// stripe order placement
const placeStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        }
        const orderFill = await orderModel(orderData);
        await orderFill.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Dilivery Charges",
                },
                unit_amount: diliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${orderFill._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${orderFill._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.error(error.message)
        res.json({ sucess: false, mes: error.message })
    }
}

// verify stripe paymnet

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false })
        }
    } catch (error) {
        console.error(error.message)
        res.json({ sucess: false, mes: error.message })
    }
}

// Razor order placement
const placeRazor = async (req, res) => {
    try {

    } catch (error) {
        console.error(error.message)
        res.json({ sucess: false, mes: error.message })
    }
}
// admin order placement data
const placeOrderDetailsAdmin = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ sucess: true, orders })
    } catch (error) {
        console.error(error.message)
        res.json({ sucess: false, mes: error.message })
    }
}
// user order in frontend 
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })
        res.json({ sucess: true, orders })

    } catch (error) {
        console.error(error.message)
        res.json({ sucess: false, mes: error.message })
    }
}
// update order status in admin panel 
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        console.log(orderId, status);
        const orders = await orderModel.find({ orderId })
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status });
        if (!updatedOrder) {
            throw new Error("Order not found or could not be updated", orders);
        }

        res.json({ success: true, msg: "User order status updated", orders });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, msg: error.message });
    }
};


export { placeCOD, placeOrderDetailsAdmin, placeRazor, placeStripe, userOrders, updateOrderStatus, verifyStripe }