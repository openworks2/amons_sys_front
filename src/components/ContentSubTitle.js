import React from "react";
import styled from "styled-components";

const SubTitleCompo = styled.div`
  font-family: "NotoSansKR-Medium";
  font-size: 16px;
  text-align: left;
  letter-spacing: 0px;
  color: #7c7c7c;
  opacity: 1;
  margin: 0px;
  padding: 0px;
`;

const ContentSubTitle = ({ subTitle }) => {
  return <SubTitleCompo>{subTitle}</SubTitleCompo>;
};

export default ContentSubTitle;
