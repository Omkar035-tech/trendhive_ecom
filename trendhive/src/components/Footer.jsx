import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className=''>
          <p className='pacifico-regular blue_gradient text-3xl mb-4'>trendHive</p>
          <p className='w-full md:w-2/3 text-gray-600'>At trendhive, we believe every step counts. Explore our curated collection of premium shoes designed for comfort, durability, and unmatched style. Whether you're looking for casual sneakers, formal footwear, or active sports shoes, we’ve got the perfect fit for every occasion. Shop now and elevate your walk with shoes that make a statement, wherever life takes you.</p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Dilivery</li>
            <li>Privecy policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+11 1285723999</li>
            <li>contact@ecom.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ trendHive.com. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer