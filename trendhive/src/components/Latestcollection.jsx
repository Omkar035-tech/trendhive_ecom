import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext';
import Title from './Title';
import ProductItem from './ProductItem';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom'

const Latestcollection = () => {
    const { products } = useContext(Shopcontext);
    const [latestProduct, setLatestProduct] = useState([]);

    const brandImages = [
        assets.nike,
        assets.jorden,
        assets.newbal,
        assets.addidas,
        assets.vans,
    ];
    useEffect(() => {
        setLatestProduct(products.slice(0, 10));
    }, [products])
    return (
        <div className='my-6'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'TOP'} text2={'BRANDS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Find your dream shoe pair from over 5000+ collection</p>
            </div>
            <div className="flex flex-wrap justify-center p-4">
                {brandImages.map((image, index) => (
                    <div
                        key={index}
                        className="w-32 h-32 border-4 p-2 border-gray-200 shadow-lg bg-white flex items-center justify-center ml-5 mb-5 rounded-lg"
                    >
                        <img
                            src={image}
                            alt={`brand-${index}`}
                            className="object-contain w-full h-full"
                        />
                    </div>
                ))}
            </div>
            {/* render products */}

            <div className='text-start py-8 text-3xl'>
                <Title text1={'OUR'} text2={'COLLECTIONS'} />
            </div>
            {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> */}
            <div className='flex items-center justify-start overflow-auto w-full pt-2 pb-8 pl-5 scroll-snap-x mandatory scroll-smooth'>
                {
                    latestProduct.map((item, index) =>
                        (<ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} description={item.description} />)
                    )
                }
                {latestProduct.length > 0 && (<Link to='/collection'><div className='bg-violet-600 px-2 py-2 rounded-lg whitespace-nowrap text-white ml-2'>
                    See More &#10095;
                </div></Link>)}
            </div>
        </div>
    )
}

export default Latestcollection;