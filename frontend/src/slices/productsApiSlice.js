import {PRODUCTS_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice=apiSlice.injectEndpoints({//The `injectEndpoints` function is used to add new endpoints to an existing API slice. It takes an object as an argument that contains the new endpoints to be added to the API slice.
    endpoints:(builder)=>({//define the API endpoints that your application will interact with
        getProducts:builder.query({//The `getProducts` endpoint is defined using the `builder.query` method. This method is used to define a query endpoint that fetches data from the specified URL.
            query:()=>({
                url: PRODUCTS_URL,//fetch data wihtout axios
            }),
/* The `keepUnseenDataFor: 5` option in the `getProducts` query configuration is setting a cache policy for the query result. It specifies that the data fetched by the query will be kept in the cache for
5 seconds even if it is not actively being used or seen by any component.  */
            keepUnseenDataFor: 5,
        }),
    }),
});

export const {useGetProductsQuery}=productsApiSlice;