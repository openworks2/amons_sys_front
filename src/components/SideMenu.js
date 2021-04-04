import React, { useState } from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import styled from "styled-components";

import { FaIdCard, FaDesktop } from "react-icons/fa";

const SideMenuCompo = styled.div`
  opacity: 1;

  .side-icon {
    vertical-align: middle;
    position: absolute;
    font-size: 17px;
    left: 210px;
    top: px;
  }
  .sidemenu {
    background: #1b1c1d 0% 0% no-repeat padding-box !important;
    width: 260px !important;
    top: 70px;
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .divide-line {
    border: solid 1px;
    color: #7c7c7c;
    width: 100%;
  }
  a.item::before {
    width: 0% !important;
  }
  a.item.sidemenu-title {
    font-family: "NotoSansCJKkr-Medium";
    font-size: 16px;
    text-align: left !important;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  a.item.sidemenu-sub-title {
    font-family: "NotoSansCJKkr-Regular";
    font-size: 14px;
    text-align: left !important;
    letter-spacing: 0px !important;
    color: #7c7c7c !important;
    opacity: 1 !important;
    padding-top: 8px;
    padding-bottom: 10px;
  }
`;

const SideMenu = ({ callSideMenu, sideMenuClickHandler }) => {
  const [clickedSideMenu, setClickedSideMenu] = useState("");

  const handleMenuClick = (e, name) => {
    setClickedSideMenu(name);
  };

  return (
    <SideMenuCompo className="sidemenu-compo">
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => sideMenuClickHandler()}
        vertical
        visible={callSideMenu}
        className="sidemenu"
      >
        <hr className="divide-line" />
        <Menu.Item as="a" className="sidemenu-title">
          모니터링
          <FaDesktop className="side-icon" />
        </Menu.Item>
        <hr className="divide-line" />
        <Menu.Item as="a" className="sidemenu-title">
          이력조회
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="logEmergency"
          active={clickedSideMenu === "logEmergency"}
          onClick={(e, name) => {
            handleMenuClick(e, name);
          }}
        >
          알람이력 : 작업자
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="logWorker"
          active={clickedSideMenu === "logWorker"}
        >
          막장 잔류이력 : 작업자
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="logWorker"
          active={clickedSideMenu === "logVehicle"}
        >
          막장 잔류이력 : 차량
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="logDig"
          active={clickedSideMenu === "logDig"}
        >
          굴진이력
        </Menu.Item>
        <hr className="divide-line" />
        <Menu.Item as="a" className="sidemenu-title">
          현장관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoAnnounce"
          active={clickedSideMenu === "infoAnnounce"}
        >
          공지사항
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          노선관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          누적 굴진량 입력
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          공정상태 변경
        </Menu.Item>
        <hr className="divide-line" />
        <Menu.Item as="a" className="sidemenu-title">
          일반관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          소속사관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          작업자관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          차량관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          디바이스 관리 : 비콘
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          디바이스 관리 : 스캐너
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          디바이스 관리 : CCTV
        </Menu.Item>
        <hr className="divide-line" />
        <Menu.Item as="a" className="sidemenu-title">
          계정관리 <FaIdCard className="side-icon" />
        </Menu.Item>
        <hr className="divide-line" />
        <Menu.Item as="a" className="sidemenu-title">
          기타관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="infoLocal"
          active={clickedSideMenu === "infoLocal"}
        >
          환경설정
        </Menu.Item>
        <Menu.Item as="a" className="sidemenu-sub-title">
          퇴출관리
        </Menu.Item>
        <Menu.Item as="a" className="sidemenu-sub-title">
          로그인 기록
        </Menu.Item>
        <hr className="divide-line" />
      </Sidebar>
    </SideMenuCompo>
  );
};

export default SideMenu;
