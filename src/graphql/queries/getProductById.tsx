import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_ID = gql`
    query getProductbyId($id: Int!) {
        retrieveProductById(id: $id) {
            id
            size {
                id
                name
            }
            lemonadeType {
                id
                name
            }
            amount
        }
    }
`;