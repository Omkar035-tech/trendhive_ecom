import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title';
import ProductItem from './ProductItem';

const RealetedProd = ({ category, subCategory }) => {
    const { products } = useContext(Shopcontext);
    const [relatedProd, setRelatedProd] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let prodCopy = products.slice();
            prodCopy = prodCopy.filter(item => category === item.category);
            prodCopy = prodCopy.filter(item => subCategory === item.subCategory);

            setRelatedProd(prodCopy.slice(0, 5))
        }
    }, [products])
    return (
        <div className='my-24'>
            <div className='text-start text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='flex items-center justify-center md:justify-start overflow-auto w-full pt-2 pb-8 pl-5 scroll-snap-x mandatory scroll-smooth flex-wrap'>
                {relatedProd.map((item, index) => (<ProductItem key={index} id={item._id} image={item.image} price={item.price} name={item.name} description={item.description} />))}
            </div>
        </div>
    )
}

export default RealetedProd