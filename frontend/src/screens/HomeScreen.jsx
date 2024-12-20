import React from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom';
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousal from '../components/ProductCarousal';
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {
  const {pageNumber,keyword}=useParams();//get the page number from the URL using the `useParams` hook 
/* The line `const {data:products, isLoading, error} = useGetProductsQuery();` is using object
destructuring to extract specific properties from the return value of the `useGetProductsQuery`
hook. */
  const {data,isLoading,error}=useGetProductsQuery({
    keyword,
    pageNumber
  });


  return (
    <>
        {!keyword ? <ProductCarousal/> :  <Link to='/' classname='btn btn-light mb-4'>Go Back</Link>}
        {/* //If the keyword exists, display a link to go back to the home page */}
        {isLoading ?  
        (<Loader/>) : error ? (
          <Message variant='danger'>
          {error?.data?.message ||  error.error}
          </Message>
          ):(
          <>
                <h1>
                Latest Products
                </h1>
        <Row>
            {data.products.map((product)=>(
/* In this case, the column will take up 12 columns on small screens, 6 columns on
medium screens, 4 columns on large screens, and 3 columns on extra-large screens. */
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
            ))}
        </Row>
        <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : '' }/>
          </>)}
    </>
  );
}

export default HomeScreen