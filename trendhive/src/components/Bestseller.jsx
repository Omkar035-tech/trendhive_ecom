import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext';
import Title from '../components/Title'
import ProductItem from './ProductItem';
import { assets, testimonials } from '../assets/assets';

const Bestseller = () => {
    const [index, setIndex] = useState(0);

    const nextTestimonial = () => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };
    const { products } = useContext(Shopcontext);
    const [bestseller, setBestseller] = useState([]);

    useEffect(() => {
        const bestSellerProduct = products.filter(item => item.bestseller == true);
        setBestseller(bestSellerProduct.slice(0, 5));
    }, [products])
    return (
        <div className='my-10'>
            <div className='text-start text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className='w-full  text-xs sm:text-sm md:text-base text-gray-600'>
                    Explore our collection of best-selling shoes, where style meets comfort and quality. These top-rated favorites have been handpicked by our customers for their exceptional design and durability.
                </p>
            </div>
            <div className='flex items-center justify-start overflow-auto w-full pt-2 pb-8 pl-5 scroll-snap-x mandatory scroll-smooth'>
                {bestseller.map((item, index) => (<ProductItem key={index} id={item._id} image={item.image} price={item.price} name={item.name} description={item.description} />))}
            </div>

            <div className='text-start text-3xl py-8'>
                <Title text1={'REAL'} text2={'SATISFACTION'} />
                <p className='w-full  text-xs sm:text-sm md:text-base text-gray-600'>
                    At TrendHive, we pride ourselves on delivering exceptional quality and style in every pair of shoes. But don't just take our word for it—read what our happy customers have to say! From comfort and durability to standout designs, our community of shoe lovers shares their genuine experiences.
                </p>
            </div>
            <div className="md:bg-gray-100 bg-white p-0 md:p-8 rounded-lg max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={prevTestimonial} className="p-2 m-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300">
                        &#10094;
                    </button>
                    <div className="transition transform duration-500 ease-in-out">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <img
                                src={testimonials[index].image}
                                alt={testimonials[index].name}
                                className="w-24 h-24 rounded-full mr-4"
                            />
                            <div className="flex items-center mb-4">
                                {[...Array(testimonials[index].stars)].map((_, i) => (
                                    <span key={i} className="text-yellow-500">&#9733;</span>
                                ))}
                                {[...Array(5 - testimonials[index].stars)].map((_, i) => (
                                    <span key={i} className="text-gray-400">&#9733;</span>
                                ))}
                            </div>
                            <p className="text-gray-700 mb-2">{testimonials[index].description}</p>
                            <h4 className="font-semibold text-lg">{testimonials[index].name}</h4>
                        </div>
                    </div>
                    <button onClick={nextTestimonial} className="p-2 m-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300">
                        &#10095;
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Bestseller