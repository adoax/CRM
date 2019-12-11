import React from "react";

const Navbar = (props) => {
  return ( 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">AdoCRM</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor03">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">Clients</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Factures</a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <a className="nav-link" href="#">Inscription</a>
      </li>
      <li className="nav-item">
          <a className="btn btn-success" href="#">Connexion !</a>
      </li>
      <li className="nav-item">
          <a className="btn btn-danger" href="#">Déconnexion !</a>
      </li>
      </ul>
    </div>
  </nav>
   );
}
 
export default Navbar;
