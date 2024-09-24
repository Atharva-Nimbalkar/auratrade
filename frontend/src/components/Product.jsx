import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating';

const Product = ({product}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
{/* The line `<Card.Img src={product.image} variant="top"/>` is rendering an image inside a Bootstrap
Card component. It sets the `src` attribute of the image to the value of `product.image`, which is
likely a URL pointing to the image file. The `variant="top"` prop is specifying the placement of the
image within the Card component, in this case, at the top.  */}
            <Card.Img src={product.image} variant="top"/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
            {/* product-title class added to so card will not shrink irrespective of change in component elements*/}
                <Card.Title as="div" className='product-title'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <Rating value={product.rating} text={`${product.numReviews}reviews` }/>
            </Card.Text>
           {/* The `<Card.Text as="h3">` element is rendering a text element within a Bootstrap Card
           component. The `as="h3"` prop is specifying that the text should be rendered as an HTML
           `<h3>` element, which is a heading element with a specific semantic meaning in HTML.  */}
            <Card.Text as="h3">
            ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product