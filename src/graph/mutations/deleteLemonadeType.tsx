import { gql } from "@apollo/client";

export const DELETE_LEMONADE_TYPE = gql`
    mutation deleteLemonadeType($id: Int!) {
        deleteLemonadeType(id: $id)
    }
`;