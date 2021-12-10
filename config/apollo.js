import { ApolloClient,createHttpLink,HttpLink,InMemoryCache} from "@apollo/client";

import {setContext} from 'apollo-link-context';

const httpLink=createHttpLink({
    
    uri: "https://secure-lake-99098.herokuapp.com/"
    
});


const authLink=setContext((_,{headers}) =>{

    const token=localStorage.getItem('token')
    return {
        headers:{
            ...headers,
            authorization:token? `${token}`:''
        }
    }

})

const client = new ApolloClient({
    
    cache: new InMemoryCache(),
    link:authLink.concat(httpLink)
   
});

export default client;

