import React, { useState } from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import styled from "styled-components";

import { FaIdCard, FaDesktop } from "react-icons/fa";

const SideMenuCompo = styled.div`
  opacity: 1;
  cursor: default !important;
  //클릭한메뉴

  .ui.inverted.menu .active.item {
    cursor: default !important;
    background: #1b1c1d !important;
    color: #f1592a !important;
  }
  .ui.inverted.menu .active.item:hover {
    cursor: default !important;
    background: rgba(255, 255, 255, 0.08) !important;
    color: #f1592a !important;
  }
  .ui.vertical.menu .item:before {
    background: #1b1c1d !important;
  }

  .side-icon {
    vertical-align: middle;
    position: absolute;
    font-size: 17px;
    left: 210px;
    cursor: default !important;
  }
  .sidemenu {
    cursor: default !important;
    background: #1b1c1d 0% 0% no-repeat padding-box !important;
    width: 260px !important;
    top: 70px;
    padding-top: 15px;
    padding-left: 5px;
    padding-right: 10px;
  }
  .divide-line {
    background: #7c7c7c;
    width: 100%;
    height: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  a.item::before {
    width: 0% !important;
    cursor: default !important;
  }
  a.item.sidemenu-title {
    font-family: "NotoSansCJKkr-Medium";
    font-size: 16px;
    text-align: left !important;
    cursor: default !important;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  b.item.sidemenu-title-non-click {
    font-family: "NotoSansCJKkr-Medium";
    font-size: 16px;
    text-align: left !important;
    cursor: default !important;
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
    cursor: default !important;
    letter-spacing: 0px !important;
    color: #7c7c7c !important;
    opacity: 1 !important;
    padding-top: 8px;
    padding-bottom: 10px;
  }
`;

const SideMenu = ({
  callSideMenu,
  callSideMenuHandler,
  sideMenuClickHandler,
  currentMenu,
}) => {
  return (
    <SideMenuCompo className="sidemenu-compo">
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => callSideMenuHandler}
        vertical
        visible={callSideMenu}
        className="sidemenu"
      >
        {/* ================================================================ */}
        <div className="divide-line" />
        <Menu.Item
          as="a"
          className="sidemenu-title"
          name="모니터링"
          active={currentMenu === "모니터링"}
          onClick={sideMenuClickHandler}
        >
          모니터링
          <FaDesktop className="side-icon" />
        </Menu.Item>
        {/* ================================================================ */}
        <div className="divide-line" />
        <Menu.Item as="b" className="sidemenu-title-non-click" active={false}>
          이력조회
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="알람이력 : 작업자"
          active={currentMenu === "알람이력 : 작업자"}
          onClick={sideMenuClickHandler}
        >
          알람이력 : 작업자
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="막장 잔류이력 : 작업자"
          active={currentMenu === "막장 잔류이력 : 작업자"}
          onClick={sideMenuClickHandler}
        >
          막장 잔류이력 : 작업자
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="막장 잔류이력 : 차량"
          active={currentMenu === "막장 잔류이력 : 차량"}
          onClick={sideMenuClickHandler}
        >
          막장 잔류이력 : 차량
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="굴진이력"
          active={currentMenu === "굴진이력"}
          onClick={sideMenuClickHandler}
        >
          굴진이력
        </Menu.Item>
        {/* ================================================================ */}
        <div className="divide-line" />
        <Menu.Item as="b" className="sidemenu-title-non-click" active={false}>
          현장관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="공지사항"
          active={currentMenu === "공지사항"}
          onClick={sideMenuClickHandler}
        >
          공지사항
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="노선관리"
          active={currentMenu === "노선관리"}
          onClick={sideMenuClickHandler}
        >
          노선관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="누적 굴진량 입력"
          active={currentMenu === "누적 굴진량 입력"}
          onClick={sideMenuClickHandler}
        >
          누적 굴진량 입력
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="공정상태 변경"
          active={currentMenu === "공정상태 변경"}
          onClick={sideMenuClickHandler}
        >
          공정상태 변경
        </Menu.Item>
        {/* ================================================================ */}
        <div className="divide-line" />
        <Menu.Item as="b" className="sidemenu-title-non-click" active={false}>
          일반관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="소속사 관리"
          active={currentMenu === "소속사 관리"}
          onClick={sideMenuClickHandler}
        >
          소속사 관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="작업자 관리"
          active={currentMenu === "작업자 관리"}
          onClick={sideMenuClickHandler}
        >
          작업자 관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="차량 관리"
          active={currentMenu === "차량 관리"}
          onClick={sideMenuClickHandler}
        >
          차량 관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="디바이스 관리 : 비콘"
          active={currentMenu === "디바이스 관리 : 비콘"}
          onClick={sideMenuClickHandler}
        >
          디바이스 관리 : 비콘
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="디바이스 관리 : 스캐너"
          active={currentMenu === "디바이스 관리 : 스캐너"}
          onClick={sideMenuClickHandler}
        >
          디바이스 관리 : 스캐너
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="디바이스 관리 : CCTV"
          active={currentMenu === "디바이스 관리 : CCTV"}
          onClick={sideMenuClickHandler}
        >
          디바이스 관리 : CCTV
        </Menu.Item>
        {/* ================================================================ */}
        <div className="divide-line" />
        <Menu.Item
          as="a"
          className="sidemenu-title"
          name="계정관리"
          active={currentMenu === "계정관리"}
          onClick={sideMenuClickHandler}
        >
          계정관리 <FaIdCard className="side-icon" />
        </Menu.Item>
        {/* ================================================================ */}
        <div className="divide-line" active={false} />
        <Menu.Item as="b" className="sidemenu-title-non-click" active={false}>
          기타관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="환경설정"
          active={currentMenu === "환경설정"}
          onClick={sideMenuClickHandler}
        >
          환경설정
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="퇴출관리"
          active={currentMenu === "퇴출관리"}
          onClick={sideMenuClickHandler}
        >
          퇴출관리
        </Menu.Item>
        <Menu.Item
          as="a"
          className="sidemenu-sub-title"
          name="로그인 기록"
          active={currentMenu === "로그인 기록"}
          onClick={sideMenuClickHandler}
        >
          로그인 기록
        </Menu.Item>
        {/* ================================================================ */}
        <div className="divide-line" />
      </Sidebar>
    </SideMenuCompo>
  );
};

export default SideMenu;
