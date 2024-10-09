export const BASE_URL=process.env.NODE_ENV==='development' ? 'http://localhost:5000' : '';
/*This is a common practice in web development to define different base URLs
for different environments (such as development, staging, production) to make it easier to switch
between them. */
export const PRODUCTS_URL='/api/products';
export const USERS_URL='api/users';
export const ORDERS_URL='/api/orders';
export const LOGIN_URL='/api/config/paypal';



