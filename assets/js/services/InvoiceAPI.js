import axios from "axios";
import Cache from "./cache";
import { INVOICES_API } from "../config";

async function findAll() {
  const cachedInvoices = await Cache.get("invoices");

  if (cachedInvoices) return cachedInvoices;

  return axios.get(INVOICES_API).then(response => {
    const invoices = response.data["hydra:member"];
    Cache.set("invoices", invoices);
    return invoices;
  });
}

function deleteInvoice(id) {
  return axios
    .delete(INVOICES_API + "/" + id)
    .then(async response => {
      const cachedInvoices = await Cache.get("invoices");

      if (cachedInvoices) {
        Cache.set(
          "invoices",
          cachedInvoices.filter(c => c.id !== id)
        );
      }

      await invalidCustomer();

      return response;
    });
}

function create(invoice) {
  return axios
    .post(INVOICES_API, {
      ...invoice,
      customer: `/api/customers/${invoice.customer}`
    })
    .then(async response => {
      const cachedInvoices = await Cache.get("invoices");

      if (cachedInvoices) {
        Cache.set("invoices", [...cachedInvoices, response.data]);
      }

      await invalidCustomer();

      return response;
    });
}

async function find(id) {
  const cachedInvoice = await Cache.get("invoice." + id);

  if (cachedInvoice) return cachedInvoice;

  return axios
    .get(INVOICES_API + "/" + id)
    .then(async response => {
      const invoice = response.data;
      Cache.set("invoice." + id, invoice);

      return invoice;
    });
}

function update(id, invoice) {
  return axios
    .put(INVOICES_API + "/" + id, {
      ...invoice,
      customer: `/api/customers/${invoice.customer}`
    })
    .then(async response => {
      const cachedInvoices = await Cache.get("invoices");
      const cachedInvoice = await Cache.get("invoice." + id);

      if (cachedInvoices) {
        const index = cachedInvoices.findIndex(c => c.id === +id);
        cachedInvoices[index] = response.data;
      }

      if (cachedInvoice) {
        Cache.set("invoice." + id, response.data);
      }

      await invalidCustomer();

      return response;
    });
}

function invalidCustomer() {
  const cachedCustomers = Cache.get("customers");
  if (cachedCustomers) {
    Cache.invalidate("customers");
  }
}

export default {
  findAll,
  delete: deleteInvoice,
  find,
  update,
  create
};
