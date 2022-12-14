import axios from "axios";

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllUser = (token, page, search) => {
  const URL = !search
    ? `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user?limit=4&sort=firstName%20ASC&page=${page}`
    : `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user?limit=4&search=${search}&sort=firstName%20ASC&page=${page}`;
  return axios.get(URL, config(token));
};

export const transfer = (token, body) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/transaction/transfer`;
  return axios.post(URL, body, config(token));
};
