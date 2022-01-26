import Axios from 'axios';

const baseURL = process.env.REACT_APP_BASEURL;

const headers = {};

if (localStorage.token) {
  headers.Authorization = localStorage.token;
}

const axios = Axios.create({
  baseURL,
  timeout: 1000,
  headers
});

export const setAuthToken = (token) => {
  console.log(`axios`, axios);
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

axios.interceptors.request.use(
  (config) => {
    console.log(`config`, config);
    return config;
    // return Promise.reject('UnAuthorized');
  },
  (error) => {
    console.log(`error-res`, error);
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(`response`, response);
    return response;
  },
  (error) => {
    console.log(`error`, error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = axios.post('/user/refresh-token', {
        refresh_token: localStorage.getItem('auth-token')
      });
      if (res.status === 201) {
        localStorage.setItem('auth-token', res.data);
        const token = localStorage.getItem('auth-token');
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      }
    }
    return error;
  }
);

export default axios;
