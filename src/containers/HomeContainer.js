import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Contents from "../components/Contents";
import Header from "../components/Header";
import ContentTitle from "../components/ContentTitle";
import SideMenu from "../components/SideMenu";
import { getCompanies } from "../modules/companies";

const HomeCompo = styled.div`
  height: 100%;
  min-width: 1645px;
  min-height: 900px;
  background: #f9fafb 0% 0% no-repeat padding-box;
`;

const ContentsCompo = styled.div`
  position: static;
  min-width: 1920px !important;
  padding-top: 96px !important;
  padding-left: 280px !important;
  padding-right: 130px;
`;

const HomeContainer = () => {
  //   const { data, loading, error } = useSelector(
  //     (state) => state.companies.companies
  //   );
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getCompanies());
  //   }, [dispatch]);

  // 사이드바 호출 버튼 핸들러
  const [callSideMenu, setCallSideMenu] = useState(false);
  function callSideMenuHandler() {
    setCallSideMenu(!callSideMenu);
  }

  // 현재 메뉴 변경 핸들러
  const [currentMenu, setCurrentMenu] = useState("");
  // 사이드바 클릭 변경 핸들러
  const sideMenuClickHandler = (e, { name }) => {
    // 공백 포함 한글 문자열 받기.
    setCurrentMenu(name);
    console.log(currentMenu);
  };
  return (
    <>
      <HomeCompo className="Home-component">
        <Header callSideMenuHandler={callSideMenuHandler} />
        <div className="bottom">
          <div className="bottom-left">
            <SideMenu
              callSideMenu={callSideMenu}
              callSideMenuHandler={callSideMenuHandler}
              sideMenuClickHandler={sideMenuClickHandler}
              currentMenu={currentMenu}
            />
          </div>
          <ContentsCompo>
            <ContentTitle currentMenu={currentMenu} />
            <Contents />
          </ContentsCompo>
        </div>
      </HomeCompo>
    </>
  );
};

export default HomeContainer;
