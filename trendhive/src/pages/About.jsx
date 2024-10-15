import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
    return (
        <div>
            <div className='text-2xl text-start pt-8 boorder-t'>
                <Title text1={"ABOUT"} text2={'US'} />
            </div>
            <div className='shadow-custom rounded-2xl p-4'>
                <div className='my-10 flex flex-col items-start md:flex-row gap-3'>
                    <img src={assets.contactUS} alt="" className='w-full lg:w-2/4 md:w-2/4  shadow-custom rounded-2xl' />
                    <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 shadow-custom rounded-2xl p-4'>
                        <p>At TrendHive, we're passionate about providing high-quality, stylish, and comfortable footwear for every occasion. Since our founding, we've committed ourselves to crafting shoes that blend fashion with function, catering to the unique tastes and needs of our diverse customers.</p>
                        <p>Whether you're stepping into the office, hitting the gym, or enjoying a casual weekend, TrendHive has the perfect pair to complement your lifestyle. We pride ourselves on delivering exceptional customer service and ensuring that every step you take is in comfort and confidence.</p>
                    </div>
                </div>
                <div className='my-10 flex flex-col items-start md:flex-row gap-3 '>
                    <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 shadow-custom rounded-2xl p-4'>
                        <b className='text-gray-800'>Our Mission</b>
                        <p>Our mission at TrendHive is to create footwear that empowers people to look and feel their best with every step. We strive to provide innovative designs, sustainable choices, and unparalleled comfort for all our customers. By focusing on quality craftsmanship and style, we aim to redefine what it means to wear shoes that not only fit but inspire confidence and individuality in every walk of life.</p>
                    </div>
                    <img src={assets.aboutus2} alt="" className='w-full lg:w-2/4 md:w-1/3 shadow-custom rounded-2xl' />
                </div>
            </div>


            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={"CHOOSE US"} />
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20 gap-5'>
                <div className='shadow-custom rounded-2xl p-4 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis rem ipsa veritatis magni hic iure laudantium commodi.</p>
                </div>
                <div className='shadow-custom rounded-2xl p-4 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis rem ipsa veritatis magni hic iure laudantium commodi.</p>
                </div>
                <div className='shadow-custom rounded-2xl p-4 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional customer service:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis rem ipsa veritatis magni hic iure laudantium commodi.</p>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default About