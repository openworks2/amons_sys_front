import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CompanyInput from "../../components/general/CompanyInput";
import CompanyTable from "../../components/general/CompanyTable";
import { Input, Loader } from "semantic-ui-react";
import { FaIdCardAlt } from "react-icons/fa";
import { Image } from "semantic-ui-react";
// 가짜 데이터
import companydata from "../../fakedata/companydata";

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

const CompanyContatiner = () => {
  // =====================인풋폼=========================

  const [inputData, setInputData] = useState({});

  // inputform onchange
  const onChangeInput = useCallback((formdata) => {
    const value = formdata.target.value;
    const name = formdata.target.name;

    setInputData({
      ...inputData,
      [name]: value,
    });
  });

  // 기능 이동간 inputform state값 초기화
  const initInputData = useCallback(() => {
    setInputData({});
  });

  // 서브밋 버튼
  const submitButtonHandler = useCallback((e) => {
    alert("등록완료");
    e.preventDefault();
    const newCompany = inputData;
    companydata.push(newCompany);
    initInputData();
  });

  // =====================테이블=========================
  // 클릭 관련 {클릭 여부 : boolean, 클릭한 줄}

  const [activeItem, setActiveItem] = useState(null);

  const activeHandler = useCallback((clickedItem) => {
    if (activeItem !== null) {
      if (activeItem.no === clickedItem.no) {
        console.log("클릭 취소");
        setActiveItem(null);
      }
    } else {
      console.log("클릭-->" + clickedItem);

      setActiveItem({
        no: clickedItem.target.no,
        company: clickedItem.target.company,
        sector: clickedItem.target.sector,
        description: clickedItem.target.description,
      });
      console.log(activeItem);
    }
  });
  // 페이지 네이션

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
          <CompanyInput activeItem={activeItem} />
        </span>
        <span className="table-box">
          <CompanyTable activeItem={activeItem} activeHandler={activeHandler} />
        </span>
      </ContentsBodyCompo>
    </>
  );
};

export default CompanyContatiner;
