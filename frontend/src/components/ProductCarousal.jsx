import {Link} from 'react-router-dom'
import {Carousel,Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'


const ProductCarousal = () => {
 
 const {data : products,isLoading,error}=useGetTopProductsQuery();//fetch the top products from the backend using the `useGetTopProductsQuery` hook 

 if (isLoading) return <Loader />;//if the data is still loading, display the loader component
 if (error) return <Message variant='danger'>{error?.data?.message || error.error || "an error occurred"}</Message>;//if there is an error, display the error message
 
 return  (
    <Carousel pause='hover' className='bg-primary mb-4'>
            {Array.isArray(products) && products.map((product)=>(
                <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>
                            {product.name} (${product.price})
                        </h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>)
};


export default ProductCarousal;