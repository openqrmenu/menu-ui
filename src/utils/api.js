import axios from 'axios'
import  store from '../store'

// In Development, we connect to backend running on a different port
// In Production, the UI is serverd by the backend and can thus be changed
let REST_ENDPOINT = 'http://localhost:3000/'
if (import.meta.env.PROD)
  REST_ENDPOINT = '/'

export async function loginUser(email, password) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  return await axios({
    url: `${REST_ENDPOINT}auth/login/password`,
    method: "POST",
    data: params,
    withCredentials: true,
  });
}

export async function resetPassword(token, password) {
  const params = new URLSearchParams();
  params.append("token", token);
  params.append("password", password);
  return await axios({
    url: `${REST_ENDPOINT}auth/resetpassword`,
    method: "POST",
    data: params,
    withCredentials: true,
  });
}

export async function initresetPassword(email) {
  const params = new URLSearchParams();
  params.append("email", email);
  return await axios({
    url: `${REST_ENDPOINT}auth/initresetpassword`,
    method: "POST",
    data: params,
    withCredentials: true,
  });
}

export async function loginOAuth(token) {
  const params = new URLSearchParams();
  params.append("token", token);
  return await axios({
    url: `${REST_ENDPOINT}auth/login/token`,
    method: "POST",
    data: params,
    withCredentials: true,
  });
}


export async function logoutUser() {
  return await axios({
    url: `${REST_ENDPOINT}auth/logout`,
    method: "POST",
    data: "",
    withCredentials: true,
  });
}

export async function createAccount(email, password) {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    return await axios({
      url: `${REST_ENDPOINT}auth/signup`,
      method: "POST",
      data: params,
      withCredentials: true,
    });
  }
  

export function checkAuth() {
  return axios.get(`${REST_ENDPOINT}auth/getstatus`, { withCredentials: true });
}

export function isLoggedIn() {
  return store.getters.getAuthCheck && store.getters.getLoggedIn;
}

export function getMenuCards() {
    return axios.get(`${REST_ENDPOINT}menucard/getall`, { withCredentials: true });
}

export function getMenuStore(id) {
    return axios.get(`${REST_ENDPOINT}menucard/get/${id}`, { withCredentials: true });
}

export function getPublicMenuStore(id) {
  return axios.get(`${REST_ENDPOINT}public/menucard/get/${id}`, { withCredentials: true });
}

export async function addMenuCard(object) {
  return await axios({
    url: `${REST_ENDPOINT}menucard/add`,
    method: "POST",
    data: object,
    withCredentials: true,
  });
}

export async function updateMenuCardApi(object) {
  return await axios({
    url: `${REST_ENDPOINT}menucard/update`,
    method: "POST",
    data: object,
    withCredentials: true,
  });
}

export async function updateMenuCardDnDApi(object) {
  return await axios({
    url: `${REST_ENDPOINT}menucard/updatednd`,
    method: "POST",
    data: object,
    withCredentials: true,
  });
}

export async function addMenuLanguage(id, code, name) {
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("code", code);
    params.append("name", name);
    return await axios({
      url: `${REST_ENDPOINT}menucard/addlanguage`,
      method: "POST",
      data: params,
      withCredentials: true,
    });
}

export async function removeMenuLanguage(id, code) {
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("code", code);
    return await axios({
      url: `${REST_ENDPOINT}menucard/removelanguage`,
      method: "POST",
      data: params,
      withCredentials: true,
    });
}

export async function addMenuItem(object) {
    return await axios({
      url: `${REST_ENDPOINT}menuitem/add`,
      method: "POST",
      data: object,
      withCredentials: true,
    });
}

export async function updateMenuItem(object) {
  return await axios({
    url: `${REST_ENDPOINT}menuitem/update`,
    method: "POST",
    data: object,
    withCredentials: true,
  });
}

export async function deleteMenuItem(id) {
    const params = new URLSearchParams();
    params.append("id", id);
    return await axios({
      url: `${REST_ENDPOINT}menuitem/delete`,
      method: "POST",
      data: params,
      withCredentials: true,
    });
}


export async function deleteMenuCard(id)
{
    const params = new URLSearchParams();
    params.append("id", id);
    return await axios({
      url: `${REST_ENDPOINT}menucard/delete`,
      method: "POST",
      data: params,
      withCredentials: true,
    });

}
