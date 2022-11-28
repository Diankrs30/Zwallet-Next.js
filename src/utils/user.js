import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const checkPin = (pin, token) => {
  const URL = HOST + "/user/pin?pin=" + pin;
  // console.log("url cek pin", URL);
  return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
};

export const updatePin = (id, body, token) => {
  const URL = HOST + `/user/pin/${id}`;
  return axios.patch(URL, body, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const getUserById = (id, token) => {
  const URL = HOST + `/user/profile/${id}`
  return axios.get(URL, {
    headers: { Authorization: "Bearer " + token },
  })
}

export const getDataUser = (param, token) => {
  const URL = HOST + `/user?page=${param.page}&limit=${param.per_page}&search=${param.search}&sort=${param.sort}`
  return axios.get(URL, {
    headers: { Authorization: "Bearer " + token },
  })
  
}

export const updateImage = (id,body,token) => {
  console.log('id',id);
  const URL = HOST + `/user/image/${id}`;
  return axios.patch(URL, body ,{ headers: { Authorization: "Bearer " + token } });
};