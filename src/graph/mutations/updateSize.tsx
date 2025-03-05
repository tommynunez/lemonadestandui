import { gql } from "@apollo/client";

export const UPDATE_SIZE = gql`
    mutation updateSize($id: Int!, $size: SizeInput!) {
        updateSize(id: $id, size: $size)
    }
`;