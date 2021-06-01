import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import LoginLogTable from "../../components/ect/LoginLogTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginRecords,
  postLoginRecordsSearch,
} from "../../modules/accounts";
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
    width: 1620px;
    height: 82.5vh;
    min-height: 683px;
    padding-top: 10px;
    display: inline-block;
    vertical-align: top;
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

const LoginLogContainer = () => {
  // 목차
  // [ Redux Area ]
  // [ State Area ]
  // [ Init Area ]
  // [ Change Area ]
  // [ Components Area ]

  // [ Redux Area ] =====================================================
  const { data, loading, error } = useSelector(
    (state) => state.accounts.loginRecords
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const searchCondition = {
      from_date: 0,
      to_date: 0,
      ip: null,
    };
    // 최초 get 안해옴.
    dispatch(postLoginRecordsSearch(searchCondition));
  }, []);

  useEffect(() => {
    let _data = data;
    setCurrentData(_data);
  }, [data]);

  // [ State Area ] ======================================================

  const [searchValue, setSearchValue] = useState("");
  const [currentData, setCurrentData] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  // [ Init Area ] ======================================================

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
    });
  };

  // [ Change Area ] =====================================================

  const onPageChange = (e, { activePage }) => {
    e.preventDefault();
    let _activePage = Math.ceil(activePage);
    const PreState = pageInfo;
    setPageInfo({
      ...PreState,
      activePage: _activePage,
    });
  };

  const onSearchChange = (e) => {
    const _searchValue = e.target.value;
    setSearchValue(_searchValue);
  };

  // 데이터 조회 (post )
  const onSearch = (startDate, endDate) => {
    document.getElementById("scroll0").scrollIntoView();
    const searchCondition = {
      from_date: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      to_date: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
      ip: searchValue,
    };
    dispatch(postLoginRecordsSearch(searchCondition));
    initPage();
  };

  // [ Components Area ] =====================================================

  if (error) {
    return (
      <ErrMsg className="err-msg">
        통신 에러가 발생했습니다. 새로고침 버튼을 눌러보세요.
      </ErrMsg>
    );
  }

  return (
    <ContentsCompo className="contents-compo">
      <ContentsBodyCompo className="contents-body-compo">
        <div className="table-box">
          {currentData && (
            <LoginLogTable
              className="loginlog-table-box"
              pageInfo={pageInfo}
              currentData={currentData}
              searchValue={searchValue}
              onPageChange={onPageChange}
              onSearchChange={onSearchChange}
              onSearch={onSearch}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default LoginLogContainer;
