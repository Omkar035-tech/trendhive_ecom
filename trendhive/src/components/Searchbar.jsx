import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const Searchbar = () => {
    const { searchString, setSearchString, showSearch, setShowsearch } = useContext(Shopcontext)
    const location = useLocation();
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (location.pathname.includes("/collection")) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location])

    const handleSearch = () => {
        console.log("hii")
    }

    return (
        <div >
            {
                showSearch && visible && (
                    <div className='p-6 flex flex-row items-center justify-center '>
                        <div className='lg:w-4/6 md:w-4/6 sm:w-4/6  relative flex '>
                            <input className='flex w-full outline-none px-5 py-3  bg-slate-100 rounded-full !border-4 !border-gray-300 glass-morp' type="text" placeholder='Search Products' onChange={(e) => { setSearchString(e.target.value) }} />
                            <img className='w-5 absolute right-6 top-4 bottom-0 cursor-pointer' src={assets.search_icon} alt="" onClick={handleSearch} />
                        </div>
                        <img className='w-3.5 mx-4 cursor-pointer' src={assets.cross_icon} alt="" onClick={() => { setShowsearch(false); setSearchString('') }} />
                        <hr />
                    </div>
                )
            }

        </div>
    )
}

export default Searchbar