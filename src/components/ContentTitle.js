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
  FaHardHat,
  FaIdCardAlt,
  FaTruck,
  FaBluetooth,
} from "react-icons/fa";
import { Loader } from "semantic-ui-react";

const ContentTitleBoxCompo = styled.div`
  padding: 0;
  margin-bottom: 20px;
  text-align: left;

  color: #2e2e2e;
  .content-title-compo {
    font-family: "NotoSansCJKkr-Medium";
    margin-left: 14px;
    font-size: 24px;
  }

  .content-icon-compo {
    font-size: 25px;
  }

  .content-title-divide-line {
    border: solid 1px;
    top: 130px;
    width: 1623px;
    position: absolute;
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
      return;
    case "디바이스 관리 : CCTV":
      return;
    // ============계정관리=============
    case "":
      return;
    // ============기타관리=============
    case "":
      return;
    case "":
      return;
    case "":
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
      <hr className="content-title-divide-line" />
    </ContentTitleBoxCompo>
  );
};

export default ContentTitle;
