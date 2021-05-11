import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import LogDigTable from "../../components/log/LogDigTable";
import { useDispatch, useSelector } from "react-redux";
import { getLocals } from "../../modules/locals";
import { getLogDigMonth, postLogDigSearch } from "../../modules/digs";
import moment from "moment";
import "moment/locale/ko";

const ContentsCompo = styled.div`
  min-width: 1680px !important;
  min-height: 756px;
  height: 84%;
  padding-left: 280px !important;
  padding-right: 130px;
  position: relative;
`;

const ContentsBodyCompo = styled.div`
  min-width: 1630px !important;
  min-height: 720px !important;
  width: 100%;
  overflow: auto;
  margin: 0px;
  padding: 0px;
  position: relative;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    margin: 0px;
    display: none;
  }

  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 398px;
    height: 82.5vh;
    min-height: 683px;
    margin-left: 6px;
    padding-top: 10px;
    display: inline-block !important;
    vertical-align: top;
    &.one {
      background-color: red;
    }
    &.two {
      background-color: green;
    }
    &.three {
      background-color: blue;
    }
    &.four {
      background-color: yellow;
    }
  }
`;

const ErrMsg = styled.div`
  text-align: center;
  color: green;
  vertical-align: middle;
  font-size: 24px;
  margin-top: 40vh;
`;
// ***********************************Logic Area*****************************************

const LogDigContainer = () => {
  const { data, loading, error } = useSelector((state) => state.digs.logDigs);

  const localData = useSelector((state) => state.locals.locals.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getLogDigMonth());
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log("data");
    console.log(data);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  }, []);

  const [usedLocalData, setUsedLocalData] = useState([]);

  const [dataSlotOne, setDataSlotOne] = useState([]);
  const [dataSlotTwo, setDataSlotTwo] = useState([]);
  const [dataSlotThree, setDataSlotThree] = useState([]);
  const [dataSlotFour, setDataSlotFour] = useState([]);

  useEffect(() => {
    if (localData) {
      // localData 받아와서 4개 자르기
      let _usedLocalData = localData.filter((el) => el.local_used === 1);

      console.log("_usedLocalData filter 필터필터");
      console.log(_usedLocalData);
      _usedLocalData = _usedLocalData.slice(0, 4);
      console.log("_usedLocalData filter 슬라이스");
      console.log(_usedLocalData);
      setUsedLocalData(_usedLocalData);
    }
  }, [localData]);

  useEffect(() => {
    if (usedLocalData !== undefined && data) {
      let _logDigsData = data;
      console.log("_usedLocalData");
      console.log(usedLocalData);
      console.log("_logDigsData");
      console.log(_logDigsData);
      let localOne = [];
      let localTwo = [];
      let localThree = [];
      let localFour = [];
      // 길이에 따라 할당안하면 usedLocalData[].local_index < 에서 에러남
      switch (usedLocalData.length) {
        case 0:
          break;
        case 1:
          localOne = _logDigsData[usedLocalData[0].local_index];
          break;
        case 2:
          localOne = _logDigsData[usedLocalData[0].local_index];
          localTwo = _logDigsData[usedLocalData[1].local_index];
          break;
        case 3:
          localOne = _logDigsData[usedLocalData[0].local_index];
          localTwo = _logDigsData[usedLocalData[1].local_index];
          localThree = _logDigsData[usedLocalData[2].local_index];
          break;
        case 4:
          localOne = _logDigsData[usedLocalData[0].local_index];
          localTwo = _logDigsData[usedLocalData[1].local_index];
          localThree = _logDigsData[usedLocalData[2].local_index];
          localFour = _logDigsData[usedLocalData[3].local_index];
          break;
      }
      // 없을 경우 undefined 에러 나기때문에 세팅 해줌.
      if (localOne) {
        setDataSlotOne(localOne);
      } else {
        setDataSlotOne([]);
      }
      if (localTwo) {
        setDataSlotTwo(localTwo);
      } else {
        setDataSlotTwo([]);
      }
      if (localThree) {
        setDataSlotThree(localThree);
      } else {
        setDataSlotThree([]);
      }
      if (localFour) {
        setDataSlotFour(localFour);
      } else {
        setDataSlotFour([]);
      }
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log(localOne);
      console.log(localTwo);
      console.log(localThree);
      console.log(localFour);
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^dataslot^^^^^^^^^^^");
      console.log(dataSlotOne);
      console.log(dataSlotTwo);
      console.log(dataSlotThree);
      console.log(dataSlotFour);
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    }
  }, [usedLocalData, data]);

  // 누적 굴진율 퍼센트 구하기
  const getDigAmountPercent = (plan_length, dig_length) => {
    return ((dig_length / plan_length) * 100).toFixed(1) + "%";
  };

  // 0 추가
  const addZero = (str, digit) => {
    if (str.length >= digit) {
      return str;
    } else {
      let _str = str.toString();
      let zeros = "";
      for (let i = 0; i < digit - _str.length; i++) {
        zeros = zeros + "0";
      }
      return zeros + _str;
    }
  };

  // 미터 콤마 더하기 빼기

  const addComma = (num) => {
    let _num = num.toString();
    _num = _num.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
    _num = _num.replace(/,/g, ""); // , 값 공백처리
    if (_num.length > 4) {
      _num = _num.substring(0, 4);
    }
    return _num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
  };

  // 페이지 네이션
  const [pageInfo, setPageInfo] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 12, // 페이지 당 item 수
  });

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 12,
    });
  };

  const onPageChange = (e, { activePage }) => {
    e.preventDefault();
    let _activePage = Math.ceil(activePage);
    const PreState = pageInfo;
    setPageInfo({
      ...PreState,
      activePage: _activePage,
    });
  };

  return (
    <ContentsCompo className="contents-compo">
      <ContentsBodyCompo className="contents-body-compo">
        <LogDigTable
          className="table-box one"
          pageInfo={pageInfo}
          data={dataSlotOne}
          onPageChange={onPageChange}
          initPage={initPage}
          localData={localData && usedLocalData[0]}
          addComma={addComma}
          addZero={addZero}
          getDigAmountPercent={getDigAmountPercent}
        />

        <LogDigTable
          className="table-box two"
          pageInfo={pageInfo}
          data={dataSlotTwo}
          onPageChange={onPageChange}
          initPage={initPage}
          localData={localData && usedLocalData[1]}
          addComma={addComma}
          addZero={addZero}
          getDigAmountPercent={getDigAmountPercent}
        />

        <LogDigTable
          className="table-box three"
          pageInfo={pageInfo}
          data={dataSlotThree}
          onPageChange={onPageChange}
          initPage={initPage}
          localData={localData && usedLocalData[2]}
          addComma={addComma}
          addZero={addZero}
          getDigAmountPercent={getDigAmountPercent}
        />

        <LogDigTable
          className="table-box four"
          pageInfo={pageInfo}
          data={dataSlotFour}
          onPageChange={onPageChange}
          initPage={initPage}
          localData={localData && usedLocalData[3]}
          addComma={addComma}
          addZero={addZero}
          getDigAmountPercent={getDigAmountPercent}
        />
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default LogDigContainer;
