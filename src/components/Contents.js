import React from "react";
import { Route } from "react-router";
// log (이력조회)
import LogDigContatiner from "../containers/log/LogDigContainer";
// field (현장관리)
import LocalContatiner from "../containers/field/LocalContainer";
import AnnounceContainer from "../containers/field/AnnounceContainer";
import DigContainer from "../containers/field/DigContainer";
import ProcessContainer from "../containers/field/ProcessContainer";
// general (일반관리)
import CompanyContatiner from "../containers/general/CompanyContainer";
import WorkerContainer from "../containers/general/WorkerContainer";
import VehicleContainer from "../containers/general/VehicleContainer";
import BeaconContainer from "../containers/general/BeaconContainer";
import ScannerContainer from "../containers/general/ScannerContainer";
import CctvContainer from "../containers/general/CctvContainer";
//
import HomeShortcut from "../components/home/HomeShortcut";
// account(계정관리)
import AccountContainer from "../containers/account/AccountContainer";

const Contents = () => {
  return (
    <>
      <Route path="/amons/home/" component={HomeShortcut} exact />
      {/* *******************************log 이력조회****************************** */}
      <Route path="/amons/home/log/diglog" component={LogDigContatiner} />
      {/* *****************************field 현장관리******************************** */}
      <Route path="/amons/home/field/local" component={LocalContatiner} />
      <Route path="/amons/home/field/announce" component={AnnounceContainer} />
      <Route path="/amons/home/field/dig" component={DigContainer} />
      <Route path="/amons/home/field/process" component={ProcessContainer} />
      {/* *****************************general 일반관리****************************** */}
      <Route path="/amons/home/general/company" component={CompanyContatiner} />
      <Route path="/amons/home/general/worker" component={WorkerContainer} />
      <Route path="/amons/home/general/vehicle" component={VehicleContainer} />
      <Route path="/amons/home/general/beacon" component={BeaconContainer} />
      <Route path="/amons/home/general/scanner" component={ScannerContainer} />
      <Route path="/amons/home/general/cctv" component={CctvContainer} />
      {/* *****************************account 계정관리****************************** */}
      <Route path="/amons/home/account" component={AccountContainer} />
    </>
  );
};

export default Contents;
