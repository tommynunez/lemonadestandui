import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://lemonadestand.happyfield-a4099696.eastus.azurecontainerapps.io/graphql',
    cache: new InMemoryCache(),
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    },

});