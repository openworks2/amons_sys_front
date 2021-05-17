import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import KickOutWorkerTable from "../../components/ect/KickOutWorkerTable";
import { useDispatch, useSelector } from "react-redux";
import { getLocals } from "../../modules/locals";
import { getCompanies } from "../../modules/companies";
import { getRemainWorkers, postRemainWorkersSearch } from "../../modules/bles";
import { saveAs } from "file-saver";
import moment from "moment";
import "moment/locale/ko";
import { API } from "../../lib/server.config";

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

const KickOutWorkerContainer = () => {
  const { data, loading, error } = useSelector(
    (state) => state.bles.bleWorkers
  );

  const localData = useSelector((state) => state.locals.locals.data);
  const companyData = useSelector((state) => state.companies.companies.data);

  // 검색 기능 table 데이터 처리
  const [categorieValue, setCategorieValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // const searchCondition = {
    //   local_index: "",
    //   from_date: "",
    //   to_date: "",
    //   vh_name: "",
    //   vh_co_index: "",
    // };
    // dispatch(postBleVehiclesSearch(searchCondition));
    dispatch(getRemainWorkers());
  }, []);

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getCompanies());
  }, [dispatch]);

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

  const onSelectChange = (e, seletedValue) => {
    setSelectedCompany(seletedValue.value);
  };

  // serach input 입력
  const onSearchChange = (e) => {
    const _searchValue = e.target.value;
    setSearchValue(_searchValue);
  };

  const onClickCategorie = (e, value) => {
    initPage();
    const _value = value.value;
    setCategorieValue(_value);
  };

  const today = new Date();

  // 데이터 조회 (post )
  const onSearch = (startDate, endDate) => {
    let _local_index = categorieValue;

    const searchCondition = {
      local_index: _local_index,
      from_date: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      to_date: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
      wk_name: searchValue === "" ? null : searchValue,
      wk_co_index: selectedCompany === "" ? null : selectedCompany,
    };
    dispatch(postRemainWorkersSearch(searchCondition));
    initPage();
  };

  const kickoutHandler = async (bc_index) => {
    try {
      const response = await axios.get(`${API}/api/ble/bles/out/${bc_index}`);
    } catch (e) {
      console.log(e);
    }
    let _data = data;
    _data = _data.filter((el) => el.bc_index !== bc_index);
    setCurrentData(_data);
  };

  useEffect(() => {
    // 카테고리 바뀔 때 마다 데이터 전환.
    let _data = data;
    if (data) {
      _data = _data.filter((el) => el.bc_used_type === 1);
      setCurrentData(_data);
    }

    let tempData = [];

    if (categorieValue === null) {
      setCurrentData(_data);
    } else {
      tempData = _data.filter((item) => item.local_index === categorieValue);
      setCurrentData(tempData);
    }
  }, [data, categorieValue]);

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
          {currentData && localData && (
            <KickOutWorkerTable
              className="kick-table-box"
              pageInfo={pageInfo}
              currentData={currentData}
              localData={localData}
              companyList={companyList}
              categorieValue={categorieValue}
              searchValue={searchValue}
              onPageChange={onPageChange}
              onSelectChange={onSelectChange}
              onSearchChange={onSearchChange}
              onClickCategorie={onClickCategorie}
              onSearch={onSearch}
              kickoutHandler={kickoutHandler}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};
export default KickOutWorkerContainer;