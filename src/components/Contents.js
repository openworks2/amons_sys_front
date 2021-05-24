import React, { useEffect } from "react";
import { Route, Redirect } from "react-router";
// log (이력조회)
import AlarmContainer from "../containers/log/AlarmContainer";
import LogWorkerContainer from "../containers/log/LogWorkerContainer";
import LogVehicleContainer from "../containers/log/LogVehicleContainer";
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
// 홈
import HomeShortcut from "../components/home/HomeShortcut";
// account(계정관리)
import AccountContainer from "../containers/account/AccountContainer";
import MonitorContainer from "../containers/monitor/MonitorContainer";
import SettingsContainer from "../containers/ect/SettingsContainer";
import KickOutWorkerContainer from "../containers/ect/KickOutWorkerContainer";
import KickOutVehicleContainer from "../containers/ect/KickOutVehicleContainer";
import LoginLogContainer from "../containers/ect/LoginLogContainer";
// import CompanyContatiner from "./general/CompanyContainer";
// import HomeShortcut from "./home/HomeShortcut";

const Contents = ({ openFullScreenMode, role }) => {
  // ect(기타관리)

  return (
    <>
      {(role !== 0 || role !== 1 || role !== 2) && (
        <Redirect to="/amons/signin" />
      )}
      {(role === 0 || role === 1 || role === 2) && (
        <>
          <Route
            path="/amons/home/"
            component={() => (
              <HomeShortcut openFullScreenMode={openFullScreenMode} />
            )}
            exact
          />
          <Route path="/amons/home/monitor" component={MonitorContainer} />
          {/* *******************************log 이력조회****************************** */}
          <Route path="/amons/home/log/diglog" component={LogDigContatiner} />
          <Route
            path="/amons/home/log/workerlog"
            component={LogWorkerContainer}
          />
          <Route
            path="/amons/home/log/vehiclelog"
            component={LogVehicleContainer}
          />
          <Route path="/amons/home/log/alarm" component={AlarmContainer} />
        </>
      )}
      {/* *****************************field 현장관리******************************** */}
      {role === 0 && (
        <Route path="/amons/home/field/local" component={LocalContatiner} />
      )}
      {(role === 0 || role === 1) && (
        <>
          <Route
            path="/amons/home/field/announce"
            component={AnnounceContainer}
          />
          <Route path="/amons/home/field/dig" component={DigContainer} />
          <Route
            path="/amons/home/field/process"
            component={ProcessContainer}
          />
        </>
      )}
      {/* *****************************general 일반관리****************************** */}
      {(role === 0 || role === 1) && (
        <>
          <Route
            path="/amons/home/general/company"
            component={CompanyContatiner}
          />
          <Route
            path="/amons/home/general/worker"
            component={WorkerContainer}
          />
          <Route
            path="/amons/home/general/vehicle"
            component={VehicleContainer}
          />
          <Route
            path="/amons/home/general/beacon"
            component={BeaconContainer}
          />
        </>
      )}
      {role === 0 && (
        <>
          <Route
            path="/amons/home/general/scanner"
            component={ScannerContainer}
          />
          <Route path="/amons/home/general/cctv" component={CctvContainer} />
        </>
      )}
      {/* *****************************account 계정관리****************************** */}
      {(role === 0 || role === 1) && (
        <Route path="/amons/home/account" component={AccountContainer} />
      )}
      {/* *******************************ect 기타관리****************************** */}
      {(role === 0 || role === 1) && (
        <Route path="/amons/home/ect/settings" component={SettingsContainer} />
      )}
      {role === 0 && (
        <>
          <Route
            path="/amons/home/ect/kickworker"
            component={KickOutWorkerContainer}
          />
          <Route
            path="/amons/home/ect/kickvehicle"
            component={KickOutVehicleContainer}
          />
          <Route
            path="/amons/home/ect/loginlog"
            component={LoginLogContainer}
          />
        </>
      )}
    </>
  );
};

export default Contents;
