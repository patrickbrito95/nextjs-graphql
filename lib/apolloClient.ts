import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useMemo } from 'react';

let apolloClient;

function createApolloClient(){
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: "https://rickandmortyapi.com/graphql",
        }),
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState = null){
    const _apolloClient = apolloClient ?? createApolloClient();

    if(initialState){
        const existingCache = _apolloClient.extract();

        _apolloClient.cache.restore({...existingCache, ...initialState});
    }

    if(typeof window === "undefined") {
        return _apolloClient;
    }

    if(!ApolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState){
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store;
}