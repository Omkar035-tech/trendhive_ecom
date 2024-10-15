import React from 'react'
import assets from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center py-4 px-[4%] justify-between'>
            <Link to='/'>
                <p className='pacifico-regular blue_gradient text-3xl'>trendHive</p>
            </Link>
            <button onClick={() => setToken("")} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full sm:text-sm text-xl'>Logout</button>
        </div>
    )
}

export default Navbar