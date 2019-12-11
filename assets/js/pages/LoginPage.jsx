import React, { useState, useContext } from "react";
import AuthAPIJs from "../services/AuthAPI.Js";
import AuthContext from "../context/AuthContext";

const LoginPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const { setIsAuth } = useContext(AuthContext);

  //Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCredentials({ ...credentials, [name]: value });
  };

  //Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await AuthAPIJs.authenticate(credentials);
      setError("");
      setIsAuth(true);
      history.replace("/customers");
    } catch (error) {
      setError("Adresse Mail ou mot de passe invalide !");
    }
  };

  return (
    <>
      <h1>Connexion a l'application</h1>

      <form onSubmit={handleSubmit}>
        <div className="from-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            placeholder="Votre adresse email .."
            className={"form-control" + (error && " is-invalid")}
            name="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="from-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder="Votre mot de passe .."
            className="form-control"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="from-group">
          <button className="btn btn-success" type="submit">
            Se connecter
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
