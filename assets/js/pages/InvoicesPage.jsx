import moment from "moment";
import React, { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";
import InvoiceAPI from "../services/InvoiceAPI";
import { Link } from "react-router-dom";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "primary",
  CANCELLED: "danger"
};

const STATUS_LABEL = {
  PAID: "Payée",
  SENT: "Envoyée",
  CANCELLED: "Annulée"
};
const InvoicesPage = props => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, SetCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  //Permet de recuperer les Invoives
  const fectInvoices = async () => {
    try {
      const data = await InvoiceAPI.findAll();
      setInvoices(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  //Permet de supprimer une invoice
  const handleDelete = async id => {
    const originalInvoices = [...invoices];

    setInvoices(invoices.filter(invoice => invoice.id !== id));
    try {
      await InvoiceAPI.delete(id);
    } catch (error) {
      setInvoices(originalInvoices);
    }
  };

  //Au chargement du coposant cherche les Invoices
  useEffect(() => {
    fectInvoices();
  }, []);

  //GEstion changement de page
  const handlePageChange = page => {
    SetCurrentPage(page);
  };

  //Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    SetCurrentPage(1);
  };

  //Filtrage des customers en fonction de la recherche
  const filterInvoices = invoices.filter(
    i =>
      i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      i.amout.toString().startsWith(search.toLowerCase()) ||
      STATUS_LABEL[i.status].toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 40;
  //Pagination des données
  const paginitedInvoices = Pagination.getData(
    filterInvoices,
    currentPage,
    itemsPerPage
  );

  //Formatage de la data avec MomentJs
  const formatDate = str => moment(str).format("DD/MM/YYYY");

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des factures</h1>

        <Link to="/invoices/new" className="btn btn-primary">
          Créer une Facture
        </Link>
      </div>
      <div className="form-group">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="form-control"
          placeholder="Recherche .."
        ></input>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Client</th>
            <th className="text-center">Date d'envoi</th>
            <th className="text-center">Status</th>
            <th className="text-center">Montant</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {paginitedInvoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.chrono}</td>
              <td>
                <Link to={"/invoices/" + invoice.id}>
                  {invoice.customer.firstName} {invoice.customer.lastName}
                </Link>
              </td>
              <td className="text-center">{formatDate(invoice.sendAt)}</td>
              <td className="text-center">
                <span
                  className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                >
                  {STATUS_LABEL[invoice.status]}
                </span>
              </td>
              <td className="text-center">
                {invoice.amout.toLocaleString()} &euro;
              </td>
              <td>
                <button className="btn btn-primary btn-sm mr-1">Editer</button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={filterInvoices.length}
        onPageChanged={handlePageChange}
      />
    </>
  );
};

export default InvoicesPage;
