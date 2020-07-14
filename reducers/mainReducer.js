import { combineReducers } from "redux";
import game from "./gameReducer";
import stores from "./storeReducer";

const rootReducer = combineReducers({
  game,
  stores // not being used yet
});

export default rootReducer;
