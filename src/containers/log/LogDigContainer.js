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
      _usedLocalData = _usedLocalData.slice(0, 4);
      setUsedLocalData(_usedLocalData);
    }
  }, [localData]);

  useEffect(() => {
    if (usedLocalData !== undefined && data) {
      let _logDigsData = data;
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
  const [pageInfo1, setPageInfo1] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 12, // 페이지 당 item 수
  });
  const [pageInfo2, setPageInfo2] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 12, // 페이지 당 item 수
  });
  const [pageInfo3, setPageInfo3] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 12, // 페이지 당 item 수
  });
  const [pageInfo4, setPageInfo4] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 12, // 페이지 당 item 수
  });

  const initPage1 = () => {
    setPageInfo1({
      activePage: 1,
      itemsPerPage: 12,
    });
  };
  const initPage2 = () => {
    setPageInfo2({
      activePage: 1,
      itemsPerPage: 12,
    });
  };
  const initPage3 = () => {
    setPageInfo3({
      activePage: 1,
      itemsPerPage: 12,
    });
  };
  const initPage4 = () => {
    setPageInfo4({
      activePage: 1,
      itemsPerPage: 12,
    });
  };

  const onPageChange1 = (e, { activePage }) => {
    e.preventDefault();
    let _activePage = Math.ceil(activePage);
    const PreState = pageInfo1;
    setPageInfo1({
      ...PreState,
      activePage: _activePage,
    });
  };
  const onPageChange2 = (e, { activePage }) => {
    e.preventDefault();
    let _activePage = Math.ceil(activePage);
    const PreState = pageInfo2;
    setPageInfo2({
      ...PreState,
      activePage: _activePage,
    });
  };
  const onPageChange3 = (e, { activePage }) => {
    e.preventDefault();
    let _activePage = Math.ceil(activePage);
    const PreState = pageInfo3;
    setPageInfo3({
      ...PreState,
      activePage: _activePage,
    });
  };
  const onPageChange4 = (e, { activePage }) => {
    e.preventDefault();
    let _activePage = Math.ceil(activePage);
    const PreState = pageInfo4;
    setPageInfo4({
      ...PreState,
      activePage: _activePage,
    });
  };

  const serial1 = "slot1";
  const serial2 = "slot2";
  const serial3 = "slot3";
  const serial4 = "slot4";

  return (
    <ContentsCompo className="contents-compo">
      <ContentsBodyCompo className="contents-body-compo">
        {data && localData && (
          <>
            <LogDigTable
              className="table-box one"
              pageInfo={pageInfo1}
              data={dataSlotOne}
              onPageChange={onPageChange1}
              initPage={initPage1}
              localData={localData && usedLocalData[0]}
              addComma={addComma}
              addZero={addZero}
              getDigAmountPercent={getDigAmountPercent}
              serial={serial1}
            />

            <LogDigTable
              className="table-box two"
              pageInfo={pageInfo2}
              data={dataSlotTwo}
              onPageChange={onPageChange2}
              initPage={initPage2}
              localData={localData && usedLocalData[1]}
              addComma={addComma}
              addZero={addZero}
              getDigAmountPercent={getDigAmountPercent}
              serial={serial2}
            />

            <LogDigTable
              className="table-box three"
              pageInfo={pageInfo3}
              data={dataSlotThree}
              onPageChange={onPageChange3}
              initPage={initPage3}
              localData={localData && usedLocalData[2]}
              addComma={addComma}
              addZero={addZero}
              getDigAmountPercent={getDigAmountPercent}
              serial={serial3}
            />

            <LogDigTable
              className="table-box four"
              pageInfo={pageInfo4}
              data={dataSlotFour}
              onPageChange={onPageChange4}
              initPage={initPage4}
              localData={localData && usedLocalData[3]}
              addComma={addComma}
              addZero={addZero}
              getDigAmountPercent={getDigAmountPercent}
              serial={serial4}
            />
          </>
        )}
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default LogDigContainer;
