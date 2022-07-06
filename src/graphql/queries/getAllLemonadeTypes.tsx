import { gql } from "@apollo/client";

export const GET_ALL_LEMONADE_TYPES = gql`
query getLemonadeTypes {
    retrieveAllLemonadeTypes{
        id
        name
    }
}
`;