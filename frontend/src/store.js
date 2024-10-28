import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store=configureStore({    
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    cart  : cartSliceReducer,
    auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

export default store;