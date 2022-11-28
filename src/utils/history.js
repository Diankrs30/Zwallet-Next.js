import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const getHistory = (param, token) => {
  const URL =
    HOST +
    `/transaction/history?page=${param.page}&limit=${param.per_page}&filter=${param.filter}`;
  return axios.get(URL, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const getHistoryById = (id, token) => {
    const URL =
      HOST +
      `/transaction/history/${id}`;
    return axios.get(URL, {
      headers: { Authorization: "Bearer " + token },
    });
  };

