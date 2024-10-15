import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify'
import { Shopcontext } from '../context/Shopcontext';
import { mailBodyTemp } from '../assets/assets'

const Newsletter = () => {
    const { backendURL } = useContext(Shopcontext);
    const initialData = {
        emailID: '',
        HTMLmsg: mailBodyTemp,
        subject: 'Step into Style! Get 20% Off Your First TrendHive Order 🎉',
        body: ''
    };
    const [formData, setformData] = useState(initialData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendURL}/api/mail/firemail`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(formData),
            });

            const data = await response.json();  // Await the response to properly parse JSON

            if (data.success) {
                toast.success(data.msg);
                setformData(initialData)
            } else {
                toast.error(data.msg);  // Show error message using toast
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Something went wrong, please try again later.');
        }
    };
    return (
        <div className='text-center flex flex-col items-center '>
            <p className=' font-medium text-gra-800 pacifico-regular blue_gradient text-2xl w-full'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>Join Now & Enjoy 20% Off Your First Purchase!</p>
            <form onSubmit={handleSubmit} className='w-full md:w-4/6 flex items-center gap-3 max-auto my-6 border rounded-full'>
                <div className='w-full flex p-1.5 moving-gradient rounded-full'>
                    <input className='flex-1 pl-3 rounded-l-full outline-none' type="email" name="" onChange={(e) => setformData({ ...formData, emailID: e.target.value })} value={formData.emailID} placeholder='Enter Your Email' required />
                    <button className='bg-black text-white text-xs px-10 py-4 rounded-r-full' type='submit'>SUBSCRIBE</button>
                </div>
            </form>
        </div>
    )
}

export default Newsletter