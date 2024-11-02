import {useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'


const PlacrOrderScreen = () => {
  const navigate=useNavigate();
  const cart=useSelector((state)=>state.cart);

  useEffect(()=>{
    if(!cart.shippingAddress.address){//if shipping address is not provided then navigate to shipping screen
      navigate('/shipping');
    }else if(!cart.paymentMethod){//if payment method is not provided then navigate to payment screen 
      navigate('/payment');
    }
  },[cart.paymentMethod,cart.shippingAddress.address,navigate])
  
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4/>
        <Row>
          <Col md={9}>Column</Col>
          <Col md={3}>Column</Col>
        </Row>
    </>
  )
}

export default PlacrOrderScreen