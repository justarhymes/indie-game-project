import rawg from "../api/rawg";
import { store } from "./types";

// Passing data back to reducers
const setStoreData = (obj, type, args) => {
  return {
    type: type,
    payload: obj,
    ...args
  };
};

// API calls
// pass an array of query parameters for filtering
export const fetchStoreCollection = page => async dispatch => {
  dispatch(setStoreData(true, store.loading));
  const res = await rawg.get(`stores?&page=${page}`);
  dispatch(setStoreData(res.data, store.fetch.collection));
  dispatch(setStoreData(false, store.loading));
};

export const fetchSingleStore = slug => async dispatch => {
  dispatch(setStoreData(true, store.loading));
  const res = await rawg.get(`stores/${slug}`);
  dispatch(setStoreAction(res.data, store.fetch.single));
  dispatch(setStoreData(false, store.loading));
};
