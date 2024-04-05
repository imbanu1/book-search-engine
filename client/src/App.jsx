import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient } from "@apollo/client";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";

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
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="*" element={<h1 className="display-2">Wrong Page!</h1>} />
        </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
