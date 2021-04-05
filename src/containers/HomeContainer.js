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
  function sideMenuClickHandler() {
    setCallSideMenu(!callSideMenu);
  }

  // 사이드바 클릭 변경 핸들러
  const [clickedSideMenu, setClickedSideMenu] = useState("");
  const handleMenuClick = (e, name) => {
    setClickedSideMenu(name);
  };

  // 콘텐츠 타이틀 변경 핸들러
  const [contentTitle, setContentTitle] = useState("소속사 관리");

  return (
    <>
      <HomeCompo className="Home-component">
        <Header sideMenuClickHandler={sideMenuClickHandler} />
        <div className="bottom">
          <div className="bottom-left">
            <SideMenu
              callSideMenu={callSideMenu}
              sideMenuClickHandler={sideMenuClickHandler}
              clickedSideMenu={clickedSideMenu}
              handleMenuClick={handleMenuClick}
            />
          </div>
          <ContentsCompo>
            <ContentTitle contentTitle={contentTitle} />
            <Contents />
          </ContentsCompo>
        </div>
      </HomeCompo>
    </>
  );
};

export default HomeContainer;
