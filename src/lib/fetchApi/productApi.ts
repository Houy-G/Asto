import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {ProductDetailType, ProductType} from "@/app/types/productTypes";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    tagTypes: ["Product"],

    endpoints: (builder) => ({
        getProducts: builder.query<{products: ProductType[]}, void>({
            query: () => `products`, // fetch all without params
            providesTags: ["Product"],
        }),

        getProductById: builder.query<ProductDetailType, number>({
            query: (id) => `products/${id}`, // fetch by id
            providesTags: (result, error, id) => [{ type: "Product", id }],
        }),
        deleteProduct: builder.query<ProductDetailType, number>({
            query: (id)=>`products/${id}`,
            providesTags: (result, error, id) => [{ type: "Product", id }],
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useDeleteProductQuery,
} = productsApi