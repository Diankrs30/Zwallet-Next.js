import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const register = (body) => {
  const URL = HOST + "/auth/register";
  return axios.post(URL, body);
};

export const login = (body) => {
  const URL = HOST + "/auth/login ";
  return axios.post(URL, body);
};

export const forgotPassword =(body) => {
  const URL = HOST + "/auth/forgot-password";
  return axios.post(URL, body)
}

export const resetPassword =(body) => {
  const URL = `${HOST}/auth/reset-password`;
  return axios.patch(URL, body)
}

export const logout = () => {
  const URL = HOST + "/auth/logout";
  return axios.post(URL)
}
