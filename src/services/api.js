import axios from "axios";
import jwt_decode from "jwt-decode";
// import { apiUrl } from './constants';
const apiUrl = "https://frontier-backend1.herokuapp.com";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

export function isExpired() {
  let token = localStorage.getItem("access_token");
  if (!token) return true;
  let decodedToken = jwt_decode(token);
  let currentDate = new Date();
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return true;
  } else {
    return false;
  }
}

export async function sendLoginRequest(emailParam, passwordParam) {
  const res = await axios.post(`${apiUrl}/auth/login`, {
    email: emailParam,
    password: passwordParam,
  });
  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("firstName", res.data.firstName);
  localStorage.setItem("id", res.data.id);

  return res.data.access_token;
}

export function sendSignupRequest(emailParam, passwordParam) {
  return axios
    .post(`${apiUrl}/users/signup`, {
      email: emailParam,
      password: passwordParam,
    })
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token);
      return res.data.access_token;
    });
}

export function getAssets() {
  return axios
    .get(`${apiUrl}/assets`)
    .then((res) => res.data)
    .catch((err) => {
      return {
        Status: err.response.status,
        Message: err.response.statusText,
      };
    });
}

export function addAsset(title, description, image) {
  return axios
    .post(`${apiUrl}/assets`, {
      title,
      description,
      image,
    })
    .then((res) => res.status)
    .catch((err) => err);
}

export function createAsset(id, title, description, image) {
  return axios
    .post(`${apiUrl}/assets`, {
      title,
      description,
      image,
    })
    .then((res) => res.status)
    .catch((err) => err);
}

export function updateAsset(id, form) {
  return axios
    .patch(`${apiUrl}/assets/update/${id}`, form)
    .then((res) => res)
    .catch((err) => err);
}

export function getAssetById(id) {
  return axios
    .get(`${apiUrl}/assets/${id}`) // use id url
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // catch error
      console.error(err);
    });
}

export function deleteAssetbyId(assetId) {
  return axios
    .delete(`${apiUrl}/assets/${assetId}`)
    .then((res) => res.status)
    .catch((err) => {});
}
