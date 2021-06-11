import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import {
  isBrowser,
  isMobile
} from "react-device-detect";

const MainComo = styled.div`
  width: 100%;
  height: 100%;
`;

const MainContainer = () => {
  // debugger;
  return (
    <MainComo className="main-component">
      {
        isBrowser && <Redirect to="/amons/signin" />
      }
      {
        isMobile && <Redirect to="/amons/m.signin" />
      }
    </MainComo>
  );
};

export default MainContainer;
