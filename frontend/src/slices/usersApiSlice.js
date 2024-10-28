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
    }),
});


export const {useLoginMutation}=usersApiSlice;