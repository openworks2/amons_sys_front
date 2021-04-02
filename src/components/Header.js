import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import styled from "styled-components";
import { HiMenu } from "react-icons/hi";

const HeaderCompo = styled.div`
  position: fixed !important;
  width: 100%;
  background: #992313 !important;
  opacity: 1;
  height: 70px;
  text-align: center;
  vertical-align: middle !important;
  justify-content: center;
`;

const SidebarButton = styled.div`
  float: left !important;
  top: 13px;
  left: 13px;
  height: 44px;
  width: 44px;
  font-size: 30px;
  text-align: center;
  vertical-align: center;
  justify-content: center;
  color: #ffffff;
  background-color: #000000;
  position: fixed !important;
`;

const Header = ({ sideMenuClickHandler }) => {
  return (
    <HeaderCompo className="header-component">
      <Grid relaxed>
        <Grid.Row>
          <Grid.Column width={1}>
            <SidebarButton
              className="side-menu-button"
              onClick={() => {
                sideMenuClickHandler();
              }}
            >
              <HiMenu />
            </SidebarButton>
          </Grid.Column>
          <Grid.Column width={1}>
            <Image
              src="/header/company-white.png"
              alt="회사명"
              verticalAlign="middle"
              inline="true"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            고속국도 제 14호선 함양-울산선(함양-합천) 건설공사(제4공구)
          </Grid.Column>
          <Grid.Column width={1}>
            <Image src="/header/한화건설-white.png" />
          </Grid.Column>
          <Grid.Column width={6}>
            <Image src="/header/한화건설-white.png" />
          </Grid.Column>
          <Grid.Column width={1}>
            <Image src="/header/한화건설-white.png" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </HeaderCompo>
  );
};

export default Header;
