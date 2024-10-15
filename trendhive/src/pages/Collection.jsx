import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets, products } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const { products, searchString, showSearch } = useContext(Shopcontext);
    const [showFilters, setShowFilters] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const [catagory, setCategory] = useState([]);
    const [subCatagory, setSubCategory] = useState([]);
    const [oPFilter, setOPFilter] = useState('');

    const handleChangeCat = (e) => {
        if (catagory.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }
    const handleChangeSubCat = (e) => {
        if (subCatagory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const handleOpfilter = (e) => {
        setOPFilter(e.target.value)
    }

    const handleapplyFilter = () => {
        let productFilter = products.slice();

        if (searchString && showSearch) {
            productFilter = productFilter.filter(item => item.name.toLowerCase().includes(searchString.toLowerCase()));
        }

        if (catagory.length > 0) {
            productFilter = productFilter.filter(item => catagory.includes(item.category))
        }
        if (subCatagory.length > 0) {
            productFilter = productFilter.filter(item => subCatagory.includes(item.subCategory))
        }
        if (oPFilter == 'low-high') {
            // for ascending data
            setFilterData(productFilter.sort((a, b) => a.price - b.price))
        } else if (oPFilter == 'high-low') {
            // for descending data
            setFilterData(productFilter.sort((a, b) => b.price - a.price))
        } else {
            setFilterData(productFilter)
        }
    }

    useEffect(() => {
        setFilterData(products);
    }, [products, catagory, subCatagory, searchString])

    useEffect(() => {
        handleapplyFilter();
    }, [catagory, subCatagory, oPFilter, searchString])

    const isChecked = (value) => subCatagory.includes(value);
    const isCheckedcategory = (value) => catagory.includes(value);
    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='w-60'>
                <p onClick={() => setShowFilters(!showFilters)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                    <img className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/* category filetrs */}
                <div className={`border p-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block shadow-[0px_10px_30px_0px_rgba(0,0,0,0.05)] rounded-lg`}>
                    <p className='mb-3 text-md font-semibold'>CATAGORIES</p>
                    <div className='flex flex-wrap items-center whitespace-nowrap flex-row gap-2 text-sm font-light text-gray-700'>
                        <label
                            htmlFor="men"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isCheckedcategory('men') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Men
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='men'
                                value={'men'}
                                onChange={handleChangeCat}
                            />
                        </label>

                        <label
                            htmlFor="women"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isCheckedcategory('women') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Women
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='women'
                                value={'women'}
                                onChange={handleChangeCat}
                            />
                        </label>
                        <label
                            htmlFor="kid"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isCheckedcategory('kid') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Kids
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='kid'
                                value={'kid'}
                                onChange={handleChangeCat}
                            />
                        </label>
                    </div>
                </div>
                {/* subcatagory */}
                <div className={` border p-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block shadow-[0px_10px_30px_0px_rgba(0,0,0,0.05)] rounded-lg`}>
                    <p className='mb-3 text-md font-semibold'>Types</p>
                    <div className='flex flex-wrap items-center whitespace-nowrap flex-row gap-2 text-sm font-light text-gray-700'>

                        <label
                            htmlFor="sneakers"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isChecked('sneakers') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Sneakers
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='sneakers'
                                value={'sneakers'}
                                onChange={handleChangeSubCat}
                            />
                        </label>
                        <label
                            htmlFor="formal"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isChecked('formal') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Formal
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='formal'
                                value={'formal'}
                                onChange={handleChangeSubCat}
                            />
                        </label>
                        <label
                            htmlFor="sports"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isChecked('sports') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Sports
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='sports'
                                value={'sports'}
                                onChange={handleChangeSubCat}
                            />
                        </label>
                        <label
                            htmlFor="sandals_slippers"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isChecked('sandals_slippers') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Sandals & Slippers
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='sandals_slippers'
                                value={'sandals_slippers'}
                                onChange={handleChangeSubCat}
                            />
                        </label>
                        <label
                            htmlFor="trek_trail"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isChecked('trek_trail') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Trek & Trail
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='trek_trail'
                                value={'trek_trail'}
                                onChange={handleChangeSubCat}
                            />
                        </label>
                        <label
                            htmlFor="heels"
                            className={`flex gap-2 border shadow-custom px-3 py-2 rounded-lg font-semibold border-gray-300 
        ${isChecked('heels') ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Heels
                            <input
                                type="checkbox"
                                className='w-3 hidden'
                                id='heels'
                                value={'heels'}
                                onChange={handleChangeSubCat}
                            />
                        </label>
                    </div>
                </div>
            </div>
            {/* rightside */}
            <div className='flex-1 '>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/* product sort */}
                    <select className='border-2 rounded-lg  border-gray-300 text-sm px-2' onChange={handleOpfilter}>
                        <option value="relevent">Sort By: Relevent</option>
                        <option value="low-high">Sort By: Low to High</option>
                        <option value="high-low">Sort By: High to Low</option>
                    </select>
                </div>
                <div className='flex items-center justify-center md:justify-start overflow-auto w-full pt-2 pb-8 pl-5 scroll-snap-x mandatory scroll-smooth flex-wrap'>
                    {filterData.map((item, index) => (<ProductItem id={item._id} name={item.name} image={item.image} price={item.price} key={index} description={item.description} />))}
                </div>
            </div>
        </div>
    )
}

export default Collection