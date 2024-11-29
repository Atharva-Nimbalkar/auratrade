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
            }),
        }),
        // builder.mutation is used for creating, updating, or deleting data on the server. In this case, it is used to handle user logout by sending a POST request to the server
        logout: builder.mutation({
            query: ()=>({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        profile : builder.mutation({//builder.mutation is used for creating, updating, or deleting data on the server. In this case, it is used to handle user profile updates by sending a PUT request to the server 
            query: (data)=>({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: ()=>({
                url: USERS_URL,
            }),
            providesTags:['Users'],//In this case, the `Users` tag is specified, which means that the data fetched by the query will be tagged with `Users`.
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId)=>({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Users'],
        })
    }),
});


export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
}=usersApiSlice;