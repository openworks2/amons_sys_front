import { combineReducers } from "redux";
import companies from "./companies";
import beacons from "./beacons";

const rootReducer = combineReducers({ companies, beacons });

export default rootReducer;
