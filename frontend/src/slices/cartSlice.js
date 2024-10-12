import {createSlice} from '@reduxjs/toolkit';
const initialState=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[]}

const cartSlice=createSlice({// The `createSlice` function is used to create a slice of the Redux store. The `createSlice` function takes an object as an argument that contains the name of the slice and the initial state of the slice.

/* The `name: "cart"` in the `createSlice` function is specifying the name of the slice being created. This name is used to identify the slice within the Redux store and can be used to access the slice state and reducers when needed. */
    name:"cart",
/* The `initialState` variable in this code snippet is being used to initialize the state of the Redux store slice named "cart". It is set to the value retrieved from localStorage if there is
   any data stored under the key "cart", otherwise, it is initialized with an empty array for the
   `cartItems` property. */
    initialState,
/*  Reducers are functions that specify how the state of the slice should be updated in response to actions dispatched to the Redux store. */
    reducers: {}
});

export default cartSlice.reducer;