import React, { useEffect, useState } from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import styled from "styled-components";

import { FaIdCard, FaDesktop } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideMenuCompo = styled.div`
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
  }
  .ui.inverted.vertical.labeled.icon.ui.overlay.left.visible.sidebar.sidemenu.menu {
    height: 94% !important;
  }
  .sidemenu {
    background: #1b1c1d 0% 0% no-repeat padding-box !important;
    width: 260px !important;
    margin-top: 70px !important;
    padding-top: 15px;
    padding-left: 5px;
    padding-right: 10px;
    height: 1000px !important;
    overflow: auto !important;
    &::-webkit-scrollbar {
      display: none !important;
    }
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
  }
  a.item.sidemenu-title {
    font-family: "NotoSansKR-Medium";
    font-size: 16px;
    text-align: left !important;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  b.item.sidemenu-title-non-click {
    font-family: "NotoSansKR-Medium";
    font-size: 16px;
    text-align: left !important;

    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  a.item.sidemenu-sub-title {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
    text-align: left !important;
    letter-spacing: 0px !important;
    color: #7c7c7c !important;
    opacity: 1 !important;
    padding-top: 8px;
    padding-bottom: 10px;
  }
`;

const SideMenu = ({ callSideMenu, callSideMenuHandler, currentUrl, role }) => {
  console.log("SideMenu-->", role);
  useEffect(() => {
    console.log(currentUrl);
  }, [currentUrl]);
  return (
    <SideMenuCompo className="sidemenu-compo">
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => callSideMenuHandler}
        vertical
        visible={
          currentUrl !== "home" && currentUrl !== "monitor"
            ? true
            : callSideMenu
        }
        className="sidemenu"
      >
        {/* ================================================================ */}
        <div className="divide-line" />

        {currentUrl !== "monitor" ? (
          <>
            {(role === 0 || role === 1 || role === 2) && (
              <>
                <Menu.Item
                  as={Link}
                  to="/amons/home/monitor"
                  className="sidemenu-title"
                  name="moniter"
                  active={currentUrl === "moniter"}
                >
                  모니터링
                  <FaDesktop className="side-icon" />
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" />
                <Menu.Item
                  as="b"
                  className="sidemenu-title-non-click"
                  active={false}
                >
                  이력조회
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/log/alarm"
                  className="sidemenu-sub-title"
                  name="alarm"
                  active={currentUrl === "alarm"}
                >
                  알람이력 : 작업자
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/log/workerlog"
                  className="sidemenu-sub-title"
                  name="workerlog"
                  active={currentUrl === "workerlog"}
                >
                  막장 잔류이력 : 작업자
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/log/vehiclelog"
                  className="sidemenu-sub-title"
                  name="vehiclelog"
                  active={currentUrl === "vehiclelog"}
                >
                  막장 잔류이력 : 차량
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/log/diglog"
                  className="sidemenu-sub-title"
                  name="diglog"
                  active={currentUrl === "diglog"}
                >
                  굴진이력
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" />
              </>
            )}
            {(role === 0 || role === 1) && (
              <>
                <Menu.Item
                  as="b"
                  className="sidemenu-title-non-click"
                  active={false}
                >
                  현장관리
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/field/announce"
                  className="sidemenu-sub-title"
                  name="announce"
                  active={currentUrl === "announce"}
                >
                  공지사항
                </Menu.Item>
              </>
            )}
            {role === 0 && (
              <Menu.Item
                as={Link}
                to="/amons/home/field/local"
                className="sidemenu-sub-title"
                name="local"
                active={currentUrl === "local"}
              >
                노선관리
              </Menu.Item>
            )}
            {(role === 0 || role === 1) && (
              <>
                <Menu.Item
                  as={Link}
                  to="/amons/home/field/dig"
                  className="sidemenu-sub-title"
                  name="dig"
                  active={currentUrl === "dig"}
                >
                  누적 굴진량 입력
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/field/process"
                  className="sidemenu-sub-title"
                  name="process"
                  active={currentUrl === "process"}
                >
                  공정상태 변경
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" />
                <Menu.Item
                  as="b"
                  className="sidemenu-title-non-click"
                  active={false}
                >
                  일반관리
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/general/company"
                  className="sidemenu-sub-title"
                  name="company"
                  active={currentUrl === "company"}
                  link={true}
                >
                  소속사 관리
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/general/worker"
                  className="sidemenu-sub-title"
                  name="worker"
                  active={currentUrl === "worker"}
                  link={true}
                >
                  작업자 관리
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/general/vehicle"
                  className="sidemenu-sub-title"
                  name="vehicle"
                  active={currentUrl === "vehicle"}
                >
                  차량 관리
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/general/beacon"
                  className="sidemenu-sub-title"
                  name="beacon"
                  active={currentUrl === "beacon"}
                >
                  디바이스 관리 : 비콘
                </Menu.Item>
              </>
            )}
            {role === 0 && (
              <>
                <Menu.Item
                  as={Link}
                  to="/amons/home/general/scanner"
                  className="sidemenu-sub-title"
                  name="scanner"
                  active={currentUrl === "scanner"}
                >
                  디바이스 관리 : 스캐너
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/general/cctv"
                  className="sidemenu-sub-title"
                  name="cctv"
                  active={currentUrl === "cctv"}
                >
                  디바이스 관리 : CCTV
                </Menu.Item>
                {/* ================================================================ */}
              </>
            )}
            {(role === 0 || role === 1) && (
              <>
                <div className="divide-line" />
                <Menu.Item
                  as={Link}
                  to="/amons/home/account"
                  className="sidemenu-title"
                  name="account"
                  active={currentUrl === "account"}
                >
                  계정관리 <FaIdCard className="side-icon" />
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" active={false} />
                <Menu.Item
                  as="b"
                  className="sidemenu-title-non-click"
                  active={false}
                >
                  기타관리
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/ect/settings"
                  className="sidemenu-sub-title"
                  name="settings"
                  active={currentUrl === "settings"}
                >
                  환경설정
                </Menu.Item>
              </>
            )}
            {role === 0 && (
              <>
                <Menu.Item
                  as={Link}
                  to="/amons/home/ect/kickworker"
                  className="sidemenu-sub-title"
                  name="kickworker"
                  active={currentUrl === "kickworker"}
                >
                  퇴출관리 : 작업자
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/ect/kickvehicle"
                  className="sidemenu-sub-title"
                  name="kickvehicle"
                  active={currentUrl === "kickvehicle"}
                >
                  퇴출관리 : 차량
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/amons/home/ect/loginlog"
                  className="sidemenu-sub-title"
                  name="loginlog"
                  active={currentUrl === "loginlog"}
                >
                  로그인 기록
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" />
              </>
            )}
          </>
        ) : (
          // 모니터링 화면일 때 사이드 바 재랜더링
          <>
            {(role === 0 || role === 1 || role === 2) && (
              <>
                <Menu.Item
                  as={"a"}
                  to="/amons/home/monitor"
                  className="sidemenu-title"
                  name="moniter"
                  active={currentUrl === "moniter"}
                >
                  모니터링
                  <FaDesktop className="side-icon" />
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" />
                <Menu.Item
                  as="b"
                  className="sidemenu-title-non-click"
                  active={false}
                >
                  이력조회
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/log/alarm"
                  className="sidemenu-sub-title"
                  name="alarm"
                  active={currentUrl === "alarm"}
                >
                  알람이력 : 작업자
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/log/workerlog"
                  className="sidemenu-sub-title"
                  name="workerlog"
                  active={currentUrl === "workerlog"}
                >
                  막장 잔류이력 : 작업자
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/log/vehiclelog"
                  className="sidemenu-sub-title"
                  name="vehiclelog"
                  active={currentUrl === "vehiclelog"}
                >
                  막장 잔류이력 : 차량
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/log/diglog"
                  className="sidemenu-sub-title"
                  name="diglog"
                  active={currentUrl === "diglog"}
                >
                  굴진이력
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" />
              </>
            )}
            {(role === 0 || role === 1) && (
              <>
                <Menu.Item
                  as="b"
                  className="sidemenu-title-non-click"
                  active={false}
                >
                  현장관리
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/field/announce"
                  className="sidemenu-sub-title"
                  name="announce"
                  active={currentUrl === "announce"}
                >
                  공지사항
                </Menu.Item>
              </>
            )}
            {role === 0 && (
              <Menu.Item
                as={"a"}
                href="/amons/home/field/local"
                className="sidemenu-sub-title"
                name="local"
                active={currentUrl === "local"}
              >
                노선관리
              </Menu.Item>
            )}
            {(role === 0 || role === 1) && (
              <>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/field/dig"
                  className="sidemenu-sub-title"
                  name="dig"
                  active={currentUrl === "dig"}
                >
                  누적 굴진량 입력
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/field/process"
                  className="sidemenu-sub-title"
                  name="process"
                  active={currentUrl === "process"}
                >
                  공정상태 변경
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" />
                <Menu.Item
                  as="b"
                  className="sidemenu-title-non-click"
                  active={false}
                >
                  일반관리
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/general/company"
                  className="sidemenu-sub-title"
                  name="company"
                  active={currentUrl === "company"}
                  link={true}
                >
                  소속사 관리
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/general/worker"
                  className="sidemenu-sub-title"
                  name="worker"
                  active={currentUrl === "worker"}
                  link={true}
                >
                  작업자 관리
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/general/vehicle"
                  className="sidemenu-sub-title"
                  name="vehicle"
                  active={currentUrl === "vehicle"}
                >
                  차량 관리
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/general/beacon"
                  className="sidemenu-sub-title"
                  name="beacon"
                  active={currentUrl === "beacon"}
                >
                  디바이스 관리 : 비콘
                </Menu.Item>
              </>
            )}
            {role === 0 && (
              <>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/general/scanner"
                  className="sidemenu-sub-title"
                  name="scanner"
                  active={currentUrl === "scanner"}
                >
                  디바이스 관리 : 스캐너
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/general/cctv"
                  className="sidemenu-sub-title"
                  name="cctv"
                  active={currentUrl === "cctv"}
                >
                  디바이스 관리 : CCTV
                </Menu.Item>
                {/* ================================================================ */}
              </>
            )}
            {(role === 0 || role === 1) && (
              <>
                <div className="divide-line" />
                <Menu.Item
                  as={"a"}
                  href="/amons/home/account"
                  className="sidemenu-title"
                  name="account"
                  active={currentUrl === "account"}
                >
                  계정관리 <FaIdCard className="side-icon" />
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" active={false} />
                <Menu.Item
                  as="b"
                  className="sidemenu-title-non-click"
                  active={false}
                >
                  기타관리
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/ect/settings"
                  className="sidemenu-sub-title"
                  name="settings"
                  active={currentUrl === "settings"}
                >
                  환경설정
                </Menu.Item>
              </>
            )}
            {role === 0 && (
              <>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/ect/kickworker"
                  className="sidemenu-sub-title"
                  name="kickworker"
                  active={currentUrl === "kickworker"}
                >
                  퇴출관리 : 작업자
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/ect/kickvehicle"
                  className="sidemenu-sub-title"
                  name="kickvehicle"
                  active={currentUrl === "kickvehicle"}
                >
                  퇴출관리 : 차량
                </Menu.Item>
                <Menu.Item
                  as={"a"}
                  href="/amons/home/ect/loginlog"
                  className="sidemenu-sub-title"
                  name="loginlog"
                  active={currentUrl === "loginlog"}
                >
                  로그인 기록
                </Menu.Item>
                {/* ================================================================ */}
                <div className="divide-line" />
              </>
            )}
          </>
        )}
      </Sidebar>
    </SideMenuCompo>
  );
};

export default SideMenu;
