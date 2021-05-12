import { combineReducers } from "redux";
// 이력조회
import alarms from "./alarms";
// 현장관리
import locals from "./locals";
import announces from "./announces";
import digs from "./digs";
import processes from "./processes";
// 일반관리
import companies from "./companies";
import beacons from "./beacons";
import workers from "./workers";
import vehicles from "./vehicles";
import scanners from "./scanners";
import cctvs from "./cctvs";
//계정관리
import accounts from "./accounts";

const rootReducer = combineReducers({
  //이력조회
  alarms,
  //현장관리
  locals,
  announces,
  digs,
  processes,
  //일반관리
  companies,
  beacons,
  workers,
  vehicles,
  scanners,
  cctvs,
  //계정관리
  accounts,
});

export default rootReducer;
