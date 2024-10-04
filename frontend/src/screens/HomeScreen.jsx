import React from 'react'
import {useEffect,useState} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
// import products from '../products' // no longer needed as we are fetching products from backend
import axios from 'axios'
const HomeScreen = () => {
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    const fetchProducts=async()=>{
      const {data}=await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  },[]);
  return (
    <>
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
    </>
  )
}

export default HomeScreen