import { gql } from "@apollo/client";

export const GET_SIZE_BY_ID = gql`
    query getSizeById($id: Int!) {
        retrieveSizeTypeById(id: $id) {
            id
            name
        }
    }
`;