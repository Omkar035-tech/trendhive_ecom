import React, { useState } from 'react'
import { useContext } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { toast } from "react-toastify";
import { useEffect } from 'react';

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const { setToken, token, navigate, backendURL } = useContext(Shopcontext);
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onsubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentState === "Sign Up") {
                const Response = await fetch(backendURL + "/api/user/register", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify(formData)
                });
                const data = await Response.json();
                if (data.sucess) {
                    console.log(data)
                    setToken(data.data.token)
                    localStorage.setItem("token", token)
                } else {
                    toast.error(data.msg)
                }
            } else {
                const Response = await fetch(backendURL + "/api/user/login", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({ email: formData.email, password: formData.password })
                });
                const data = await Response.json();
                if (data.sucess) {
                    console.log(data)
                    setToken(data.token)
                    localStorage.setItem("token", data.token)
                } else {
                    toast.error(data.msg)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])
    return (
        <form onSubmit={onsubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            {currentState === "Login" ? '' : <input type="text" onChange={(e) => setFormdata({ ...formData, name: e.target.value })} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
            <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' onChange={(e) => setFormdata({ ...formData, email: e.target.value })} required />
            <input type="password" onChange={(e) => setFormdata({ ...formData, password: e.target.value })} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer'>Forgot Your Password?</p>
                {
                    currentState === 'Login' ? (<p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p>) : (<p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Here</p>)
                }
            </div>
            <button className='bg-black text-white px-8 py-2 font-light mt-4'>{currentState === 'Login' ? "Sign In" : "Sign Up"}</button>
        </form>
    )
}

export default Login