import { combineReducers } from "redux";
// 현장관리
import locals from "./locals";
// 일반관리
import companies from "./companies";
import beacons from "./beacons";
import workers from "./workers";
import vehicles from "./vehicles";
import scanners from "./scanners";
// import cctvs from "./cctv";

const rootReducer = combineReducers({
  //현장관리
  locals,
  //일반관리
  companies,
  beacons,
  workers,
  vehicles,
  scanners,
  //   cctvs
});

export default rootReducer;
