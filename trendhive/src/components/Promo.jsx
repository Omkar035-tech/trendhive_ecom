
import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Shopcontext } from '../context/Shopcontext';


const Promo = () => {
    const { navigate } = useContext(Shopcontext)

    return (
        <div className='flex flex-col sm:flex-row text-white relative'>
            {/* Background Gradient for the promo section */}

            {/* {promo left} */}
            <div className='w-full sm:w-1/2 flex items-center justify-center sm:justify-start sm:text-left text-center py-10 sm:py-0 relative z-10'>
                <div className='text-[#414141]'>
                    <h1 className='text-3xl sm:py-2 lg:text-5xl leading-relaxed'>Step Into Style</h1>
                    <h1 className='pacifico-regular text-3xl sm:py-2 lg:text-5xl leading-relaxed '>
                        Discover Your <span className='underline decoration-violet-700 decoration-[7px] pacifico-regular text-3xl lg:text-5xl'>Perfect Pair</span>
                    </h1>
                    <div className='flex items-center gap-2 '>
                        <p className='pt-4 text-md md:text-base'>Engineered for performance, our running shoes are designed to keep up with your active lifestyle. Lightweight, durable, and cushioned for maximum comfort, they provide the perfect balance of support and flexibility. Run farther, faster, and in style.</p>
                        {/* <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p> */}
                    </div>
                    <button className='text-white bg-gradient-to-r from-indigo-600 to-purple-500 my-3 px-3 py-2 rounded-lg text-xl' onClick={() => navigate('/collection')}>Explore more</button>
                </div>
            </div>
            {/* {promo right} */}
            <div className='w-full sm:w-1/2 mt-0 sm:mt-4 relative z-10'>

                {/* Small Circles Beside the Central Square (Color Fall Effect) */}
                <div className="absolute w-6 h-6 bg-green-400 rounded-full blur-sm top-1/3 left-1/4"></div>
                <div className="absolute w-4 h-4 bg-[#78c102] rounded-full blur-md top-1/2 left-1/2"></div>
                <div className="absolute w-5 h-5 bg-violet-500 rounded-full blur-sm top-2/3 left-1/5"></div>
                <div className="absolute w-5 h-5 bg-green-400 rounded-full blur-sm bottom-1/4 right-1/3"></div>
                <div className="absolute w-6 h-6 bg-[#69af00] rounded-full blur-md bottom-1/5 right-1/4"></div>
                <img className='w-full animate-float' src={assets.mainShoe} alt="" />
            </div>
        </div >
    );
};

export default Promo;
