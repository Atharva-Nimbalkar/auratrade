import {createApi,fetchBaseQuery} from  '@reduxjs/toolkit/query/react';

import {BASE_URL} from '../constants';  

// the Redux Toolkit query setup. It is created using the `fetchBaseQuery` function provided by Redux
// Toolkit. The `baseQuery` includes the base URL for the API requests, which is specified as
// `BASE_URL` imported from the `constants` file in this code snippet. This configuration will be used
// as the foundation for all API requests made through the API slice created using `createApi`. */
const baseQuery=fetchBaseQuery({baseUrl:BASE_URL});

export const apiSlice=createApi({
/* The `baseQuery` variable is being used to define the base configuration for making API requests in
/* The `tagTypes` property in the `createApi` function is used to define the types of tags that will be
associated with the API endpoints defined within the `apiSlice`. which means that the API
endpoints can be tagged with these specific types such as 'Product', 'Order', or 'User'. */
    baseQuery,
    tagTypes:['Product','Order','User'],
/* The `endpoints` is used to define the API endpoints that your application will interact with. the `endpoints` property is an empty
object `{}` which means that no specific endpoints are defined within the `apiSlice`. */
    endpoints: (builder)=>({}),
})