import { Outlet,Navigate } from "react-router-dom"
import {useSelector} from "react-redux";


const PrivateRoute = () => {
    const {userInfo}=useSelector((state)=>state.auth);

//The PrivateRoute component is used to protect routes that should only be accessible to authenticated users
    return userInfo ? <Outlet/> : <Navigate to="/login"  replace />;// The replace attribute ensures that the navigation replaces the current entry in the history stack, preventing the user from navigating back to the protected route using the browser's back button
} 

export default PrivateRoute