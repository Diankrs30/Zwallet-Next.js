import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const topUp = (body,token) => {
  const URL = HOST + "/transaction/top-up";
    console.log('hehe', URL);
  return axios.post(URL, body,{ headers: { Authorization: "Bearer " + token } });
};

export const downloadPdf = (id,token) => {
  console.log("muncull",id);
  const URL = HOST + `/export/transaction/${id}`;
    console.log('hehe', URL);
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};