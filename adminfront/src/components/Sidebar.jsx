import React from 'react'
import { NavLink } from 'react-router-dom'
import assets from '../assets/assets'

const Sidebar = () => {
    return (
        <div className=' w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pl-[20%] text-[15px]'>
                <NavLink to="/add" className='flex items-center border gap-3 border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add items</p>
                </NavLink>
                <NavLink to="/lists" className='flex items-center border gap-3 border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>List items</p>
                </NavLink>
                <NavLink to="/orders" className='flex items-center border gap-3 border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                    <img className='w-5 h-5' src={assets.parcel_icon} alt="" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar