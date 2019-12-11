import React, { useState } from "react";
import ReactDom from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
import AuthContext from "./context/AuthContext";
import CustomersPages from "./pages/CustomersPage";
import HomePage from "./pages/HomePage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/AuthAPI.Js";

// any CSS you require will output into a single css file (app.css in this case)
require("../css/app.css");

AuthAPI.setup();

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

console.log("Attention si tu voit ce message, supprimer la fenetre !!!!");

const App = () => {
  const [isAuth, setIsAuth] = useState(AuthAPI.isAuth());
  const NavBarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      <HashRouter>
        <NavBarWithRouter />

        <main className="container pt-5">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <PrivateRoute path="/customers" component={CustomersPages} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#app"));
