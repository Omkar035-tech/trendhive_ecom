import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext';
import { assets } from '../assets/assets';
import RealetedProd from '../components/RealetedProd';

const Product = () => {
    const { productID } = useParams();
    const { products, currency, cartItems, addToCart } = useContext(Shopcontext);
    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [selectedSize, setSelectedSize] = useState('')

    const fetchProductData = async () => {
        if (productID) {
            products.map((item) => {
                if (item._id == productID) {
                    console.log(productID)
                    setProductData(item);
                    setImage(item.image[0]);
                    return null;
                }
            })
        }
    }

    useEffect(() => {
        fetchProductData();

    }, [productID, products])


    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* prod data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* prod img */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-center sm:w-[18.7%] w-full'>

                        {
                            productData.image.map((item, index) => (<img src={item} onClick={() => setImage(item)} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border border-gray-300 rounded-2xl ' />))
                        }
                    </div>
                    <div className='flex items-center justify-centerw-full sm:w-[80%] border-gray-300 shadow-smooth rounded-2xl'>
                        <img className='w-full h-auto' src={image} alt="" />
                    </div>
                </div>
                {/* prod info */}
                <div className='flex-1 shadow-smooth rounded-2xl p-5'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_dull_icon} alt="" className='w-3 5' />
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => { setSelectedSize(item) }}
                                    className={`px-4 py-2 border-gray-200 border shadow-smooth rounded-lg bg-gray-100 ${selectedSize === item ? '!bg-gradient-to-r from-[#fdc527] to-[#fea01a] text-white' : ''}`} key={index}>
                                    {item}
                                </button>))}
                        </div>
                    </div>
                    <button className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3 text-sm active:bg-gray-700 shadow-smooth rounded-2xl' onClick={() => { addToCart(productData._id, selectedSize) }} >ADD TO CART</button>
                    <hr className='mt-8 sm:4/5 ' />
                    <div className='text-sm text-gray-500 mt-5 flex-col flex gap-1'>
                        <p>100% Original product</p>
                        <p>Cash on dilivery available</p>
                        <p>Easy return and exchange policy within 7 days</p>
                    </div>
                </div>
            </div>
            {/* disc and review */}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero repellat temporibus pariatur est eum atque magni placeat suscipit delectus animi quidem doloribus natus, fugit odit, perspiciatis, iste hic facere illum.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur debitis iste nisi corporis repudiandae voluptas illum quos sint dolore in ducimus inventore quae temporibus omnis sed eaque, tenetur totam repellendus.</p>
                </div>
            </div>
            {/* display related prod */}
            <RealetedProd subCategory={productData.subCategory} category={productData.category} />
        </div>
    ) : (<div className='opacity-0'></div>)
}

export default Product