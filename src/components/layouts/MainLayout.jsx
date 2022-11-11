import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from '../molecules/HomeHeader';
import HomeFooter from '../molecules/HomeFooter';
import styled from 'styled-components'

const MainLayout = () => {
  return (
    <Container className='MainLayout'>

      <HomeHeader />
      <main className='main-content'>
        <Outlet />
      </main>

      <HomeFooter />

    </Container >
  )
}

export default MainLayout

const Container = styled.div`
 &.MainLayout{
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .Header{

  }
  .main-content{
    flex: 1;
  }

 }
`