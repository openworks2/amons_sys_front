import React from "react";
import styled from "styled-components";
import CompanyInput from "./generalMgt/CompanyInput";
import CompanyTable from "./generalMgt/CompanyTable";

const ContentsBodyCompo = styled.div`
  .input-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 368px;
    min-height: 800px;
    margin-top: 10px;
    position: absolute;
    padding-top: 22px;
  }
  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 1236px;
    min-height: 800px;
    margin-top: 10px;
    margin-left: 388px;
    padding-top: 22px;
    position: absolute;
  }
`;

const Contents = () => {
  return (
    <ContentsBodyCompo className="contents-body-compo">
      <span className="input-box">
        <CompanyInput />
      </span>
      <span className="table-box">
        <CompanyTable />
      </span>
    </ContentsBodyCompo>
  );
};

export default Contents;
