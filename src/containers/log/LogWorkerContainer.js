import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import LogWorkerTable from "../../components/log/LogWorkerTable";
import { useDispatch, useSelector } from "react-redux";
import { getLocals } from "../../modules/locals";
import { getCompanies } from "../../modules/companies";
import { getAlarms, postAlarmSearch, putAlarm } from "../../modules/alarms";
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

const LogWorkerContainer = () => {
  const { data, loading, error } = useSelector((state) => state.alarms.alarms);

  const localData = useSelector((state) => state.locals.locals.data);
  const companyData = useSelector((state) => state.companies.companies.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlarms());
  }, []);

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getCompanies());
  }, [dispatch]);

  console.log(data);

  useEffect(() => {
    makeLocalList(localData);
  }, [localData]);

  useEffect(() => {
    makeCompanyList(companyData);
  }, [companyData]);

  const [localList, setLocalList] = useState([]);

  const makeLocalList = (data) => {
    if (data) {
      let _localList = [];
      const _data = data.filter((el) => el.local_used !== 0);

      _data.map((item, index) => {
        _localList.push({
          key: index,
          text: item.local_name,
          value: item.local_index,
          name: item.local_name,
        });
      });
      setLocalList(_localList);
    }
  };

  const [companyList, setCompanyList] = useState([]);
  const makeCompanyList = (data) => {
    if (data) {
      let _companyList = [];

      _companyList.push({
        key: "all",
        text: "소속사 전체",
        value: null,
      });

      data.map((item, index) => {
        _companyList.push({
          key: index,
          text: item.co_name,
          value: item.co_index,
        });
      });
      setCompanyList(_companyList);
    }
  };

  // 페이지 네이션
  const [pageInfo, setPageInfo] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });
  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
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

  const today = new Date();

  // 데이터 조회 (post )
  const onSearch = (local_index, startDate, endDate) => {
    let _local_index = local_index;
    let _startDate = startDate;
    let _endDate = endDate;

    if (!_startDate) {
      _startDate = today;
    }
    if (!_endDate) {
      _endDate = today;
    }

    const searchCondition = {
      local_index: _local_index,
      from_date: moment(_startDate).format("YYYY.MM.DD HH:mm:ss"),
      to_date: moment(_endDate).format("YYYY.MM.DD HH:mm:ss"),
    };

    dispatch(postAlarmSearch(searchCondition));
    initPage();
  };

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
          <LogWorkerTable
            className="alarm-table-box"
            pageInfo={pageInfo}
            data={data}
            onPageChange={onPageChange}
            initPage={initPage}
            localData={localData}
            localList={localList}
            companyList={companyList}
            onSearch={onSearch}
          />
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default LogWorkerContainer;
