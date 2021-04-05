import React from "react";
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
  FaIdCard,
  FaHardHat,
  FaIdCardAlt,
  FaTruck,
  FaBluetooth,
} from "react-icons/fa";
import { Image } from "semantic-ui-react";

const ContentTitleBoxCompo = styled.div`
  font-family: "NotoSansCJKkr-Medium";
  padding: 0;
  margin-bottom: 32px;
  text-align: left;

  color: #2e2e2e;
  .content-title-compo {
    font-family: "NotoSansCJKkr-Medium";
    margin-left: 35px;
    font-size: 24px;
    vertical-align: middle;
  }

  .content-icon-compo {
    font-family: "NotoSansCJKkr-Medium";
    width: 30px;
    height: 30px;
    font-size: 25px;
    position: absolute;
  }

  .content-title-divide-line {
    background: #000000;
    margin-top: 12px;
    height: 1px;
    top: 125px;
    width: 1623px;
    position: absolute;
  }
  .img-icons {
    display: inline-block;
  }
`;

const printContentTitleIcon = (currentMenu) => {
  switch (currentMenu) {
    case "":
      return <h1>원하시는 메뉴를 선택해 주세요.</h1>;
    case "모니터링":
      return <FaIdCardAlt />;
    // ============이력조회=============
    case "알람이력 : 작업자":
      return <FaIdCardAlt />;
    case "막장 잔류이력 : 작업자":
      return <FaIdCardAlt />;
    case "막장 잔류이력 : 차량":
      return <FaIdCardAlt />;
    case "굴진이력":
      return <FaIdCardAlt />;
    // ============현장관리=============
    case "공지사항":
      return <FaIdCardAlt />;
    case "노선관리":
      return <FaIdCardAlt />;
    case "누적 굴진량 입력":
      return <FaIdCardAlt />;
    case "공정상태 변경":
      return <FaIdCardAlt />;
    // ============일반관리=============
    case "소속사 관리":
      return <FaIdCardAlt />;
    case "작업자 관리":
      return <FaHardHat />;
    case "차량 관리":
      return <FaTruck />;
    case "디바이스 관리 : 비콘":
      return <FaBluetooth />;
    case "디바이스 관리 : 스캐너":
      return (
        <Image
          src="/icons/router.png"
          alt="스캐너아이콘"
          className="img-icons"
          inline={true}
        />
      );
    case "디바이스 관리 : CCTV":
      return (
        <Image
          src="/icons/cctv.png"
          alt="CCTV아이콘"
          className="img-icons"
          inline={true}
        />
      );
    // ============계정관리=============
    case "계정관리":
      return <FaIdCard />;
    // ============기타관리=============
    case "환경설정":
      return;
    case "퇴출관리":
      return;
    case "로그인 기록":
      return;
    default:
  }
};

const ContentTitle = ({ currentMenu }) => {
  return (
    <ContentTitleBoxCompo>
      <span className="content-icon-compo">
        {printContentTitleIcon(currentMenu)}
      </span>
      <span className="content-title-compo">{currentMenu}</span>
      <div className="content-title-divide-line" />
    </ContentTitleBoxCompo>
  );
};

export default ContentTitle;
