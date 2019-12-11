import React, { useContext } from "react";
import AuthAPI from "../services/AuthAPI.Js";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = ({ history }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  /**
   * Permet à l'utilisateur de ce deconnecter
   */
  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuth(false);
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        AdoCRM
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              Clients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/invoices">
              Factures
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {(!isAuth && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Inscription
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="btn btn-success" to="/login">
                  Connexion !
                </NavLink>
              </li>
            </>
          )) || (
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Déconnexion !
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
