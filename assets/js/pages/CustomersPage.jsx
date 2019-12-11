import React, { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";
import CustomerAPI from "../services/CustomerAPI";

const CustomersPages = props => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, SetCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  //Permet de recuperer les customers
  const fetchCustomer = async () => {
    try {
      const data = await CustomerAPI.findAll();
      setCustomers(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  //Au chargement du composent en cherche les customers
  useEffect(() => {
    fetchCustomer();
  }, []);

  //Permet de supprimer un Customers
  const handleDelete = async id => {
    const originalCustomers = [...customers];

    setCustomers(customers.filter(customer => customer.id !== id));
    try {
      await CustomerAPI.delete(id);
    } catch (error) {
      setCustomers(originalCustomers);
    }
  };

  // Gestion du changement de page
  const handlePageChange = page => {
    SetCurrentPage(page);
  };

  //GEstion de la recherche
  const handleSearch = ({currentTarget}) => {
    setSearch(currentTarget.value);
    SetCurrentPage(1);
  };


  const itemsPerPage = 10;
  //Filtrage des customers en fonction de la recherche
  const filteredCustomer = customers.filter(
    c =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase())) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  //Pagination des données
  const paginitedCustomers = Pagination.getData(
    filteredCustomer,
    currentPage,
    itemsPerPage
  );


  return (
    <>
      <h1>Liste des clients</h1>
      <div className="form-group">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="form-control"
          placeholder="Rechercher .."
        />
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id.</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {paginitedCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <a href="#">
                  {customer.firstName} {customer.lastName}
                </a>
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td className="text-center">
                <span className="badge badge-light">
                  {customer.invoices.length}
                </span>
              </td>
              <td className="text-center">
                {customer.totalAmout.toLocaleString()} &euro;
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  disabled={customer.invoices.length > 0}
                  onClick={() => handleDelete(customer.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage < filteredCustomer.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCustomer.length}
          onPageChanged={handlePageChange}
        />
      )}
    </>
  );
};

export default CustomersPages;
