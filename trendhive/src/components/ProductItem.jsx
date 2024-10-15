import React, { useState, useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const ProductItem = ({ id, image, name, price, description }) => {
    const [favorites, setFavorites] = useState({});
    const { currency } = useContext(Shopcontext);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional for smooth scrolling
        });
    };

    const toggleFavorite = (itemId) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [itemId]: !prevFavorites[itemId]
        }));
    };
    return (
        <div className='shadow-[0px_10px_30px_0px_rgba(0,0,0,0.05)] p-4 rounded-[35px] w-[260px] min-w-[260px] relative m-2 bg-white scroll-snap-align-center transition-all ease duration-200 border-2 border-white' >

            <div className='absolute z-2 right-0 top-0 m-8 text-[1.2rem]'>
                <img
                    className='w-4 cursor-pointer'
                    src={favorites[id] ? assets.fstar : assets.hstar} // Change icon based on favorite status
                    alt="Favorite Star"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent the Link onClick from firing
                        toggleFavorite(id);
                    }}
                />
            </div>
            <div className='w-full flex items-center justify-center h-[200px] rounded-[30px] bg-[#f5f5f5]'>
                <img className='w-[250px] transition-all ease duration-200' src={image[0]} alt="" />
            </div>
            <div className='w-full py-2 opacity-50 text-[0.8rem]'>
                <h1 className='pb-3 text-[14px] font-semibold'>{name}</h1>
                <p className='truncate-2-lines'>{description}</p>
            </div>
            <div className='w-full text-center font-bold p-2 pt-0 text-[1.1rem]'>{currency + price}</div>
            <div>
                <Link onClick={scrollToTop} to={`/product/${id}`}>
                    <button className='w-full p-4 bg-gradient-to-r from-[#fdc527] to-[#fea01a] border-0 rounded-[20px] text-white font-bold text-[1rem]'>Add to Cart</button>
                </Link>
            </div>


        </div>
    )
}

export default ProductItem