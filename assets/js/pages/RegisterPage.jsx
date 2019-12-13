import React, { useState } from "react";
import Field from "../Components/forms/Field";
import UserAPI from "../services/UserAPI";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [errors, setErrros] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  //Gestion des chagements dans les input du formulaire
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setUser({ ...user, [name]: value });
  };

  //Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();

    const apiErrors = {};

    //Gestion de confirmation du mot de passe
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm = "Vos mot de passe ne corresponde pas !";
      setErrros(apiErrors);
      return;
    }

    try {
      await UserAPI.register(user);
      setErrros({});
      history.replace("/login");
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        violations.forEach(({ propertyPath, title }) => {
          apiErrors[propertyPath] = title;
        });
        setErrros(apiErrors);
      }
      console.log(response);
    }
    //TODO : erreur requete
  };

  return (
    <>
      <h1>Création d'un compte</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          label="Prénom "
          value={user.firstName}
          onChange={handleChange}
          placeholder="Votre Prenom"
          error={errors.firstName}
        />
        <Field
          name="lastName"
          label="Nom de famille"
          value={user.lastName}
          onChange={handleChange}
          placeholder="Votre nom de famille"
          error={errors.lastName}
        />
        <Field
          name="email"
          label="Adresse email"
          value={user.email}
          onChange={handleChange}
          placeholder="exemple@mail.fr"
          type="email"
          error={errors.email}
        />
        <Field
          name="password"
          label="Mot de passe"
          value={user.password}
          onChange={handleChange}
          placeholder="****"
          type="password"
          error={errors.password}
        />
        <Field
          name="passwordConfirm"
          label="Repeter votre mot de passe"
          value={user.passwordConfirm}
          onChange={handleChange}
          placeholder="****"
          type="password"
          error={errors.passwordConfirm}
        />
        <div className="form-group pt-5">
          <button className="btn btn-success">enregistrer</button>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
