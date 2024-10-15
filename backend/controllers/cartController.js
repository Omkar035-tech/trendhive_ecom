import userModel from "../models/userModel.js"

// add to cart
const addtoCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)

        console.log(userData, userId)
        const cartData = await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ sucess: true, msg: 'Data added into cart' })

    } catch (error) {
        console.log(error)
        res.json({ sucess: false, msg: error.message })
    }
}
// update existing cart data
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ sucess: true, msg: 'cart Updated' })

    } catch (error) {
        console.log(error)
        res.json({ sucess: false, msg: error.message })
    }
}
// get cart details
const getCartdetails = async (req, res) => {
    try {

        const { userId } = req.body;

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData;

        res.json({ sucess: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ sucess: false, msg: error.message })
    }
}

export { addtoCart, updateCart, getCartdetails }