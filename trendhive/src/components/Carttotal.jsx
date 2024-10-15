import React, { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'

const Carttotal = () => {
    const { getcartamout, currency, diliveryFee } = useContext(Shopcontext);

    return (
        <div className='w-full shadow-custom px-3 py-3 rounded-xl'>
            <div className='text-2xl '>
                <Title text1={"CART"} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm shadow-custom px-1.5 py-1.5 rounded-md mb-2 '>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{getcartamout()}.00</p>
                </div>
            </div>
            <div className='flex justify-between shadow-custom px-1.5 py-1.5 rounded-md mb-2 '>
                <p>Shipping Fee</p>
                <p>{currency}{diliveryFee}.00</p>
            </div>
            <div className='flex justify-between shadow-custom px-1.5 py-1.5 rounded-md mb-2 '>
                <b>Total</b>
                <b>{currency}{getcartamout() == 0 ? 0 : getcartamout() + diliveryFee}.00</b>
            </div>
        </div>
    )
}

export default Carttotal