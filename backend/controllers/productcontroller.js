import productModel from "../models/productmodel.js"
import { v2 as cloudinary } from 'cloudinary';

const addProduct = async (req, res) => {
    try {
        const { name, description, price, sizes, bestseller, category, subCategory } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item != undefined)
        const imagesUrl = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
            return result.secure_url
        }))
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        const product = new productModel(productData);
        await product.save();

        res.json({ sucess: true, msg: "Product data added sucessfully" })
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, msg: error.message })
    }
}


const totalProductlist = async (req, res) => {
    try {
        const productList = await productModel.find({});
        res.json({ sucess: true, productList })
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, msg: error.message })
    }
}

const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ sucess: false, msg: "Product ID is required" });
        }
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ sucess: false, msg: "Product not found" });
        }

        res.json({ sucess: true, msg: "Product removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ sucess: false, msg: "An error occurred while removing the product", error: error.message });
    }
};

const getSingleProductData = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId)
        res.json({ sucess: true, product })
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, msg: error.message })
    }
}

export { addProduct, totalProductlist, removeProduct, getSingleProductData }