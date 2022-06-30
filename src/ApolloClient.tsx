import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:5021/graphql',
    cache: new InMemoryCache(),
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    },

});