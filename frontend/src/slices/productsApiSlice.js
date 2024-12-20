import {PRODUCTS_URL,UPLOAD_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice=apiSlice.injectEndpoints({//The `injectEndpoints` function is used to add new endpoints to an existing API slice. It takes an object as an argument that contains the new endpoints to be added to the API slice.
    endpoints:(builder)=>({//define the API endpoints that your application will interact with
        getProducts:builder.query({//The `getProducts` endpoint is defined using the `builder.query` method. This method is used to define a query endpoint that fetches data from the specified URL.
            query:({keyword,pageNumber})=>({
                url: PRODUCTS_URL,//fetch data wihtout axios
                params: { 
                    keyword,
                    pageNumber,
                },//The `params` option is used to specify the query parameters that should be included in the request URL. In this case, the `pageNumber` parameter is specified, which is used to fetch the products for a specific page number.
            }),
            providesTags:['Products'],//The `providesTags` option is used to specify the tags that should be added to the query result. In this case, the `Products` tag is specified, which means that the data fetched by the query will be tagged with `Product`.
/* The `keepUnseenDataFor: 5` option in the `getProducts` query configuration is setting a cache policy for the query result. It specifies that the data fetched by the query will be kept in the cache for
5 seconds even if it is not actively being used or seen by any component.  */
            keepUnseenDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId)=>({
                url : `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: ()=>({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags:['Product'],//this helps to user no need to reload page to see the updated data after creating a new product
            //The `invalidatesTags` option is used to specify the tags that should be invalidated when the mutation is executed. In this case, the `Product` tag is specified, which means that any data tagged with `Product` will be invalidated when the mutation is executed.
        }),
        updateProduct: builder.mutation({   
            query: (data)=>({
                url: `${PRODUCTS_URL}/${data.productId}`,//update the product by id 
                method: 'PUT',
                body: data,
            }),
            invalidatesTags:['Products'],
        }),
        uploadProductImage:builder.mutation({// This method is used to define a mutation endpoint that sends data to the specified URL. the `uploadProductImage` mutation sends an image file to the server to be uploaded. 
            query:(data)=>({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId)=>({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
         }),
         createReview : builder.mutation({
            query: (data)=>({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags:['Product'],
    }),
    getTopProducts: builder.query({//The `getTopProducts` endpoint is defined using the `builder.query` method. This method is used to define a query endpoint that fetches the top rated products from the specified URL.
        query:()=>({
            url: `${PRODUCTS_URL}/top`,
        }),
        keepUnusedDataFor: 5,
    })
    })
});

/* it is  exporting a specific hook called `useGetProductsQuery` from the `productsApiSlice` object. This hook is generated by the `apiSlice`
and `injectEndpoints` functions to provide access to the `getProducts` endpoint defined in the API slice. */
export const {useGetProductsQuery,useGetProductDetailsQuery,useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery
}=productsApiSlice;