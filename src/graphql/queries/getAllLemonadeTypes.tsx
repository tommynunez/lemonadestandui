import { gql } from "@apollo/client";

export const GET_ALL_LEMONADE_TYPES = gql`
    query getLemonadeTypes($search: String!, $pageIndex: Int!, $pageSize: Int!, 
        $sortField: String!) {
        retrieveAllLemonadeTypes(
            search: $search,
            pageIndex: $pageIndex,
            pageSize: $pageSize,
            sortField: $sortField) {
            id
            name
        }
    }
`;