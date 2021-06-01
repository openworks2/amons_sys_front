import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import KickOutVehicleTable from "../../components/ect/KickOutVehicleTable";
import { useDispatch, useSelector } from "react-redux";
import { getLocals } from "../../modules/locals";
import { getCompanies } from "../../modules/companies";
import {
  getRemainVehicles,
  postRemainVehiclesSearch,
} from "../../modules/bles";
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

const KickOutVehicleContainer = () => {
  // 목차
  // [ Redux Area ]
  // [ State Area ]
  // [ Init Area ]
  // [ Common Logic Area ]
  // [ Change Area ]
  // [ Kickout Area ]
  // [ Components Area ]

  // [ Redux Area ] =====================================================

  const { data, loading, error } = useSelector(
    (state) => state.bles.bleVehicles
  );
  const localData = useSelector((state) => state.locals.locals.data);
  const companyData = useSelector((state) => state.companies.companies.data);

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
    dispatch(getRemainVehicles());
    dispatch(getLocals());
    dispatch(getCompanies());
  }, []);

  // [ State Area ] ======================================================

  const [categorieValue, setCategorieValue] = useState(null); // 노선 카테고리 선택
  const [searchValue, setSearchValue] = useState(""); // 검색 입력
  const [currentData, setCurrentData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(""); //소속사 dropdown
  const [companyList, setCompanyList] = useState([]);

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

  //  [ Common Logic Area ] =====================================================

  useEffect(() => {
    makeCompanyList(companyData);
  }, [companyData]);

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

  const onSelectChange = (e, seletedValue) => {
    setSelectedCompany(seletedValue.value);
  };

  const onSearchChange = (e) => {
    const _searchValue = e.target.value;
    setSearchValue(_searchValue);
  };

  const onClickCategorie = (e, value) => {
    initPage();
    const _value = value.value;
    setCategorieValue(_value);
  };

  // 데이터 조회 (post )
  const onSearch = (startDate, endDate) => {
    document.getElementById("scroll0").scrollIntoView();
    let _local_index = categorieValue;

    const searchCondition = {
      local_index: _local_index,
      from_date: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      to_date: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
      vh_name: searchValue === "" ? null : searchValue,
      vh_co_index: selectedCompany === "" ? null : selectedCompany,
    };
    dispatch(postRemainVehiclesSearch(searchCondition));
    initPage();
  };

  useEffect(() => {
    // 카테고리 바뀔 때 마다 데이터 전환.
    let _data = data;
    if (data) {
      _data = _data.filter((el) => el.bc_used_type === 2);
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

  // [ Kickout Area ] =====================================================

  const kickoutHandler = async (bc_index) => {
    const response = await axios.get(`${API}/api/ble/bles/out/${bc_index}`);

    let _data = currentData;
    _data = _data.filter((el) => el.bc_index !== bc_index);
    setCurrentData(_data);
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
          {currentData && localData && (
            <KickOutVehicleTable
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
export default KickOutVehicleContainer;
