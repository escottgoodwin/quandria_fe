import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: "https://quandria-be.herokuapp.com/"
});

sessionStorage.setItem('userid', 'cjp4m9m9h00230861x648ns55');
ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
