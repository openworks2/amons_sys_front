import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import MonitorContainer from "../containers/monitor/MonitorContainer";
import HomeShortcut from "./home/HomeShortcut";
// import CompanyContatiner from "./general/CompanyContainer";
// import HomeShortcut from "./home/HomeShortcut";

const Contents = ({ openFullScreenMode }) => {
  // useEffect(() => {
  //   //     dispatch(getCompanies());
  //   //   }, [dispatch]);
  return (
    <>
      <Route path="/amons/home/" component={() => <HomeShortcut openFullScreenMode={openFullScreenMode} />} exact />
      <Route path="/amons/home/monitor" component={() => <MonitorContainer />} />
      {/* <Route path="/amons/home/general/company" component={CompanyContatiner} /> */}
      <Route path="/amons/home/general/worker" />
      <Route path="/amons/home/general/vehicle" />
      <Route path="/amons/home/general/beacon" />
      <Route path="/amons/home/general/scanner" />
      <Route path="/amons/home/general/cctv" />
    </>
  );
};

export default Contents;
