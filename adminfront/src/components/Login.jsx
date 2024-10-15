import React from 'react'
import { useState } from 'react'
import { backendUrl } from '../App'
import assets from '../assets/assets'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendUrl + "/api/user/adminpanel",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ email, password })
                })
            const data = await response.json();
            if (data.sucess) {
                setToken(data.token);
            } else {
                toast.error(data.msg);
            }

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='flex justify-center items-center h-[100vh] w-full'>
            <div className='flex flex-col sm:w-[400px] w-[320px] shadow-slate-300 shadow-lg p-8 rounded-lg'>
                <h1 className='text-2xl text-black pb-4 font-semibold'>Admin Panel</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className='text-gray-600 text-lg pb-1.5 '>Email Address</p>
                        <input className='border border-gray-400 rounded-md px-4 py-2 text-lg w-full mb-2' type="email" name="" id="" placeholder='Enter your Email' required onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <p className='text-gray-600 text-lg pb-1.5 '>Password</p>
                        <div className='flex flex-row relative'>
                            <input className='border border-gray-400 rounded-md px-4 py-2 text-lg w-full mb-2' type={show ? "text" : "password"} name="" id="" placeholder='Enter your password' required onChange={(e) => { setPassword(e.target.value) }} />
                            <img className='w-8 h-8 absolute right-2 top-2 cursor-pointer' src={show ? assets.eyeopen : assets.eyeclose} alt="" onClick={() => setShow(!show)} />
                        </div>
                    </div>
                    <button className='w-full bg-black text-lg px-3 py-2 rounded-lg text-white mt-3' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login