import { gql } from "@apollo/client";

export const DELETE_LEMONADE_TYPE = gql`
    mutation deleteSize($id: Int!) {
        deleteSize(id: $id)
    }
`;