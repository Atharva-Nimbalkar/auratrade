import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import {Provider} from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
/* The `const router=createBrowserRouter()` creating a router instance using the
`createBrowserRouter`. This function is typically used to create a router object that can be used to define the routing configuration for a
React application. */
const router=createBrowserRouter(
  /* `createRoutesFromElements(` is a function that is used to create route configurations from React
  elements.The function takes React elements as input and generates route configurations based on those elements. */
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
    
    <Route path='' element={<PrivateRoute/>}>
      <Route path='/shipping' element={<ShippingScreen/>}/>
      <Route path='/payment' element={<PaymentScreen/>}/>
      <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
      <Route path='/orders/:id' element={<OrderScreen/>}/>
      <Route path='/profile' element={<ProfileScreen/>}/>
    </Route>

    <Route path='' element={<AdminRoute/>}>
      <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
      <Route path='/admin/productlist' element={<ProductListScreen/>}/>
    </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App */} 
 {/* `<RouterProvider router={router}/>`. It takes the `router` object created using
`createBrowserRouter()` and makes it available to the entire application as a context. This allows
components within the application to access and utilize the routing configuration defined by the
`router` object. */ }
     <Provider store={store}>
     {/* deferLoading={true} is used to defer the loading of the PayPal script until it is needed. This can help improve the performance of the application by reducing the initial load time. */}
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
