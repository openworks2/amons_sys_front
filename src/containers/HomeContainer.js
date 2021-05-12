import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Contents from "../components/Contents";
import Header from "../components/Header";
import ContentTitle from "../components/ContentTitle";
import SideMenu from "../components/SideMenu";
import { Redirect } from "react-router";
import { setRatePanel } from "../modules/monitor";





const HomeCompo = styled.div`
  height: 100%;
  width: 100%;
  min-width: 1680px;
  min-height: 700px;
  background: #f9fafb 0% 0% no-repeat padding-box;
  overflow: auto;
`;

const HomeContainer = ({ currentMenu }) => {
  const dispatch = useDispatch();

  // 전체화면 설정
  const openFullScreenMode = () => {
    console.log(2134234)
    var docV = document.documentElement;
    console.log('-->', docV)
    docV.webkitRequestFullscreen();

  }

  // 사이드바 호출 버튼 핸들러
  const [callSideMenu, setCallSideMenu] = useState(false);
  function callSideMenuHandler() {
    setCallSideMenu(!callSideMenu);
  }
  // URL 파라미터 받아오기
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const url = document.location.href;
    const splitUrl = url.split("/");
    const location = splitUrl[splitUrl.length - 1];
    setCurrentUrl(location);
  });

  // target-DrillRatePanel.js
  // const [ratePanelOpen, setPanelOpen] = useState(false);

  const setRatePanelHandler = () => {
    // setPanelOpen(!ratePanelOpen)
    dispatch(setRatePanel());
  }


  useEffect(() => {
  }, [])

  return (
    <>
      <HomeCompo className="Home-component">
        <Header callSideMenuHandler={callSideMenuHandler} setRatePanelHandler={setRatePanelHandler} />
        <SideMenu
          callSideMenu={callSideMenu}
          callSideMenuHandler={callSideMenuHandler}
          currentUrl={currentUrl}
        />
        {currentUrl && currentUrl !== "home" && currentUrl !== "monitering" && (
          <ContentTitle currentUrl={currentUrl}></ContentTitle>
        )}
        <Contents currentMenu={currentMenu} openFullScreenMode={openFullScreenMode} />
      </HomeCompo>
    </>
  );
};

export default HomeContainer;
