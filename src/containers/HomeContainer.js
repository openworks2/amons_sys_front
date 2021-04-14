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
  min-height: 900px;
  background: #f9fafb 0% 0% no-repeat padding-box;
`;

const HomeContainer = () => {

  // 전체화면 설정
  const openFullScreenMode = () => {

    var docV = document.documentElement;
    console.log('-->', docV)
    docV.webkitRequestFullscreen();

  }


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

  useEffect(() => {
  }, [])

  return (
    <HomeCompo className="Home-component">
      <Header callSideMenuHandler={callSideMenuHandler} />
      <SideMenu
        callSideMenu={callSideMenu}
        callSideMenuHandler={callSideMenuHandler}
        changeCurrentMenu={changeCurrentMenu}
        currentMenu={currentMenu}
        openFullScreenMode={openFullScreenMode}
      />
      {/* <ContentsCompo> */}
      <Contents currentMenu={currentMenu} />
      {/* </ContentsCompo> */}
    </HomeCompo>
  );
};

export default HomeContainer;
