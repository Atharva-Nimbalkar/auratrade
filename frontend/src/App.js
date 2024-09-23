import {Container} from 'react-bootstrap'
import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
const App = () => {
  return (
    <>
    <Header/>
    <main className='py-3'>
      <Container>
         {/* <HomeScreen/> */}
         <Outlet/>
      </Container>
    </main> 
    <Footer/>
    </>
  )
}

export default App;