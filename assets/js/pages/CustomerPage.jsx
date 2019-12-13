import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../Components/forms/Field";
import CustomerAPI from "../services/CustomerAPI";

const CustomerPage = ({ match, history }) => {
  const { id = "new" } = match.params;

  const [customer, setCustomer] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: ""
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: ""
  });

  const [editing, setEditing] = useState(false);

  //Permte de recuperer un costomers celon son ID
  const fetchCustomer = async id => {
    try {
      const { firstName, lastName, email, company } = await CustomerAPI.find(
        id
      );

      setCustomer({ firstName, lastName, email, company });
    } catch (error) {
      console.log(error.response);
      history.replace("/customers");
    }
  };

  //Au chargement du conposant, determine si il s'agit de faire une modification ou une création d'un customers
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchCustomer(id);
    }
  }, [id]);

  //Gestion des changement dans les inputs des formulaires
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCustomer({ ...customer, [name]: value });
  };

  //GEstion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (editing) {
        await CustomerAPI.update(id, customer);
        history.replace("/customers");
      } else {
        await CustomerAPI.create(customer);
        history.replace("/customers");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, title }) => {
          apiErrors[propertyPath] = title;
        });

        setErrors(apiErrors);
      }
    }
  };

  return (
    <>
      {(!editing && <h1>Création d'un client</h1>) || (
        <h1>Modification du client</h1>
      )}

      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          label="Nom de famille"
          placeholder="Nom de famille du client"
          value={customer.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Field
          name="firstName"
          label="Prenom"
          placeholder="Prenom du client"
          value={customer.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Field
          name="email"
          label="Email"
          placeholder="Adresse email du client"
          value={customer.email}
          onChange={handleChange}
          type="email"
          error={errors.email}
        />
        <Field
          name="company"
          label="Entreprise"
          placeholder="Entreprise du client"
          value={customer.company}
          onChange={handleChange}
        />

        <div className="form-group pt-5">
          <button className="btn btn-success">Enregistrer</button>
          <Link to="/customers" className="btn btn-link">
            Retour au clients
          </Link>
        </div>
      </form>
    </>
  );
};

export default CustomerPage;
