/* The `useParams` hook is used to access the parameters of the current
route in a React component. It allows you to access the dynamic segments of the URL and use them
within your component to make decisions or display content based on those parameters. */
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import products from '../products'; // no longer needed as we are fetching products from backend
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
const ProductScreen = () => {

    const {id:productId}=useParams();
    // const product=products.find((p)=>p._id===productId);
    // console.log(product);

    const {data:product,isLoading,error} =useGetProductDetailsQuery(productId);
   
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go back</Link>
            {isLoading ? (<Loader/>
            ) : error ? (
            <Message variant='danger'>
            {error?.data?.message ||  error.error}
            </Message>
            ) : (
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
                            
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock===0}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
           
        </>
    )
}

export default ProductScreen;