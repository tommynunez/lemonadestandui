import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: Int!, $product: ProductMutationInput!) {
        updateProduct(id: $id,product: $product)
    }
`;