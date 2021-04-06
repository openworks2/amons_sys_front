import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CompanyInput from "./CompanyInput";
import CompanyTable from "./CompanyTable";
import { Loader } from "semantic-ui-react";
import { FaIdCardAlt } from "react-icons/fa";
import { Image } from "semantic-ui-react";

const ContentTitleBoxCompo = styled.div`
  font-family: "NotoSansKR-Medium";
  padding: 0;
  margin-bottom: 32px;
  text-align: left;

  color: #2e2e2e;
  .content-title-compo {
    font-family: "NotoSansKR-Medium";
    margin-left: 35px;
    font-size: 24px;
    vertical-align: middle;
  }

  .content-icon-compo {
    font-family: "NotoSansKR-Medium";
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

const ContentsBodyCompo = styled.div`
  .input-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 368px;
    min-height: 860px;
    margin-top: 10px;
    position: absolute;
    padding-top: 22px;
  }
  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 1236px;
    min-height: 860px;
    margin-top: 10px;
    margin-left: 388px;
    padding-top: 22px;
    position: absolute;
  }
`;

const Company = () => {
  // =====================인풋폼=========================
  // 서브밋 버튼
  const submitButtonHandler = (e) => {};
  // 페이지 네이션

  // =====================테이블=========================
  // 클릭 관련 {클릭 여부 : boolean, 클릭한 줄}
  const [clickInfo, setClickInfo] = useState({
    isClicked: false,
    clickedRow: 20,
  });
  const rowClickHandler = (row) => {
    if (row === clickInfo.clickedRow) {
      setClickInfo({
        isClicked: !clickInfo.isClicked,
        clickedRow: 20,
      });
    } else {
      setClickInfo({ isClicked: true, clickedRow: row });
    }
  };
  // ====================================================

  return (
    <>
      <ContentTitleBoxCompo>
        <span className="content-icon-compo">
          <FaIdCardAlt />
        </span>
        <span className="content-title-compo">소속사 관리</span>
        <div className="content-title-divide-line" />
      </ContentTitleBoxCompo>
      <ContentsBodyCompo className="contents-body-compo">
        <span className="input-box">
          <CompanyInput />
        </span>
        <span className="table-box">
          <CompanyTable />
        </span>
      </ContentsBodyCompo>
    </>
  );
};

export default Company;
