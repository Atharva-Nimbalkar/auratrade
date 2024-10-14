import {createSlice} from '@reduxjs/toolkit';

const initialState=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[]};

//function to round off the decimal numbers to 2 decimal places
const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

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

            //calculate the items PRICE
            state.itemsPrice=addDecimals(state.cartItems.reduce((acc,item)=>
                acc+item.price*item.qty,0));

            //calculate the shipping PRICE
            state.shippingPrice=addDecimals(state.itemsPrice>100?0:10);

            //calculate the TAX PRICE
            state.taxPrice=addDecimals(Number((0.15*state.itemsPrice).toFixed(2)));
            
            //calculate the TOTAL PRICE
            state.totalPrice=(
                Number(state.itemsPrice)+
                Number(state.shippingPrice)+
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart',JSON.stringify(state));
        }
           
        }
    }
);

export const {addToCart}=cartSlice.actions//export as actions 

/* By exporting the reducer as the default export, it can be easily imported and combined with other reducers to create the root reducer for the Redux store. */
export default cartSlice.reducer;