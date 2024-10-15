import React, { useEffect, useState } from 'react'
import assets from '../assets/assets'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
// require('dotenv').config()

const Add = ({ token }) => {
    const validFormdata = new FormData();
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [previewImg, setPreviewImg] = useState({ image1: null, image2: null, image3: null, image4: null })

    const initialData = {
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        name: '',
        description: "",
        category: '',
        subCategory: "",
        price: "",
        sizes: [],
        bestseller: false
    }
    const [formData, setFormData] = useState(initialData)

    const toggleSizeSelection = (size) => {
        setSelectedSizes((prevSelectedSizes) =>
            prevSelectedSizes.includes(size) ? prevSelectedSizes.filter((selectedSize) => selectedSize !== size) : [...prevSelectedSizes, size]
        );
    };
    useEffect(() => {
        setFormData({ ...formData, sizes: selectedSizes })
    }, [selectedSizes])
    const handleAddProduct = async () => {
        try {
            validFormdata.append("image1", formData.image1)
            validFormdata.append("image2", formData.image2)
            validFormdata.append("image3", formData.image3)
            validFormdata.append("image4", formData.image4)
            validFormdata.append("name", formData.name)
            validFormdata.append("description", formData.description)
            validFormdata.append("category", formData.category)
            validFormdata.append("subCategory", formData.subCategory)
            validFormdata.append("bestseller", formData.bestseller)
            validFormdata.append("sizes", JSON.stringify(formData.sizes))
            validFormdata.append("price", formData.price)
            console.log(validFormdata)
            const response = await fetch(backendUrl + "/api/product/add", {
                headers: {
                    'token': token
                },
                method: "POST",
                body: validFormdata
            })
            const data = await response.json();
            if (data.sucess) {
                toast.success(data.msg)
                setFormData(initialData)
            } else {
                toast.error(data.msg)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <div className='shadow-custom rounded-xl p-3'>
                <h1 className='text-xl text-gray-600 py-2'>Upload Image</h1>
                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img className='w-20 ' src={previewImg.image1 ? previewImg.image1 : assets.upload_area} alt="" />
                        <input
                            type="file"
                            onChange={(e) => {
                                setFormData({ ...formData, image1: e.target.files[0] });
                                setPreviewImg({ ...previewImg, image1: URL.createObjectURL(e.target.files[0]) })
                            }}
                            id="image1"
                            className='hidden' />
                    </label>
                    <label htmlFor="image2">
                        <img className='w-20 ' src={previewImg.image2 ? previewImg.image2 : assets.upload_area} alt="" />
                        <input
                            type="file"
                            onChange={(e) => {
                                setFormData({ ...formData, image2: e.target.files[0] });
                                setPreviewImg({ ...previewImg, image2: URL.createObjectURL(e.target.files[0]) })
                            }}
                            id="image2"
                            className='hidden' />
                    </label>
                    <label htmlFor="image3">
                        <img className='w-20 ' src={previewImg.image3 ? previewImg.image3 : assets.upload_area} alt="" />
                        <input
                            type="file"
                            onChange={(e) => {
                                setFormData({ ...formData, image3: e.target.files[0] });
                                setPreviewImg({ ...previewImg, image3: URL.createObjectURL(e.target.files[0]) })
                            }}
                            id="image3"
                            className='hidden' />
                    </label>
                    <label htmlFor="image4">
                        <img className='w-20' src={previewImg.image4 ? previewImg.image4 : assets.upload_area} alt="" />
                        <input
                            type="file"
                            onChange={(e) => {
                                setFormData({ ...formData, image4: e.target.files[0] });
                                setPreviewImg({ ...previewImg, image4: URL.createObjectURL(e.target.files[0]) })
                            }}
                            id="image4"
                            className='hidden' />
                    </label>
                </div>
                <h1 className='text-xl text-gray-600 py-2'>Product Name</h1>
                <input onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} type="text" className='w-full md:w-[500px] px-3 py-2.5 border border-gray-500 border-1 rounded-md text-xl' placeholder='Type Here' value={formData.name} />
                <h1 className='text-xl text-gray-600 py-2'>Product description</h1>
                <textarea onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} className='w-full md:w-[500px] px-3 py-2.5 border border-gray-500 border-1 rounded-md text-xl' value={formData.description} name="" id="" />
                <div className='flex flex-col md:flex-row gap-6'>
                    <div className='flex flex-col'>
                        <h1 className='text-xl text-gray-600 py-2 '>Product category</h1>
                        <select onChange={(e) => { setFormData({ ...formData, category: e.target.value }) }} value={formData.category} className='px-3 py-2 border border-gray-500 border-1 rounded-md text-xl' name="" id="">
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kid">Kid</option>
                        </select>
                    </div>
                    <div className='flex flex-col  '>
                        <h1 className='text-xl text-gray-600 py-2'>Product subcategory</h1>
                        <select onChange={(e) => { setFormData({ ...formData, subCategory: e.target.value }) }} value={formData.subCategory} className='px-3 py-2 border border-gray-500 border-1 rounded-md text-xl' name="" id="">
                            <option value="sneakers">Sneakers</option>
                            <option value="formal">Formal</option>
                            <option value="sports">Sports</option>
                            <option value="sandals_slippers">Sandals & Slippers</option>
                            <option value="trek_trail">Trek & Trail</option>
                            <option value="heels">Heels</option>
                        </select>
                    </div>
                    <div className='flex flex-col pr-4 '>
                        <h1 className='text-xl text-gray-600 py-2'>Product Price</h1>
                        <input onChange={(e) => { setFormData({ ...formData, price: e.target.value }) }} value={formData.price} className='px-3 py-2 border w-[140px] border-gray-500 border-1 rounded-md text-xl' type="number" name="" id="" />
                    </div>
                </div>
                <div>
                    <h1 className='text-xl text-gray-600 py-2'>Product Sizes</h1>
                    <div className='flex flex-row gap-3 mb-3'>
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div key={size}>
                                <p
                                    className={`px-3 py-2 text-xl cursor-pointer ${selectedSizes.includes(size) ? 'bg-black text-white' : 'bg-gray-200'}`}
                                    onClick={() => { toggleSizeSelection(size) }}
                                >
                                    {size}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex gap-3 items-center mb-3'>
                    <input onChange={(e) => { setFormData({ ...formData, bestseller: e.target.checked }) }} type="checkbox" checked={formData.bestseller} className='w-[25px] h-[25px]' />
                    <h1 className='text-xl text-gray-600 py-2'>Add to best seller</h1>
                </div>
                <button onClick={handleAddProduct} className='rounded-lg bg-black text-white text-xl px-4 py-3'>ADD</button>
            </div>
        </div>
    )
}

export default Add