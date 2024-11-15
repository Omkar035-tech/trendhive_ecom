import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { Package } from 'lucide-react'

const Order = ({ token }) => {

    const [orderData, setOrderData] = useState([])

    const getAllOrder = async () => {
        try {
            if (!token) { return null; }

            const response = await fetch(backendUrl + "/api/orders/allorder", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: "POST",
            })
            const data = await response.json();
            if (data.sucess) {
                setOrderData(data.orders);
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllOrder();
    }, [token])

    const handleOrderStatus = async (e, orderId) => {
        try {
            const response = await fetch(backendUrl + "/api/orders/status", {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json' // Add Content-Type
                },
                method: "POST",
                body: JSON.stringify({ orderId: orderId, status: e.target.value })
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.msg);
                getAllOrder();
            } else {
                toast.error(data.msg); // Use error for failures
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };


    return (
        <div className='shadow-custom rounded-xl p-3'>
            <h1 className='text-xl text-gray-600 py-3'>Order Page</h1>
            {
                orderData.map((item, index) => (
                    <div key={index} className='shadow-custom rounded-xl grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                        <Package size={50} />
                        <div className=''>
                            {
                                item.items.map((data, index) => {
                                    if (index == item.items.length - 1) {
                                        return <p key={index} className='text-lg text-gray-600'>{data.name} x {data.quantity} <span>{data.sizes}</span> </p>
                                    } else {
                                        return <p key={index} className='text-lg text-gray-600'>{data.name} x {data.quantity} <span>{data.sizes}</span> </p>
                                    }
                                })
                            }
                            <p className='text-md text-gray-600 text-lg font-medium pb-1.5 capitalize'>{item.address.firstName + " " + item.address.lastname}</p>
                            <p className='text-md text-gray-600  pb-1'>{item.address.street + " " + item.address.city + ", " + item.address.state + ", " + item.address.country + "- " + item.address.zipcode}</p>
                        </div>
                        <div className=''>
                            {
                                item.items.map((data, index) => {
                                    if (index == item.items.length - 1) {
                                        return <p key={index} className='text-md text-gray-600 pb-4'>Item: <span>{data.quantity}</span></p>
                                    }
                                })
                            }

                            <p className='text-md text-gray-600 text-md font-medium pb-1.5'>Method: <span>{item.paymentMethod}</span></p>
                            <p className='text-md text-gray-600  pb-1'>Payment: <span>{item.payment == true ? "Done" : "Pending"}</span></p>
                            <p className='text-md text-gray-600  pb-1'>Date: <span>{new Date(item.date).toDateString()}</span></p>
                        </div>
                        <div>
                            <p className='text-xl text-gray-600  pb-1'>{currency}{item.amount}</p>
                        </div>
                        <div>
                            <select className='border border-gray-500 px-2 py-3 text-lg outline-none rounded-md' value={item.status} onChange={(e) => handleOrderStatus(e, item._id)}>
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                ))
            }
            <div>

            </div>
        </div>
    )
}

export default Order