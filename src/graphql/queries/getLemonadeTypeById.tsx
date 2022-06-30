import { gql } from "@apollo/client";

export const GET_LEMONADE_TYPE_ID = gql`
    query getLemonadeTypeById($id: Int!) {
        retrieveLemonadeTypeById(id: $id) {
            id
            name
        }
    }
`;