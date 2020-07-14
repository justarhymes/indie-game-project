import _ from "lodash";
import { store } from "../actions/types";

const INITIAL_STATE = {
  collection: {},
  errors: {},
  next: null,
  previous: null,
  loading: false,
  count: null,
  loadedOnce: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case store.loading:
      return {
        ...state,
        loading: action.payload
      };
    case store.fetch.collection:
      return {
        ...state,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        collection: {
          ...state.collection,
          ..._.mapKeys(action.payload.results, "id")
        },
        loadedOnce: true
      };
    case store.fetch.single:
      const currentStore = state.collection[action.payload.id];
      return {
        ...state,
        collection: {
          ...state.collection,
          [currentStore.id]: currentStore,
          loadedOnce: true
        }
      };
    default:
      return state;
  }
};
