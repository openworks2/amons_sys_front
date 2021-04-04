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

const ContentsCompo = styled.div`
  position: static;
  padding-top: 160px !important;
  padding-left: 260px !important;
  padding-right: 260px !important;
`;

const ContentTitleCompo = styled.div``;

const HomeContainer = () => {
  //   const { data, loading, error } = useSelector(
  //     (state) => state.companies.companies
  //   );
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getCompanies());
  //   }, [dispatch]);

  const [callSideMenu, setCallSideMenu] = useState(false);

  function sideMenuClickHandler() {
    setCallSideMenu(!callSideMenu);
  }

  const [contentTitle, setContentTitle] = useState("");
  const [contentTitleIcon, setContentTitleIcon] = useState("");

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
          <ContentsCompo>
            <ContentTitleCompo>
              {/* <{contentTitleIcon} /> */}
              작업자 관리
              <hr id="content-title-divide-line" />
            </ContentTitleCompo>
            <Contents />
          </ContentsCompo>
        </div>
      </HomeCompo>
    </>
  );
};

export default HomeContainer;
