import axios from "axios";
//import store from "../config/store"; for use if global errors added

const rawg = axios.create({
  baseURL: "https://api.rawg.io/api/"
});

// in case I decide to add any sort of global responses to endpoint calls
rawg.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    /* TODO: Add global errors */
    return Promise.reject(error);
  }
);

export default rawg;
