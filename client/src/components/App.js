import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
const Dashboard = () => <h2>Dashboard</h2>;
const NewMailing = () => <h2>New Mailing</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/mailings" component={Dashboard} />
          <Route path="/mailings/new" component={NewMailing} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
