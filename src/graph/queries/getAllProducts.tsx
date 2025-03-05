import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
    query getProducts {
        products {
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