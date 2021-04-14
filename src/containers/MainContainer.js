import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";

const MainComo = styled.div`
  width: 100%;
  height: 100%;
`;

const MainContainer = () => {

  return (
    <MainComo className="main-component">
      <Redirect to="/amons/home" />
    </MainComo>
  );
};

export default MainContainer;
