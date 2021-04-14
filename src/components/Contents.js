import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import CompanyContatiner from "../containers/general/CompanyContainer";
import HomeShortcut from "../components/home/HomeShortcut";

const Contents = () => {
  // useEffect(() => {
  //   //     dispatch(getCompanies());
  //   //   }, [dispatch]);
  return (
    <>
      <Route path="/amons/home/" component={HomeShortcut} exact />
      <Route path="/amons/home/general/company" component={CompanyContatiner} />
      <Route path="/amons/home/general/worker" />
      <Route path="/amons/home/general/vehicle" />
      <Route path="/amons/home/general/beacon" />
      <Route path="/amons/home/general/scanner" />
      <Route path="/amons/home/general/cctv" />
    </>
  );
};

export default Contents;
