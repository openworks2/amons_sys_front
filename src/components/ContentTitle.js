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
} from "react-icons/fa";

const ContentTitleBoxCompo = styled.div`
  padding: 0;
  margin-bottom: 20px;
  text-align: left;

  color: #2e2e2e;
  .content-title-compo {
    font-family: "NotoSansCJKkr-Medium";
    font-size: 24px;
  }

  .content-icon-compo {
    font-size: 25px;
    margin-right: 14px;
  }

  .content-title-divide-line {
    border: solid 1px;
    top: 130px;
    width: 1623px;
    position: absolute;
  }
`;

const printContentTitleIcon = (contentTitle) => {
  switch (contentTitle) {
    case "":
      break;
    case "소속사 관리":
      return <FaIdCardAlt />;
    case "작업자 관리":
      return <FaHardHat />;
    case "차량 관리":
      return <FaTruck />;
    case "디바이스 관리 : 비콘":
      return;
    case "디바이스 관리 : 스캐너":
      return;
    case "디바이스 관리 : CCTV":
      return;
    default:
  }
};

const ContentTitle = ({ contentTitle }) => {
  return (
    <ContentTitleBoxCompo>
      <span className="content-icon-compo">
        {printContentTitleIcon(contentTitle)}
      </span>
      <span className="content-title-compo">{contentTitle}</span>
      <hr className="content-title-divide-line" />
    </ContentTitleBoxCompo>
  );
};

export default ContentTitle;
