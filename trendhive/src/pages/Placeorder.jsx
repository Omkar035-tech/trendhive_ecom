import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { assets, products } from '../assets/assets'
import { Shopcontext } from '../context/Shopcontext'
import { toast } from 'react-toastify'

const Placeorder = () => {
    const { products, token, currency, diliveryFee, cartItems, addToCart, getCartCount, updateQuantity, getcartamout, navigate, backendURL, setCartItems } = useContext(Shopcontext);
    const [payMet, setPayMet] = useState('cod')
    const [formData, setFormdata] = useState({
        firstName: '',
        lastname: "",
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormdata(data => ({ ...data, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id == items))
                        if (itemInfo) {
                            itemInfo.sizes = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getcartamout() + diliveryFee,
            }
            switch (payMet) {
                // case for COD
                case 'cod':
                    const response = await fetch(backendURL + "/api/orders/place", {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'token': token
                        },
                        method: "POST",
                        body: JSON.stringify(orderData)
                    })
                    const data = await response.json();
                    if (data.sucess) {
                        setCartItems({})
                        navigate("/orders")
                        toast.success(data.msg)
                    } else {
                        toast.error(data.msg)
                    }

                    break;
                case 'stripe':
                    const responseStripe = await fetch(backendURL + '/api/orders/stripe', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'token': token
                        },
                        method: "POST",
                        body: JSON.stringify(orderData)
                    })
                    const dataStripe = await responseStripe.json();
                    console.log(dataStripe)
                    if (dataStripe.success) {
                        const { session_url } = dataStripe;
                        window.location.replace(session_url);
                    } else {
                        toast.error(dataStripe.data.message)
                    }

                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* left data */}
            <div className='flex flex-col w-full sm:max-w-[480px] shadow-custom p-3 rounded-xl gap-2 h-fit'>
                <div className='text-xl sm:text-2xl '>
                    <Title text1={"DILIVERY"} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3 mb-2'>
                    <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' />
                    <input required name='lastname' onChange={onChangeHandler} value={formData.lastname} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={formData.email} type="email" className='mb-2 border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={formData.street} type="text" className='border mb-2 border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />
                <div className='flex gap-3'>
                    <input required name='city' onChange={onChangeHandler} value={formData.city} type="text" className='border mb-2 border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter City' />
                    <input required name='state' onChange={onChangeHandler} value={formData.state} type="text" className='border mb-2 border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter State' />
                </div>
                <div className='flex gap-3'>
                    <input required name='zipcode' onChange={onChangeHandler} value={formData.zipcode} type="number" className='border border-gray-300 rounded py-1.5 mb-2 px-3.5 w-full' placeholder='Zipcode' />
                    <input required name='country' onChange={onChangeHandler} type="text" value={formData.country} className='border border-gray-300 rounded py-1.5 mb-2 px-3.5 w-full' placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={formData.phone} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone No' />
            </div>
            {/* right */}
            <div className=''>
                <div className='min-w-80'>
                    <Carttotal />
                </div>
                <div className='mt-5 shadow-custom p-3 rounded-xl'>
                    <div className='text-xl sm:text-2xl'>
                        <Title text1={"PAYMENT"} text2={"METHOD"} />
                    </div>
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setPayMet('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${payMet === "stripe" ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setPayMet('rezorpay')} title='Temporary Disabled' className='select-none pointer-events-none opacity-50 flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${payMet === "rezorpay" ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setPayMet('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${payMet === "cod" ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DILIVERY</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm shadow-custom rounded-full active:bg-slate-500'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Placeorder