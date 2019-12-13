import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

/**
 * Permet au personne non Connecte, d'être rediger sur la page de connexion
 */
const LoginRoute = ({ path, component }) => {
  const { isAuth } = useContext(AuthContext);
  return !isAuth ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/customers" />
  );
};

export default LoginRoute;
