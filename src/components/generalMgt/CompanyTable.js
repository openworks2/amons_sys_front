import React from "react";
import ContentSubTitle from "../ContentSubTitle";
import styled from "styled-components";
import {} from "semantic-ui-react";

const CompanyTableCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;
`;

const CompanyTable = () => {
  return (
    <CompanyTableCompo className="company-table-compo">
      <ContentSubTitle subTitle="소속사 목록" />
    </CompanyTableCompo>
  );
};

export default CompanyTable;
