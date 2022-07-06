import { gql } from "@apollo/client";

export const GET_SIZE_ID = gql`
    query getSizeById($id: Int!) {
        retrieveSizeTypeById(id: $id) {
            id
            name
        }
    }
`;