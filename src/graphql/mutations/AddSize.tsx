import { DocumentNode, gql } from '@apollo/client';

export const ADD_SIZE: DocumentNode = gql`
	mutation addSize($size: SizeInput!) {
		insertSize(size: $size)
	}
`;
