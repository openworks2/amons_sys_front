import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import {
  isBrowser,
  isMobile,
  isAndroid,
  isIOS,
  isChrome
} from "react-device-detect";

const MainComo = styled.div`
  width: 100%;
  height: 100%;
`;

const MainContainer = () => {
  console.log('isBrowser--->', isBrowser)
  console.log('isMobile--->', isMobile)
  console.log('isAndroid--->', isAndroid)
  console.log('isIOS--->', isIOS)
  console.log('isChrome--->', isChrome)
  alert('isIOS--->'+isIOS)
  // debugger;
  return (
    <MainComo className="main-component">
      {
        isBrowser && <Redirect to="/amons/signin" />
      }
      {
        isMobile && <Redirect to="/amons/m.signin" />
      }
      {
        isIOS && <Redirect to="/amons/m.signin" />
      }

    </MainComo>
  );
};

export default MainContainer;
