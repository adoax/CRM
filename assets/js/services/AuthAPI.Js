import axios from "axios";
import CustomerAPI from "./CustomerAPI";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

//Permet de supprimer le token du localStorage & axios
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
  toast.success("Vous êtes deconnectez, a bientôt !");
}
/**
 * Positionne le token  JWT sur axios
 *
 * @param {string} token
 */
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Requette HTTP d'authentfication et stokage du token dans le storage & axios
 * @param credentials
 */
function authenticate(credentials) {
  return axios
    .post("http://127.0.0.1:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {
      //Stock le token dans le localStorage
      window.localStorage.setItem("authToken", token);
      //On previent axios qu'on a un header par default pour les futur requetes HTTP
      setAxiosToken(token);
    });
}

/**
 * Mise ne place lors du chargement de l'application
 */
function setup() {
  //est-ce que il y a un token ?
  const token = window.localStorage.getItem("authToken");

  //est-ce que le token est valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}
/**
 * Permet de savoir si l'utilisateur est identifier
 *
 * @return {boolean}
 */
function isAuth() {
  //est-ce que il y a un token ?
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuth
};
