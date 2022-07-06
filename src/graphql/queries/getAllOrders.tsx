import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
    query getOrders {
        retrieveOrders {
            id
            firstName
            lastName
            email
            phone
            totalCost
            lineItems {
                cost
                product {
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
                quantity
            }
        }
    }
`;