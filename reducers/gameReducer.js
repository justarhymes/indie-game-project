import _ from "lodash";
import { game } from "../actions/types";

const INITIAL_STATE = {
  collection: {},
  currentGame: {},
  errors: {},
  next: null,
  previous: null,
  loading: false,
  count: null,
  loadedOnce: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case game.loading:
      return {
        ...state,
        loading: action.payload
      };
    case game.clear.single:
      return {
        ...state,
        currentGame: {}
      };
    case game.fetch.collection:
      return {
        ...state,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        collection: {
          ...state.collection,
          ..._.mapKeys(action.payload.results, "slug")
        },
        loadedOnce: true
      };
    case game.fetch.single:
      return {
        ...state,
        currentGame: action.payload,
        loadedOnce: true
      };
    default:
      return state;
  }
};
