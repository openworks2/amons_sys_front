import React, {useEffect, useState} from "react";
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
  FaBullhorn,
  FaRoad,
  FaIdCard,
  FaHardHat,
  FaIdCardAlt,
  FaTruck,
  FaBluetooth,
  FaDoorOpen,
  FaCog,
  FaHistory,
} from "react-icons/fa";
import { Image } from "semantic-ui-react";

const ContentTitleBoxCompo = styled.div`
  padding-left: 280px;
  padding-top: 9.3vh;
  padding-right: 130px;
  font-family: "NotoSansKR-Medium";
  text-align: left;
  color: #2e2e2e;
  position: relative;
  
  .content-title-compo {
    font-family: "NotoSansKR-Medium";
    margin-left: 15px;
    font-size: 24px;
    vertical-align: middle;
    display: inline-block;
  }

  .content-icon-compo {
    font-family: "NotoSansKR-Medium";
    width: 30px;
    height: 30px;
    font-size: 24px;
    padding: 5px;
    display: inline-block;
    vertical-align: middle;
  }

  .img-icons {
    width : 25px;
    height : 25px;
    margin-top : 2px;
    display: inline-block;
    vertical-align: top;
    object-fit: cover;
  }
  .content-title-divide-line {
    background: #000000;
    margin-top: 12px;
    height: 1px;
    width: 1623px;
    margin-bottom: 20px;
  }
`;

const ContentTitle = ({ currentUrl }) => {

  let title="";

  const printContentTitle = (currentUrl) => {
    switch (currentUrl) {
      case "monitering":
        title = "";
        return ;
      // ============이력조회=============
      case "emergencylog":
        title ="알람이력: 작업자";
        return <FaHardHat />;
      case "workerlog":
        title ="막장 잔류이력 : 작업자";
        return <FaHardHat />;
      case "vehiclelog":
        title ="막장 잔류이력 : 차량";
        return <FaTruck />;
      case "diglog":
         title= "굴진이력"
        return  (<Image
          src="/icons/dig.svg"
          alt="굴진아이콘"
          className="img-icons"
          inline={true}
          wrapped={false}
          ui={false}
          />);
        // ============현장관리=============
      case "announce":
        title="공지사항";
        return <FaBullhorn />;
      case "local":
        title="노선관리";
        return <FaRoad />;
      case "dig":
        title="누적 굴진량 입력";
        return  (<Image
        src="/icons/dig.svg"
        alt="굴진아이콘"
        className="img-icons"
        inline={true}
        wrapped={false}
        ui={false}
        />);
      case "state":
        title= "공정상태 변경";
        return (<Image
          src="/icons/state.svg"
          alt="상태아이콘"
          className="img-icons"
          inline={true}
          wrapped={false}
          ui={false}
          />);
        // ============일반관리=============
      case "company":
        title= "소속사 관리";
        return <FaIdCardAlt />;
      case "worker":
        title= "작업자 관리";
        return <FaHardHat />;
      case "vehicle":
        title= "차량 관리";
        return <FaTruck />;
      case "beacon":
        title= "디바이스 관리 : 비콘";
        return <FaBluetooth />;
      case "scanner":
        title= "디바이스 관리 : 스캐너";
        return (
          <Image
          src="/icons/router.png"
          alt="스캐너아이콘"
          className="img-icons"
          inline={true}
          wrapped={false}
          ui={false}
          />
          );
      case "cctv":
        title= "디바이스 관리 : CCTV";
        return (
          <Image
          src="/icons/cctv.png"
          alt="CCTV아이콘"
          className="img-icons"
          inline={true}
          wrapped={false}
          ui={false}
          />
          );
      // ============계정관리=============
      case "account":
        title= "계정관리";
        return <FaIdCard />;
        // ============기타관리=============
      case "settings":
        title= "환경설정";
        return <FaCog />;
      case "kickworker":
        title= "퇴출관리 : 작업자";
        return <FaDoorOpen />;
      case "kickvehicle":
        title= "퇴출관리 : 차량";
        return <FaDoorOpen />;
      case "loginlog":
        title= "로그인 기록";
        return <FaHistory />;
      default:
    }
  };
  
  return (
       <ContentTitleBoxCompo className="content-title-box-compo">
        <div className="content-icon-compo">
          {printContentTitle(currentUrl)}
        </div>
        <div className="content-title-compo">{title}</div>
        <div className="content-title-divide-line" />
      </ContentTitleBoxCompo> 
  );
};

export default ContentTitle;
