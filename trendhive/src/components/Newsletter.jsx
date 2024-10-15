import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { mailBodyTemp } from '../assets/assets'

const Newsletter = () => {
    const initialData = {
        emailID: '',
        HTMLmsg: mailBodyTemp,
        subject: 'Step into Style! Get 20% Off Your First TrendHive Order 🎉',
        body: 'Sample body'
    };
    const [formData, setformData] = useState(initialData)

    const fireMail = async (e) => {
        console.log(process.env.REACT_APP_BREVO_API_KEY)
        e.preventDefault();
        try {
            // Make the POST request to Brevo API
            const response = await fetch(process.env.REACT_APP_SMTP_URL, {
                method: 'POST',
                headers: {
                    'api-key': process.env.REACT_APP_BREVO_API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender: { email: process.env.REACT_APP_SMTP_EMAIL },
                    to: [{ email: formData.emailID }],
                    subject: formData.subject,
                    htmlContent: formData.HTMLmsg,
                    textContent: formData.body,
                }),
            });

            if (response.status === 201) {
                toast.success('Mail sent to your mentioned email ID');
                setformData(initialData)
            } else {
                const errorData = await response.json();
                console.error('Error sending email:', errorData);
                toast.error('Mail sent to your mentioned email ID');
            }
        } catch (error) {
            console.error('Error sending email via Brevo API:', error);
        }
    };

    return (
        <div className='text-center flex flex-col items-center '>
            <p className=' font-medium text-gra-800 pacifico-regular blue_gradient text-2xl w-full'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>Join Now & Enjoy 20% Off Your First Purchase!</p>
            <form onSubmit={fireMail} className='w-full md:w-4/6 flex items-center gap-3 max-auto my-6 border rounded-full'>
                <div className='w-full flex p-1.5 moving-gradient rounded-full'>
                    <input className='flex-1 pl-3 rounded-l-full outline-none' type="email" name="" onChange={(e) => setformData({ ...formData, emailID: e.target.value })} value={formData.emailID} placeholder='Enter Your Email' required />
                    <button className='bg-black text-white text-xs px-10 py-4 rounded-r-full' type='submit'>SUBSCRIBE</button>
                </div>
            </form>
        </div>
    )
}

export default Newsletter