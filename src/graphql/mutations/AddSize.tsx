import { gql } from "@apollo/client";

export const ADD_SIZE = gql`
    mutation addSize($size: SizeInput!) {
        insertSize(size: $size)
    }
`;