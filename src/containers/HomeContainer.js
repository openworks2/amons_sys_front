import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Contents from "../components/Contents";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { getCompanies } from "../modules/companies";
import { Button } from "semantic-ui-react";
import { HiMenu } from "react-icons/hi";

const HomeCompo = styled.div`
  height: 100%;
  min-width: 1645px;
  min-height: 900px;
`;

const HomeContainer = () => {
  //   const { data, loading, error } = useSelector(
  //     (state) => state.companies.companies
  //   );
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getCompanies());
  //   }, [dispatch]);

  const [callSideMenu, setCallSideMenu] = useState(false);

  const sideMenuClickHandler = () => {
    setCallSideMenu(!callSideMenu);
    console.log("클릭");
    console.log(callSideMenu);
  };

  return (
    <>
      <HomeCompo className="Home-component">
        <Header sideMenuClickHandler={sideMenuClickHandler} />
        <div className="bottom">
          <div className="bottom-left">
            <SideMenu
              callSideMenu={callSideMenu}
              sideMenuClickHandler={sideMenuClickHandler}
            />
          </div>
          <div className="bottom-right">
            <Contents />
          </div>
        </div>
      </HomeCompo>
    </>
  );
};

export default HomeContainer;
