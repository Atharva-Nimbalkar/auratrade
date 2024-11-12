import {apiSlice} from './apiSlice';
import { ORDERS_URL,LOGIN_URL } from '../constants';

export const ordersApiSlice=apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        createOrder: builder.mutation({//createOrder is a mutation that sends a POST request to the /api/orders endpoint to create a new order
               query: (order)=>({
                url : ORDERS_URL,
                method: 'POST',
                body: {...order}
               })
        }),
        getOrderDetails: builder.query({
            query: (orderId)=>({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder : builder.mutation({//payOrder is a mutation that sends a PUT request to the /api/orders/:id/pay endpoint to update an order's payment status
            query: (orderId,details)=>({
                url : `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details},
            }),
        }),
        getPayPalClientId: builder.query({
            query: ()=>({
                url: LOGIN_URL,
            }),
            keepUnusedDataFor: 5,
        })
    }),

});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery
}=ordersApiSlice;