import {createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';
const initialState=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[]};



const cartSlice=createSlice({// The `createSlice` function is used to create a slice of the Redux store. The `createSlice` function takes an object as an argument that contains the name of the slice and the initial state of the slice.

/* specifying the name of the slice being created.used to identify the slice within the Redux store and can be used to access the slice state and reducers when needed. */
    name:"cart",
/* used to initialize the state of the Redux store slice named "cart". It is set to the value retrieved from localStorage if there is any data stored under the key "cart", otherwise, it is initialized with an empty array for the
   `cartItems` property. */
    initialState,
/* specify how the state of the slice should be updated in response to actions dispatched to the Redux store. */
    reducers: {
        addToCart:(state,action)=>{
/* In Redux, actions are plain JavaScript objects that contain a `type` field to identify the action type and a
`payload` field that can hold any data relevant to the action. */
            const item=action.payload;

            const existItem=state.cartItems.find((x)=>x._id===item._id);

            if(existItem){
                state.cartItems=state.cartItems.map((x)=>x._id===existItem._id?item:x);//update the existing item in the cart
            }else{
                state.cartItems=[...state.cartItems,item];//add the new item to the cart
            }
           
            return updateCart(state);
        },
        removeFromCart:(state,action)=>{
/*is removing an item from the `cartItems` array in the Redux store state based on a specific condition. */
            state.cartItems=state.cartItems.filter((x)=>x._id!==action.payload);

            return updateCart(state);
        }
    }
});

export const {addToCart,removeFromCart}=cartSlice.actions//export as actions 

/* By exporting the reducer as the default export, it can be easily imported and combined with other reducers to create the root reducer for the Redux store. */
export default cartSlice.reducer;