import React, { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
    const { backendURL, token, currency } = useContext(Shopcontext);
    const [orderData, setOrderData] = useState([])

    const getAllOrder = async () => {
        try {
            if (!token) { return null; }

            const response = await fetch(backendURL + "/api/orders/userorders", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: "POST",
                body: JSON.stringify({})
            })
            const data = await response.json();
            if (data.sucess) {
                console.log(data.orders)
                const orderFinArray = [];
                data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        orderFinArray.push(item);
                    })
                })
                setOrderData(orderFinArray.reverse());
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllOrder();
    }, [token])

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>
            <div className=''>
                {orderData.map((item, index) => (
                    <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-smooth rounded-lg px-4 mb-3'>
                        <div className='flex items-start gap-6 text-sm'>
                            <img src={item.image[0]} className='w-16' alt="" />
                            <div>
                                <p className='sm:text-base font-medium'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                    <p>{currency}{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Size: {item.sizes}</p>
                                </div>
                                <p>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                                <p>Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                            </div>
                        </div>
                        <div className='md:w-1/2 flex justify-between '>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className='text-sm md:text-base'>{item.status}</p>
                            </div>
                            <button onClick={getAllOrder} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track the Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders