import React from "react";
import { Route } from "react-router";
// field (현장관리)
import LocalContatiner from "../containers/field/LocalContainer";
// general (일반관리)
import CompanyContatiner from "../containers/general/CompanyContainer";
import WorkerContainer from "../containers/general/WorkerContainer";
import VehicleContainer from "../containers/general/VehicleContainer";
import BeaconContainer from "../containers/general/BeaconContainer";
import ScannerContainer from "../containers/general/ScannerContainer";
// import CctvContainer from "../containers/general/CctvContainer";
//
import HomeShortcut from "../components/home/HomeShortcut";
//
const Contents = () => {
  return (
    <>
      <Route path="/amons/home/" component={HomeShortcut} exact />
      {/* *****************************field 현장관리******************************** */}
      <Route path="/amons/home/field/local" component={LocalContatiner} />
      {/* *****************************general 일반관리****************************** */}
      <Route path="/amons/home/general/company" component={CompanyContatiner} />
      <Route path="/amons/home/general/worker" component={WorkerContainer} />
      <Route path="/amons/home/general/vehicle" component={VehicleContainer} />
      <Route path="/amons/home/general/beacon" component={BeaconContainer} />
      <Route path="/amons/home/general/scanner" component={ScannerContainer} />
      {/* <Route path="/amons/home/general/cctv" component={CctvContainer}/> */}
    </>
  );
};

export default Contents;
