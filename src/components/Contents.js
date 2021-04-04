import React from "react";
import styled from "styled-components";

const ContentsBodyCompo = styled.div`
  .input-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 368px;
    min-height: 800px;
    margin-top: 10px;
    position: absolute;
  }
  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 1236px;
    min-height: 800px;
    margin-top: 10px;
    margin-left: 388px;
    position: absolute;
  }
`;

const Contents = () => {
  return (
    <ContentsBodyCompo>
      <span className="input-box"></span>
      <span className="table-box"></span>
    </ContentsBodyCompo>
  );
};

export default Contents;
