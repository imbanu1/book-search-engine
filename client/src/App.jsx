import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./SavedBooks";

import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

const client = new ApolloClient ({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setCoontext({
      headers: {
        authorization: token ? `Bearer ${token}` : ","
    },
  });
},
uri: "/graphq1",
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <>
        <Navbar/>
        <Switch>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="*" element={<h1 className="display-2">Wrong Page!</h1>} />
        </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
