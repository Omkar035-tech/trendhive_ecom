import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'

const Navbar = ({ setToken }) => {
    const sendEmail = () => {
        window.location = "mailto:omkarapandkar4u@gmail.com";
    }
    return (
        <div className='flex items-center py-4 px-[4%] justify-between'>
            <Link to='/'>
                <p className='pacifico-regular blue_gradient text-3xl'>trendHive</p>
            </Link>
            <div>
                <button onClick={sendEmail} className='mx-3 bg-violet-600 text-teal-50 px-3 py-1.5 rounded-md'>Request Demo</button>
                <button onClick={() => setToken("")} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full sm:text-sm text-md'> <LogOut size={18} /></button>
            </div>
        </div>
    )
}

export default Navbar