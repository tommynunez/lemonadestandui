import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
    mutation addOrder($order: OrderInput!) {
        insertOrder(order: $order)
    }
`;