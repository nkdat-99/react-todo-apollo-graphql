import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    addTypename : false,
  })
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App></App>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
