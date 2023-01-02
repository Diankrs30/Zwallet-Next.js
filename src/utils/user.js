import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// export const checkPin = (pin, token) => {
//   const URL = HOST + "/user/pin?pin=" + pin;
//   // console.log("url cek pin", URL);
//   return axios.get(URL, { headers: { Authorization: "Bearer " + token } });
// };

export const checkPin = (token, pin) =>
  axios.get(`${HOST}/user/pin/${pin}`, config(token));

export const updatePin = (id, body, token) => {
  const URL = HOST + `/user/pin/${id}`;
  return axios.patch(URL, body, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const updateUserById = (id, token, body) => {
  const URL = HOST + `/user/profile/${id}`;
  return axios.patch(URL, body, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const updatePassword = (id, token, body) => {
  const URL = HOST + `/user/password/${id}`;
  return axios.patch(URL, body, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const getUserById = (id, token) => {
  const URL = HOST + `/user/profile/${id}`;
  console.log(URL);
  return axios.get(URL, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const getDataUser = (param, token) => {
  const URL = param.search ? HOST + `/user?page=${param.page}&limit=${param.per_page}&search=${param.search}&sort=${param.sort}` :
  HOST + `/user?page=${param.page}&limit=${param.per_page}&sort=${param.sort}`
  return axios.get(URL, {
    headers: { Authorization: "Bearer " + token },
  })
  
}

export const updateImage = (id, body, token) => {
  console.log("id", id);
  const URL = HOST + `/user/image/${id}`;
  return axios.patch(URL, body, {
    headers: { Authorization: "Bearer " + token },
  });
};
