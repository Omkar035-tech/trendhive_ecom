import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'

const Navbar = () => {
    const { showSearch, setShowsearch, getCartCount, setToken, token, navigate, setCartItems } = useContext(Shopcontext)
    const [visible, setVisible] = useState(false);

    const handleLogout = async () => {
        setToken('');
        localStorage.removeItem("token")
        navigate('/login')
        setCartItems({});
    }

    return (
        // <div className='flex items-center justify-between py-4 px-4 shadow-custom rounded-lg mt-4 font-medium glass-morp '>
        <div>
            <div>
                <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-4 sm:px-6 md:px-8 lg:px-12 shadow-custom rounded-lg font-medium glass-morp max-w-[1200px] lg:mx-auto sm:mx-[50px] mx-[20px] mt-5 '>
                    <Link to='/'>
                        <p className='pacifico-regular blue_gradient sm:text-3xl text-xl '>trendHive</p>
                    </Link>
                    <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                        <NavLink to='/' className='flex flex-col items-center gap-1'>
                            <p>HOME</p>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                        </NavLink>
                        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                            <p>COLLECTIONS</p>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                        </NavLink>
                        <NavLink to='/about' className='flex flex-col items-center gap-1'>
                            <p>ABOUT</p>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                        </NavLink>
                        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                            <p>CONTACT</p>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                        </NavLink>
                    </ul>
                    <div className='flex items-center gap-6'>
                        <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' onClick={() => { setShowsearch(true) }} />
                        <div className='group relative'>
                            <img onClick={() => token ? "" : navigate("/login")} src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                            {token ? (<div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                                    <p className='cursor-pointer hover:text-black' onClick={() => navigate("/orders")}>Orders</p>
                                    <p className='cursor-pointer hover:text-black' onClick={handleLogout}>Logout</p>
                                </div>
                            </div>) : ""
                            }

                        </div>
                        <Link to='/cart' className='relative'>
                            <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                        </Link>
                        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
                    </div>

                    {/* Sidebar menu for small device */}


                </div>
            </div>
            <div>
                <div className={`fixed z-[1000] top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => { setVisible(false) }} className='cursor-pointer flex items-center gap-4 p-3'>
                            <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
                            <p>Back</p>
                        </div>
                        <NavLink className='py-2 pl-6 border' onClick={() => { setVisible(false) }} to='/' >HOME</NavLink>
                        <NavLink className='py-2 pl-6 border' onClick={() => { setVisible(false) }} to='/collection' >COLLECTION</NavLink>
                        <NavLink className='py-2 pl-6 border' onClick={() => { setVisible(false) }} to='/about' >ABOUT</NavLink>
                        <NavLink className='py-2 pl-6 border' onClick={() => { setVisible(false) }} to='/contact' >CONTACT</NavLink>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Navbar