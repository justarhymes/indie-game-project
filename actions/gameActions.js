import rawg from "../api/rawg";
import { game } from "./types";

// Passing data back to reducers
const setGameData = (obj, type, args) => {
  return {
    type: type,
    payload: obj,
    ...args
  };
};

// Non-API calls
export const clearSingleGame = () => dispatch => {
  dispatch(setGameData({}, game.clear.single));
};

// API calls
// pass an array of query parameters for filtering
export const fetchGameCollection = page => async dispatch => {
  dispatch(setGameData(true, game.loading));
  const res = await rawg.get(`games?genres=indie&page=${page}`);
  dispatch(setGameData(res.data, game.fetch.collection));
  dispatch(setGameData(false, game.loading));
};

export const fetchSingleGame = slug => async dispatch => {
  dispatch(setGameData(true, game.loading));
  const res = await rawg.get(`games/${slug}`);
  dispatch(setGameData(res.data, game.fetch.single));
  dispatch(setGameData(false, game.loading));
};
