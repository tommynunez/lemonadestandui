import { gql } from "@apollo/client";

export const GET_ALL_SIZES = gql`
    query getSizes {
        retrieveAllSizes{
            id
            name
        }
    }
`;