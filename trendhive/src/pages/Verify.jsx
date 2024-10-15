import React from 'react'
import { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import { toast } from 'react-toastify'

const Verify = () => {
    const { navigate, token, setCartItems, backendURL } = useContext(Shopcontext);
    const [searchParams, setSearchParam] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await fetch(backendURL + '/api/orders/verifystripe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({ success, orderId })
            })

            const data = await response.json();
            if (data.success) {
                toast.success('Payment Done 😌')
                navigate('/orders');
            } else {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token])

    return (
        <div>Verify</div>
    )
}

export default Verify