import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
// import User from './components/User';
// import Test from './pages/Test/Test';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";

import client from "./apollo";
import App from './App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
