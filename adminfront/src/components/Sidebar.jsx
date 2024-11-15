import React from 'react'
import { NavLink } from 'react-router-dom'
import { CirclePlus, List, Package } from 'lucide-react'

const Sidebar = () => {
    return (
        <div className=' w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 p-3 text-[15px]'>
                <NavLink to="/add" className='flex items-center border gap-3 border-gray-300 px-3 py-2 rounded-md'>
                    <CirclePlus size={18} />
                    <p className='hidden md:block'>Add items</p>
                </NavLink>
                <NavLink to="/lists" className='flex items-center border gap-3 border-gray-300  px-3 py-2 rounded-md'>
                    <List size={18} />
                    <p className='hidden md:block'>List items</p>
                </NavLink>
                <NavLink to="/orders" className='flex items-center border gap-3 border-gray-300  px-3 py-2 rounded-md'>
                    <Package size={18} />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar