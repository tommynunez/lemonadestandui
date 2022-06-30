import { gql } from "@apollo/client";

export const UPDATE_LEMONADE_TYPE = gql`
    mutation updateLemonadeType($id: Int!, $lemonadeType: LemonadeTypeInput!) {
        updateLemonadeType(id: $id, lemonadeType: $lemonadeType)
    }
`;