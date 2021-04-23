import { combineReducers } from "redux";
import companies from "./companies";
import beacons from "./beacons";
import workers from "./workers";
import vehicles from "./vehicles";

const rootReducer = combineReducers({ companies, beacons, workers, vehicles });

export default rootReducer;
