import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';

/* The `const router=createBrowserRouter()` creating a router instance using the
`createBrowserRouter`. This function is typically used to create a router object that can be used to define the routing configuration for a
React application. */
const router=createBrowserRouter(
  /* `createRoutesFromElements(` is a function that is used to create route configurations from React
  elements.The function takes React elements as input and generates route configurations based on those elements. */
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 {/* `<RouterProvider router={router}/>`. It takes the `router` object created using
`createBrowserRouter()` and makes it available to the entire application as a context. This allows
components within the application to access and utilize the routing configuration defined by the
`router` object. */ }
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
