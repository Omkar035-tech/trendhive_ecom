import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { Trash } from 'lucide-react'

const List = ({ token }) => {
    const [productData, setProductData] = useState([])
    const fetchAllProduct = async () => {
        try {
            const response = await fetch(backendUrl + "/api/product/all", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: "GET",
            })
            const data = await response.json();
            if (data.sucess) {
                setProductData(data.productList)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchAllProduct();
    }, [])

    const handleDeleteItem = async (id) => {
        try {
            const response = await fetch(backendUrl + "/api/product/delete", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: "POST",
                body: JSON.stringify({ id: id })
            })
            const data = await response.json();
            if (data.sucess) {
                toast.success(data.msg);
                fetchAllProduct();
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
                <h1 className='text-xl text-gray-600 py-3'>All Products List</h1>
                <div>
                    <div className='shadow-custom rounded-md mb-3 hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                        <p className='text-lg text-gray-500 font-semibold'>Image</p>
                        <p className='text-lg text-gray-500 font-semibold'>Name</p>
                        <p className='text-lg text-gray-500 font-semibold'>Category</p>
                        <p className='text-lg text-gray-500 font-semibold'>Price</p>
                        <p className='text-lg text-gray-500 font-semibold text-center'>Action</p>
                    </div>
                </div>
                <div>
                    {
                        productData.length > 0 ? productData.map((item, index) => (
                            <div key={index} className='shadow-custom rounded-md mb-3 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm my-2'>
                                <img className='w-12' src={item.image[0]} alt="" />
                                <p className='capitalize'>{item.name}</p>
                                <p className='capitalize'>{item.category}</p>
                                <p>{item.price}</p>
                                <button className='flex items-center justify-center' disabled={true}>
                                    <Trash size={18} />
                                </button>
                            </div>
                        )) : ""
                    }

                </div>
            </div>
        </div>
    )
}

export default List