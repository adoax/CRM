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
import LoginRoute from "./Components/LoginRoute";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <HashRouter>
        <NavBarWithRouter />

        <main className="container pt-5">
          <Switch>
            <LoginRoute path="/login" component={LoginPage} />
            <LoginRoute path="/register" component={RegisterPage} />
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
            <PrivateRoute path="/customers" component={CustomersPages} />
            <PrivateRoute path="/invoices/:id" component={InvoicePage} />
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#app"));
