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
 {/* `<Outlet/>` is being used to render the child components defined in the routes configured for the parent component. (check index.js file has App component which embedded homescreen & ...) */}
         <Outlet/>
      </Container>
    </main> 
    <Footer/>
    </>
  )
}

export default App;