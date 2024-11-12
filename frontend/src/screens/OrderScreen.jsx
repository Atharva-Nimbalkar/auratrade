import {useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { 
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery 
} from '../slices/ordersApiSlice';
import {toast} from 'react-toastify';
import { PayPalButtons,usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
    const {id: orderId}=useParams();//get the orderId parameter from the URL path using the useParams hook
  
    const {data: order,refetch,isLoading,error}=useGetOrderDetailsQuery(orderId);//fetch order details from the server using the orderId parameter from the URL path and store the result in the order variable using the useGetOrderDetailsQuery hook

    const [payOrder,{isLoading : loadingPay}]=usePayOrderMutation();//create a payOrder mutation using the usePayOrderMutation hook to update the payment status of an order on the server 


    const [{isPending},paypalDispatch]=usePayPalScriptReducer();//create a PayPal script reducer using the usePayPalScriptReducer hook to manage the loading state of the PayPal script 

    const {data : paypal,
        isLoading : loadingPayPal,
        error: errorPayPal,
    }=useGetPayPalClientIdQuery(); //fetch the PayPal client ID from the server and store the result in the paypal variable using the useGetPayPalClientIdQuery hook

    const {userInfo}=useSelector((state)=>state.auth);//get the userInfo object from the state using the useSelector hook

    useEffect(()=>{
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript=async()=>{
                paypalDispatch({
                    type: 'resetOptions',
                    value:{
                        'client-id' : paypal.clientId,
                        currency: 'USD',
                    }
                });
                paypalDispatch({
                    type: 'setLoadingStatus',value : 'pending'});
            }
            if(order && !order.isPaid){
                if(!window.paypal){
                    loadPayPalScript();
                }
            }
        }
    },[order,paypal,paypalDispatch,loadingPayPal,errorPayPal]);
    // console.log(order);
    
    return isLoading ? (
        <Loader/>
    )  : error ? (
        <Message variant='danger/'/>
    ) : (
        <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name:</strong>{order.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong>{order.user.email}
                    </p>
                    <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                        <Message variant='success'>Delivered on {order.isDelivered}</Message>
                ):
                (
                    <Message variant='danger'>Not Delivered</Message>
                )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment method</h2>
                    <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                    ):(
                        <Message variant='danger'>Not Paid</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>
                        Order Items
                        {order.orderItems.map((item,index)=>
                            (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                    </h2>
                </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/* PAY ORDER PLACEHOLDER */}
                        {/* MARK AS DELIVERD PLACEHOLDER */}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default OrderScreen