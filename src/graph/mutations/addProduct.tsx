import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
    mutation addProduct($product: ProductMutationInput!) {
        insertProduct(product: $product)
    }
`;