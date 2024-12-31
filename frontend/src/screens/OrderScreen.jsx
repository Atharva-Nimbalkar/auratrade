import {useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Button,Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { 
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery ,
    useDeliverOrderMutation
} from '../slices/ordersApiSlice';
import {toast} from 'react-toastify';
import { PayPalButtons,usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
    const {id: orderId}=useParams();//get the orderId parameter from the URL path using the useParams hook
  
    const {data: order,refetch,isLoading,error}=useGetOrderDetailsQuery(orderId);//fetch order details from the server using the orderId parameter from the URL path and store the result in the order variable using the useGetOrderDetailsQuery hook

    const [payOrder,{isLoading : loadingPay}]=usePayOrderMutation();//create a payOrder mutation using the usePayOrderMutation hook to update the payment status of an order on the server 

    const [deliverOrder,{isLoading : loadingDeliver}]=useDeliverOrderMutation();//create a deliverOrder mutation using the useDeliverOrderMutation hook to update the delivery status of an order on the server

    const [{isPending},paypalDispatch]=usePayPalScriptReducer();//create a PayPal script reducer using the usePayPalScriptReducer hook to manage the loading state of the PayPal script 

    const {data : paypal,
        isLoading : loadingPayPal,
        error: errorPayPal,
    }=useGetPayPalClientIdQuery(); //fetch the PayPal client ID from the server and store the result in the paypal variable using the useGetPayPalClientIdQuery hook

    const {userInfo}=useSelector((state)=>state.auth);//get the userInfo object from the state using the useSelector hook

    useEffect(()=>{
        if(!errorPayPal && !loadingPayPal && paypal.clientId){//check if the PayPal client ID has been fetched successfully and is available in the paypal variable 
            const loadPayPalScript=async()=>{
                paypalDispatch({
                    type: 'resetOptions',//reset the options for the PayPal script 
                    value:{
                        'client-id' : paypal.clientId,//set the client ID for the PayPal script 
                        currency: 'USD',//set the currency for the PayPal script
                    }
                });
                paypalDispatch({//set the loading status of the PayPal script to pending 
                    type: 'setLoadingStatus',value : 'pending'});//
            }
            if(order && !order.isPaid){//check if the order details have been fetched successfully and the order has not been paid 
                if(!window.paypal){
                    loadPayPalScript();
                }
            }
        }
    },[order,paypal,paypalDispatch,loadingPayPal,errorPayPal]);
    // console.log(order);
    
    function onApprove(data,actions){//create an onApprove function that captures the payment details and updates the payment status of the order on the server
        return actions.order.capture().then(async function(details){//capture the payment using the PayPal API 
            try{
                await payOrder({orderId:order._id,details : {payer: {}}});//update the payment status of the order on the server using the payOrder mutation 
                refetch();
                toast.success('Order paid successfully');
            }catch(error){
                toast.error(error?.data?.message || error.error);
            }
        })
    }
    // async function onApproveTest(){//create an onApproveTest function that simulates a successful payment for testing purposes
    //     await payOrder({orderId,details: {payer:{}}});
    //     refetch();
    //     toast.success('Payment successful');
    // }
    function onError(err){//create an onError function that displays an error message if the payment fails
        toast.error(err.message);
    }
    function createOrder(data,actions){//
        return actions.order.create({
            purchase_units:[//create a purchase unit with the order total price
                {
                    amount:{
                        value:order.totalPrice,
                        currency_code:'USD'//optional
                    }
                }
            ]
        }).then((orderId)=>{
            return orderId;
        })
    }

    const deliverOrderHandler=async()=>{//create a deliverOrderHandler function that updates the delivery status of the order on the server
        try {
        await deliverOrder(orderId);
        refetch();
        toast.success('Order delivered');
      } catch (err){
        toast.error(err?.data?.message || err.message);
      }
    };
    console.log(order);
    return isLoading ? (
        <Loader/>
    )  : error ? (
        <Message variant='danger/'>{error.data.message}</Message>    
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
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
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

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}
                                        {isPending ? <Loader/> : (
                                            <div>
                                                {/* <Button onClick={onApproveTest} style={{marginBottom : '10px'}}>Test Pay Order</Button> */}
                                                <div>
                                                    <PayPalButtons 
                                                        createOrder={createOrder}
                                                        onApprove={onApprove}
                                                        onError={onError}
                                                    ></PayPalButtons>
                                                </div>
                                            </div>
                                         )}
                                    </ListGroup.Item>
                                )}

                                {loadingDeliver && <Loader/>}
                                {/* display a loading spinner while the order delivery status is being updated on the server */}

                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={()=>deliverOrderHandler(order._id)}>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default OrderScreen