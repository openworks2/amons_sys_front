import React, { useState } from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import styled from "styled-components";

const SideMenuCompo = styled.div`
  width: 260px !important;
  background: #1b1c1d 0% 0% no-repeat padding-box;
  opacity: 1;
  .sidemenu {
    width: 260px !important;
  }
  element.style {
    padding-top: 70px;
  }
  a.item::before {
    width: 0% !important;
  }
  .sidemenu-title {
    font-family: "NotoSansCJKkr-Medium";
    font-size: 16px;
    text-align: left;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }
  .item sidemenu-sub-title {
    font-family: "NotoSansCJKkr-Regular";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
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
          계정관리
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
      </Sidebar>
    </SideMenuCompo>
  );
};

export default SideMenu;
