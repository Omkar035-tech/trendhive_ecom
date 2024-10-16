import React, { useState } from "react";
import { useContext } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { assets } from "../assets/assets";

const Login = () => {
    const [isActive, setIsActive] = useState(false);

    const [currentState, setCurrentState] = useState('Login');
    const { setToken, token, navigate, backendURL } = useContext(Shopcontext);
    const initialValue = {
        name: "",
        email: "",
        password: ""
    }
    const [formData, setFormdata] = useState(initialValue)
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
                    // setToken(data.token)
                    // localStorage.setItem("token", token)
                    console.log(data)
                    setFormdata(initialValue)
                    toast.success('You Have succesfully register To TrendHive 🎉🎉, Hurry up and Login Now!')
                    setIsActive(false)
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
        <div className={`flex items-center justify-center h-full mt-28 ${isActive ? "container-active" : ""}`}>
            <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-custom overflow-hidden">

                {/* Sign-up form */}
                <div className={`absolute top-0 h-full sm:w-1/2 w-full transition-all duration-600
                ${isActive ?
                        "sm:translate-x-full translate-x-0 opacity-100 z-5" :
                        "opacity-0 z-1 "

                    }`}>
                    <form onSubmit={onsubmit} className="flex flex-col items-center justify-center h-full p-10">
                        <h1 className="text-2xl font-bold">Create Account</h1>
                        <div className="flex mt-5 space-x-3">
                            <a href="#" className="p-3 border rounded-full opacity-50" title="Avialable Soon.."><img className="w-4" src={assets.facebook} alt="" /></a>
                            <a href="#" className="p-3 border rounded-full  opacity-50" title="Avialable Soon.."><img className="w-4" src={assets.google} alt="" /></a>
                        </div>
                        <span className="mt-3">or use your email for register</span>
                        <input type="text" placeholder="Full Name" onChange={(e) => setFormdata({ ...formData, name: e.target.value })} value={formData.name} required className="w-full p-3 mt-3 bg-gray-200 rounded-md" />
                        <input type="email" onChange={(e) => setFormdata({ ...formData, email: e.target.value })} required placeholder="Email" value={formData.email} className="w-full p-3 mt-3 bg-gray-200 rounded-md" />
                        <input type="password" placeholder="Password" value={formData.password} className="w-full p-3 mt-3 bg-gray-200 rounded-md" onChange={(e) => setFormdata({ ...formData, password: e.target.value })} required />
                        <div className="flex items-end w-full sm:hidden ">
                            <p className="mt-3 text-md font-semibold" onClick={() => setIsActive(false)}>Sign In</p>
                        </div>
                        <button className="mt-5 px-8 py-2 bg-purple-700 text-white rounded-md uppercase font-semibold">Sign Up</button>
                    </form>
                </div>

                {/* Sign-in form */}
                <div className={`absolute top-0 h-full sm:w-1/2 w-full z-2 transition-all sm:block  duration-600 ${isActive ? "translate-x-[-100%]" : ""}`}>
                    <form onSubmit={onsubmit} className="flex flex-col items-center justify-center h-full p-10">
                        <h1 className="text-2xl font-bold">Sign In</h1>
                        <span className="mt-3">or use your email and password</span>
                        <input type="email" value={formData.email} onChange={(e) => setFormdata({ ...formData, email: e.target.value })} placeholder="Email" className="w-full p-3 mt-3 bg-gray-200 rounded-md" required />
                        <input type="password" placeholder="Password" value={formData.password} className="w-full p-3 mt-3 bg-gray-200 rounded-md" onChange={(e) => setFormdata({ ...formData, password: e.target.value })} required />
                        <div className="flex items-center justify-between w-full">
                            <a href="#" className="mt-3 text-md">Forgot Password?</a>
                            <p className="mt-3 text-md font-semibold sm:hidden block" onClick={() => setIsActive(true)}>Sign Up</p>
                        </div>
                        <button className="mt-5 px-8 py-2 bg-purple-700 text-white rounded-md uppercase font-semibold">Sign In</button>
                    </form>
                </div>

                {/* Toggle Section */}
                <div className={`absolute top-0 left-1/2 sm:w-1/2 w-full sm:block hidden h-full overflow-hidden transition-all duration-600 ${isActive ? "translate-x-[-100%] rounded-r-full" : "rounded-l-full"}`}>
                    <div className="relative w-[200%] h-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white transition-all duration-600">

                        {/* Left panel for toggle */}
                        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center p-10 text-center transition-all duration-600 ${isActive ? "" : "translate-x-[-200%]"}`}>
                            <h1 className="text-2xl font-bold">Welcome Back!</h1>
                            <p className="mt-5 text-sm">Enter your personal details to use all of the site's features.</p>
                            <button
                                className="mt-5 px-8 py-2 bg-transparent border-2 border-white text-white rounded-md uppercase font-semibold"
                                onClick={() => { setIsActive(false); setCurrentState('Login') }}
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Right panel for toggle */}
                        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center p-10 text-center transition-all duration-600 ${isActive ? 'translate-x-[200%]' : ''}`}>
                            <h1 className="text-2xl font-bold">Hello, Subscriber!</h1>
                            <p className="mt-5 text-sm">Register with your personal details to use all of the site's features.</p>
                            <button
                                className="mt-5 px-8 py-2 bg-transparent border-2 border-white text-white rounded-md uppercase font-semibold"
                                onClick={() => { setIsActive(true); setCurrentState('Sign Up') }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Login;
