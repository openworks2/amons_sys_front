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

  const [countLocals, setCountLocals] = useState(0);
  const [usedLocalData, setUsedLocalData] = useState([]);

  useEffect(() => {
    if (localData) {
      // localData 받아와서 4개 자르기
      let _usedLocalData = localData
        .filter((el) => el.local_used === 1)
        .slice(0, 4);
      setUsedLocalData(_usedLocalData);
    }
  }, [localData]);

  useEffect(() => {}, [usedLocalData]);

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
        {data && (
          <LogDigTable
            className="table-box one"
            pageInfo={pageInfo}
            data={data}
            onPageChange={onPageChange}
            initPage={initPage}
            localData={localData}
            addComma={addComma}
            addZero={addZero}
            getDigAmountPercent={getDigAmountPercent}
          />
        )}
        {data && (
          <LogDigTable
            className="table-box two"
            pageInfo={pageInfo}
            data={data}
            onPageChange={onPageChange}
            initPage={initPage}
            localData={localData}
            addComma={addComma}
            addZero={addZero}
            getDigAmountPercent={getDigAmountPercent}
          />
        )}
        {data && (
          <LogDigTable
            className="table-box three"
            pageInfo={pageInfo}
            data={data}
            onPageChange={onPageChange}
            initPage={initPage}
            localData={localData}
            addComma={addComma}
            addZero={addZero}
            getDigAmountPercent={getDigAmountPercent}
          />
        )}
        {data && (
          <LogDigTable
            className="table-box four"
            pageInfo={pageInfo}
            data={data}
            onPageChange={onPageChange}
            initPage={initPage}
            localData={localData}
            addComma={addComma}
            addZero={addZero}
            getDigAmountPercent={getDigAmountPercent}
          />
        )}
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default LogDigContainer;
