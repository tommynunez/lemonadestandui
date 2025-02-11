import { gql } from "@apollo/client";

export const ADD_LEMONADE_TYPE = gql`
    mutation addLemonadeType($lemonadeType: LemonadeTypeInput!) {
        insertLemonadeType(lemonadeType: $lemonadeType)
    }
`;