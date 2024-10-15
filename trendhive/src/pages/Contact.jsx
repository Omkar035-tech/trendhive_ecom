import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const Contact = () => {
    return (
        <div>
            <div className='text-start text-2xl pt-10 border-t'>
                <Title text1={"CONTACT"} text2={"US"} />
            </div>
            <div className='shadow-custom rounded-2xl p-4 my-10 flex flex-col justify-between md:flex-row gap-3 mb-28'>
                <img src={assets.newCont} className='shadow-custom rounded-2xl w-full md:max-w-[480px]' alt="" />
                <div className='shadow-custom rounded-2xl p-4 flex flex-col justify-center items-start gap-8 w-full'>
                    <p className='font-semibold text-xl text-gray-500'>Our Store</p>
                    <p className='text-gray-500'>427, Hive state Near Opera mall <br /> Washington, United State.</p>
                    <p className='text-gray-500'>Tel: (415) 837783782 <br />Email: test@gmail.com</p>
                    <p className='text-gray-500 font-semibold text-xl'>Careers At TRENDHIVE</p>
                    <p className='text-gray-500'>Learn More about our team</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default Contact