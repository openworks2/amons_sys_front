import { combineReducers } from "redux";
import companies from "./companies";
import beacons from "./beacons";
import workers from "./workers";

const rootReducer = combineReducers({ companies, beacons, workers });

export default rootReducer;
