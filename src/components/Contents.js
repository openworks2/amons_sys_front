import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import HomeShortcut from "./Home/HomeShortcut";
// import CompanyContatiner from "./general/CompanyContainer";
// import HomeShortcut from "./home/HomeShortcut";

const Contents = () => {
  // useEffect(() => {
  //   //     dispatch(getCompanies());
  //   //   }, [dispatch]);
  return (
    <>
      <Route path="/amons/home/" component={HomeShortcut} exact />
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
