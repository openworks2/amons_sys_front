import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, Table, Menu } from "semantic-ui-react";
import styled from "styled-components";
import {
  FaBars,
  FaHome,
  FaSignOutAlt,
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
  FaVolumeMute,
  FaList,
  FaQuestion,
} from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";

const HeaderCompo = styled.div`
  position: fixed !important;
  z-index: 1;
  margin-bottom: 70px;
  min-width: 1680px;
  min-height: 70px;
  display: inline-block;
  width: 100%;
  height: 70px;
  background: #2e2e2e !important;
  opacity: 1;
  justify-content: center;
  display: inline-block !important;

  .header-table {
    background: #2e2e2e 0% 0% no-repeat padding-box;
    opacity: 1;
    border-top-width: 0px !important;
    border-bottom-width: 0px !important;
    border-left-width: 0px !important;
    border-right-width: 0px !important;
    border-radius: 0px;
    @media only screen and (max-width: 767px) {
      width: 100% !important;
      display: table-row !important;
    }
  }
  .company {
    padding-right: 0px !important;
  }

  .title {
    padding-left: 0px !important;
    color: #ffffff;
    font-size: 30px;
    font-family: "NotoSansKR-Regular";
    text-align: left;
    letter-spacing: 0px;
    opacity: 1;
  }

  .title-highlight {
    color: #f1592a;
    font-size: 30px;
    font-family: "NotoSansKR-Medium";
    text-align: left;
    letter-spacing: 0px;
  }

  a.shortcuts {
    text-align: center !important;
    font-size: 25px;
    width: 72.22px;
    color: #ffffff;
    border: 0px !important;
    padding: 4px !important;
    display: inline-block;
    float: right;
  }
  a.shortcuts:hover {
    .icon {
      color: #72afd2 !important;
    }
  }

  .iconbox {
    width: 39px;
    height: 39px;
    border-radius: 50px;
    margin-left: auto;
    margin-right: auto;
    vertical-align: middle;
    justify-content: center;
    cursor: pointer !important;
  }

  .iconbox.alert {
    background: #c23235 0% 0% no-repeat padding-box;
  }

  .iconbox.home {
    background: #a73b1f 0% 0% no-repeat padding-box;
  }

  .iconbox.dig {
    background: #686868 0% 0% no-repeat padding-box;
  }

  .iconbox.nomalscreen {
    background: #5e7827 0% 0% no-repeat padding-box;
    padding: 0px;
  }

  .iconbox.fullscreen {
    background: #306f4d 0% 0% no-repeat padding-box;
  }

  .iconbox.question {
    background: #305a70 0% 0% no-repeat padding-box;
  }

  .icon {
    margin-top: 7px;
  }

  .shortcut-subtitle {
    font-size: 12px !important;
    text-align: center;
    cursor: pointer !important;
  }
`;

const SidebarButton = styled.div`
  font-size: 30px;
  height: 44px !important;
  width: 44px !important;
  padding-right: 0px !important;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer !important;
  .icon {
    margin-top: 7px;
    margin-left: 7px;
    &:hover {
      color: #72afd2 !important;
    }
  }
`;

const LogoutButton = styled.div`
  font-size: 30px;
  height: 44px;
  width: 44px;
  color: #7c7c7c;
  background-color: #000000;
  margin-left: 20px;
  cursor: pointer !important;
  .icon {
    margin-top: 7px;
    margin-left: 9px;
    &:hover {
      color: #72afd2 !important;
    }
  }
`;

const Header = ({ callSideMenuHandler }) => {
  return (
    <HeaderCompo className="header-component">
      <Table celled className="header-table" unstackable={true}>
        <Table.Row selectable={false}>
          <Table.Cell className="sidemenu-button">
            <SidebarButton
              className="side-menu-button"
              onClick={() => {
                callSideMenuHandler();
              }}
            >
              <FaBars className="icon" />
            </SidebarButton>
          </Table.Cell>
          <Table.Cell className="company">
            <Image
              src="/header/company-white.png"
              alt="회사명"
              verticalAlign="middle"
              inline="true"
            />
          </Table.Cell>
          <Table.Cell className="title">
            <span className="title">
              고속국도 제 14호선 함양-울산선(함양-합천) 건설공사(제4공구)
              {"    "}
            </span>
            <span className="title-highlight">신원3터널</span>
          </Table.Cell>
          <Table.Cell className="shortcuts" as={Link} to="/">
            <div className="iconbox alert">
              <FaVolumeMute className="icon" />
            </div>
            <div className="shortcut-subtitle">알람음</div>
          </Table.Cell>
          <Table.Cell className="shortcuts" as={Link} to="/">
            <div className="iconbox home">
              <FaHome className="icon" />
            </div>
            <div className="shortcut-subtitle">HOME</div>
          </Table.Cell>
          <Table.Cell className="shortcuts">
            <div className="iconbox dig">
              <FaList className="icon" />
            </div>
            <div className="shortcut-subtitle">굴진율</div>
          </Table.Cell>
          <Table.Cell className="shortcuts" as={Link} to="/">
            <div className="iconbox nomalscreen">
              <FaCompressArrowsAlt className="icon" />
            </div>
            <div className="shortcut-subtitle" as={Link} to="/">
              일반화면
            </div>
          </Table.Cell>
          <Table.Cell className="shortcuts" as={Link} to="/">
            <div className="iconbox fullscreen">
              <FaExpandArrowsAlt className="icon" />
            </div>
            <div className="shortcut-subtitle">전체화면</div>
          </Table.Cell>
          <Table.Cell className="shortcuts" as={Link} to="/">
            <div className="iconbox question">
              <FaQuestion className="icon" />
            </div>
            <div className="shortcut-subtitle">도움말</div>
          </Table.Cell>
          <Table.Cell className="logout">
            <LogoutButton
              className="side-menu-button"
              onClick={() => {
                callSideMenuHandler();
              }}
            >
              <FaSignOutAlt className="icon" />
            </LogoutButton>
          </Table.Cell>
        </Table.Row>
      </Table>
    </HeaderCompo>
  );
};

export default Header;
