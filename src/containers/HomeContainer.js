import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Contents from "../components/Contents";
import Header from "../components/Header";
import ContentTitle from "../components/ContentTitle";
import SideMenu from "../components/SideMenu";
import { getCompanies } from "../modules/companies";
import { Redirect } from "react-router";

const HomeCompo = styled.div`
  height: 100%;
  width: 100%;
  min-width: 1780px;
  min-height: 800px;
  background: #f9fafb 0% 0% no-repeat padding-box;
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
  const changeCurrentMenu = (name) => {
    // 공백 포함 한글 문자열 받기.
    // urlRefresh();
    setCurrentMenu(name);
  };

  // URL 파라미터 받아오기
  const [currentUrl, setCurrentUrl] = useState("");
  // const urlRefresh = ({ match }) => {
  //   console.log("currentUrl prev");
  //   console.log(currentUrl);
  //   setCurrentUrl(match.param);
  //   console.log("currentUrl");
  //   console.log(currentUrl);
  // };
  let url = document.location.href;
  console.log("url");
  console.log(url);

  // let { urllocation } = location;
  // console.log("urllocation");
  // console.log(urllocation);

  // // 페이지 이동시 실행하는 초기화 함수
  // const initClickInfo = () => {
  //   setClickInfo({ isClicked: false, clickedRow: 0 });
  // };
  // const initCurrentMenu = () => {
  //   setCallSideMenu("");
  // };

  return (
    <>
      <HomeCompo className="Home-component">
        <Header callSideMenuHandler={callSideMenuHandler} />
        <SideMenu
          callSideMenu={callSideMenu}
          callSideMenuHandler={callSideMenuHandler}
          changeCurrentMenu={changeCurrentMenu}
          currentMenu={currentMenu}
        />
        {/* <ContentsCompo> */}
        <Contents currentMenu={currentMenu} />
        {/* </ContentsCompo> */}
      </HomeCompo>
    </>
  );
};

export default HomeContainer;
