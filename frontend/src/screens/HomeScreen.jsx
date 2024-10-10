import React from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {
/* The line `const {data:products, isLoading, error} = useGetProductsQuery();` is using object
destructuring to extract specific properties from the return value of the `useGetProductsQuery`
hook. */
  const {data:products,isLoading,error}=useGetProductsQuery();


  return (
    <>
        {isLoading ?  
        (<h2>Loading()...</h2>) : error ? (<div>{error?.data?.message ||  error.error}</div>):
          (<>
                <h1>
                Latest Products
                </h1>
        <Row>
            {products.map((product)=>(
/* In this case, the column will take up 12 columns on small screens, 6 columns on
medium screens, 4 columns on large screens, and 3 columns on extra-large screens. */
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
            ))}
        </Row>
          </>)}
    </>
  );
}

export default HomeScreen