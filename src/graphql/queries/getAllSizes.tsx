import { gql } from "@apollo/client";

export const GET_ALL_SIZES = gql`
    query getSizes($search: String!, $pageIndex: Int!, $pageSize: Int!, 
        $sortField: String!) {
        retrieveAllSizes(
            search: $search,
            pageIndex: $pageIndex,
            pageSize: $pageSize,
            sortField: $sortField) {
            id
            name
        }
    }
`;