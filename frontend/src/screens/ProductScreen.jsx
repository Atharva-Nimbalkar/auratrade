/* The `useParams` hook is used to access the parameters of the current
route in a React component. It allows you to access the dynamic segments of the URL and use them
within your component to make decisions or display content based on those parameters. */
import { useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
// import products from '../products'; // no longer needed as we are fetching products from backend
import { useGetProductDetailsQuery,useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
const ProductScreen = () => {

    const {id:productId}=useParams();
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    // const product=products.find((p)=>p._id===productId);
    // console.log(product);

    const [qty,setQty]=useState(1);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState('');

    const {data:product,isLoading,refetch,error} =useGetProductDetailsQuery(productId);
    // console.log([...Array(product.countInStock).keys()])
   
    const [createReview,{isLoading:loadingProductReview}]=useCreateReviewMutation();

    const {userInfo}=useSelector((state)=>state.auth);  

    const addToCartHandler=()=>{
        dispatch(addToCart({...product,qty}));
        navigate('/cart');
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        try{
        await createReview({productId,rating,comment})
        .unwrap()//unwrap the promise returned by createReview mutation to get the actual data returned by the server 
        refetch();
        toast.success('Product Review Submitted');
        setRating(0);
        setComment('');
        }catch(err){
            toast.error(err?.data?.message  || 'Product already reviewed' || err.error);
        };
    }
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go back</Link>
            {isLoading ? (<Loader/>
            ) : error ? (
            <Message variant='danger'>
            {error?.data?.message ||  error.error}
            </Message>
            ) :  (// if product is not null
                <>
                <Meta title={product.name}/>
                <Row>
                <Col md={5}>
                <Image src={product.image} alt={product.name} fluid/>
                {/* fluid is to get smaller images/to make it responsive */}
                </Col>
                <Col md={4}>
                <ListGroup variant='flush'>
                    {/* `<ListGroup.Item>` component represents a separate item in the list group, allowing for a structured
and organized way to present product details to the user. */}
                <ListGroup.Item>
                    <h3>
                        {product.name}
                    </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description : {product.description}</ListGroup.Item>
                </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:
                                    </Col>
                                    <Col>
                                    <strong>${product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {/* if product is in stock then only show the quantity dropdown */}
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={(e)=>setQty(Number(e.target.value))}>
                                                  {[...Array(product.countInStock).keys()].map((x)=> (
                                                <option key={x+1} value={x+1}>
                                                            {x+1}
                                                </option>
                                                  ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock===0} onClick={addToCartHandler}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row className='review'>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length===0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review)=>(
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating}/>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a customer review</h2>
                            {loadingProductReview && <Loader/>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e)=>setRating(Number(e.target.value))}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control 
                                            as='textarea' 
                                            row='3' 
                                            value={comment} 
                                            onChange={(e)=>setComment(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button type='submit' disabled={loadingProductReview} variant='primary'>
                                        Submit
                                    </Button>
                                </Form>
                            ):(
                                <Message>
                                    Please <Link to='/login'>sign in</Link> to write a review{' '}
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
            )}
        </>
    )
}

export default ProductScreen;