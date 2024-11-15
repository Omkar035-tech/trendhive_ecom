import React from 'react'
import Promo from '../components/Promo'
import Latestcollection from '../components/Latestcollection'
import Bestseller from '../components/Bestseller'
import Policy from '../components/Policy'
import Newsletter from '../components/Newsletter'

const Home = () => {
    return (
        <div>
            <Promo />
            <Latestcollection />
            <Bestseller />
            <Policy />
            <Newsletter />
        </div>
    )
}

export default Home