import React from "react";
import ReactDom from "react-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom"
import CustomersPages from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";

// any CSS you require will output into a single css file (app.css in this case)
require("../css/app.css");

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

console.log("Attention si tu voit ce message, supprimer la fenetre !!!!");

const App = () => {
  return (
    <HashRouter>
      <Navbar />

      <main className="container pt-5">
          <Switch>
              <Route path="/customers" component={CustomersPages}/>
              <Route path="/invoices" component={InvoicesPage}/>
              <Route path="/" component={HomePage}/>
          </Switch>
      </main>
    </HashRouter>
  );
};

ReactDom.render(<App />, document.querySelector("#app"));
