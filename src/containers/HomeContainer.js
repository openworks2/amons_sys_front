import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Contents from "../components/Contents";
import Header from "../components/Header";
import ContentTitle from "../components/ContentTitle";
import SideMenu from "../components/SideMenu";
import { Redirect } from "react-router";
import { setRatePanel } from "../modules/monitor";
import useFullscreen from "../lib/useFullscrenn";





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


  const [fullState, setState] = useState(false);
  // 전체화면 설정
  const openFullScreenMode = () => {
    console.log(2134234)
    let docV = document.documentElement;
    // docV.webkitRequestFullscreen();
    if (docV.requestFullscreen) {
      docV.requestFullscreen();
    } else if (docV.mozRequestFullScreen) {
      docV.mozRequestFullScreen();
    } else if (docV.webkitRequestFullscreen) {
      docV.webkitRequestFullscreen();
    } else if (docV.msRequestFullscreen) {
      docV.msRequestFullscreen();
    }

    //   if (docV) {
    //   }
  };

  const closeFullScreenMode = () => {
    // var docV = document.documentElement;
    document.webkitExitFullscreen();
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
        <Header callSideMenuHandler={callSideMenuHandler} setRatePanelHandler={setRatePanelHandler} triggerFull={openFullScreenMode}
        exitFull={closeFullScreenMode}/>
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
