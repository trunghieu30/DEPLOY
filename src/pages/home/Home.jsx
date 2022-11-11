import React from 'react'
import HomeCarousel from '../home/HomeCarousel'
import HomeCard from './HomeCard'
import HomeMenu from './HomeMenu'

const Home = () => {
    return (
        <div className='overflow-hidden'>

            <HomeCarousel />
            <HomeCard />
            <HomeMenu />


        </div>
    )
}

export default Home