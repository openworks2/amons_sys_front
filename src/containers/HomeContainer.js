import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Contents from "../components/Contents";
import Header from "../components/Header";
import ContentTitle from "../components/ContentTitle";
import SideMenu from "../components/SideMenu";
import { Redirect } from "react-router";
import { setRatePanel, setSOSSituation } from "../modules/monitor";
import useFullscreen from "../lib/useFullscrenn";
import {
  loginCheckAsync,
  logOutAsync,
  setLogindInfoAsync,
} from "../modules/login";
import storage from "../lib/starage";

const HomeCompo = styled.div`
  height: 100%;
  width: 100%;
  min-width: 1780px;
  min-height: 900px;
  background: #f9fafb 0% 0% no-repeat padding-box;
`;

const HomeContainer = () => {
  const { login } = useSelector((state) => state.login);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const [fullState, setState] = useState(false);
  // 전체화면 설정
  const openFullScreenMode = () => {
    console.log(2134234);
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
  };

  const closeFullScreenMode = () => {
    // var docV = document.documentElement;
    document.webkitExitFullscreen();
  };

  // 사이드바 호출 버튼 핸들러
  const [callSideMenu, setCallSideMenu] = useState(false);
  function callSideMenuHandler() {
    setCallSideMenu(!callSideMenu);
  }

  // URL 파라미터 받아오기
  const [currentUrl, setCurrentUrl] = useState("");

  const setRatePanelHandler = () => {
    // setPanelOpen(!ratePanelOpen)
    dispatch(setRatePanel());
  };

  const initialUserInfo = useCallback(async () => {
    const loggedInfo = storage.get("user"); // 로그인 정보를 로컬스토리지에서 가져오기
    if (!loggedInfo) {
      return; // 로그인 정보가 없다면 멈춤
    } else {
      console.log("loggedInfo--->", loggedInfo);
      setUser(loggedInfo);
    }

    dispatch(setLogindInfoAsync(loggedInfo));
    try {
      await dispatch(loginCheckAsync());
    } catch (e) {
      storage.remove("user");
    }
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logOutAsync());
    window.location.href = "/amons/signin";
    // return <Redirect to="/amons/signin" />
  };

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>HomeContainer");
    const url = document.location.href;
    const splitUrl = url.split("/");
    const location = splitUrl[splitUrl.length - 1];
    setCurrentUrl(location);
  });

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>HomeContainer");

    console.log("login--->>", login);
    initialUserInfo();
  }, []);

  if (!storage.get("user")) return <Redirect to="/amons/signin" />;
  return (
    <HomeCompo className="Home-component">
      <Header
        callSideMenuHandler={callSideMenuHandler}
        setRatePanelHandler={setRatePanelHandler}
        triggerFull={openFullScreenMode}
        exitFull={closeFullScreenMode}
        onLogout={onLogout}
        currentUrl={currentUrl}
      />
      <SideMenu
        callSideMenu={callSideMenu}
        callSideMenuHandler={callSideMenuHandler}
        currentUrl={currentUrl}
        role={user !== null ? user.acc_role : null}
      />
      {/* <ContentsCompo> */}
      {currentUrl && currentUrl !== "home" && currentUrl !== "monitor" && (
        <ContentTitle currentUrl={currentUrl}></ContentTitle>
      )}
      <Contents
        openFullScreenMode={openFullScreenMode}
        role={user !== null ? user.acc_role : null}
      />

      {/* </ContentsCompo> */}
    </HomeCompo>
  );
};

export default HomeContainer;
