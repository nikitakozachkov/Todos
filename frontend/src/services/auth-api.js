import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export async function signupUser(credentials) {
  const { data } = await axios.post(`/auth/signup`, credentials);
  return data;
}

export async function verifyUser(verificationToken) {
  const { data } = await axios.get(`/auth/verify/${verificationToken}`);
  return data;
}

export async function resendVerificationUser(credentials) {
  const { data } = await axios.post(`/auth/verify`, credentials);
  return data;
}

export async function loginUser(credentials) {
  const { data } = await axios.post(`/auth/login`, credentials);
  setAuthHeader(data.token);
  return data;
}

export async function refreshUser(token) {
  setAuthHeader(token);
  const { data } = await axios.get(`/auth/current`);
  return data;
}

export async function logoutUser() {
  const { data } = await axios.post(`/auth/logout`);
  clearAuthHeader();
  return data;
}