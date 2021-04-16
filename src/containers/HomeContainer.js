import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Contents from "../components/Contents";
import Header from "../components/Header";
import ContentTitle from "../components/ContentTitle";
import SideMenu from "../components/SideMenu";
import { Redirect } from "react-router";

const HomeCompo = styled.div`
  height: 100%;
  width: 100%;
  min-width: 1680px;
  min-height: 700px;
  background: #f9fafb 0% 0% no-repeat padding-box;
  overflow: auto;
`;

const HomeContainer = () => {
  // 사이드바 호출 버튼 핸들러
  const [callSideMenu, setCallSideMenu] = useState(false);
  function callSideMenuHandler() {
    setCallSideMenu(!callSideMenu);
  }
  // URL 파라미터 받아오기
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(()=>{
    const url = document.location.href;
    const splitUrl = url.split("/");
    const location = splitUrl[splitUrl.length-1];
    console.log("location"+location);
    setCurrentUrl(location);
    console.log("currentUrl =====>"+currentUrl);
  })


  return (
    <>
      <HomeCompo className="Home-component">
        <Header callSideMenuHandler={callSideMenuHandler} />
        <SideMenu
          callSideMenu={callSideMenu}
          callSideMenuHandler={callSideMenuHandler}
          currentUrl={currentUrl}
        />
         {currentUrl
         &&currentUrl!=="home"
         && currentUrl!=="monitering" 
         && <ContentTitle currentUrl={currentUrl}></ContentTitle>}
        <Contents/>
      </HomeCompo>
    </>
  );
};

export default HomeContainer;
