import React, { useState, useContext } from "react";
import AuthAPIJs from "../services/AuthAPI.Js";
import AuthContext from "../context/AuthContext";
import Field from "../Components/forms/Field";
import { toast } from "react-toastify";

const LoginPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    username: "a@a.com",
    password: "azerty"
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
      toast.success("Vous êtes désormais connecté !");
    } catch (error) {
      setError("Adresse Mail ou mot de passe invalide !");
      toast.error("Une erreur est survenue !");
    }
  };

  return (
    <>
      <h1>Connexion a l'application</h1>

      <form onSubmit={handleSubmit}>
        <Field
          name="username"
          label="Email"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Votre adresse Email"
          type="text"
          error={error}
        />

        <Field
          name="password"
          label="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Votre mot de passe"
          type="password"
        />

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
