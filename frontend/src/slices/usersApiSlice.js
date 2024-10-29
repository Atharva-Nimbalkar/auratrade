import {USERS_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice=apiSlice.injectEndpoints({//The `injectEndpoints` function is used to add new endpoints to an existing API slice. It takes an object as an argument that contains the new endpoints to be added to the API slice.
    endpoints:(builder)=>({//define the API endpoints that your application will interact with
        login:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/auth`,
                method:'POST',
                body:data,
            }),
        }),
        register: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        // builder.mutation is used for creating, updating, or deleting data on the server. In this case, it is used to handle user logout by sending a POST request to the server
        logout: builder.mutation({
            query: ()=>({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        })
    }),
});


export const {useLoginMutation,useLogoutMutation,useRegisterMutation}=usersApiSlice;