import axios from 'axios'
import  store from '../store'


const REST_ENDPOINT = 'http://localhost:3000/'

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
  console.log(store);
  return store.getters.getAuthCheck && store.getters.getLoggedIn;
}

