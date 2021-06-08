import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CompanyInput from "../../components/general/CompanyInput";
import CompanyTable from "../../components/general/CompanyTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  postCompany,
  putCompany,
  deleteCompany,
} from "../../modules/companies";
import { getWorkers } from "../../modules/workers";
import { getVehicle, getVehicles } from "../../modules/vehicles";

const ContentsCompo = styled.div`
  min-width: 1680px !important;
  min-height: 756px;
  height: 84%;
  padding-left: 280px !important;
  padding-right: 130px;
  position: relative;
`;
//
const ContentsBodyCompo = styled.div`
  min-width: 1630px !important;
  min-height: 720px !important;
  width: 100%;
  overflow: auto;
  margin: 0px;
  padding: 0px;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    margin: 0px;
    display: none;
  }
  .input-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 368px;
    height: 82.5vh;
    min-height: 683px;
    padding-top: 22px;
    display: inline-block;
    vertical-align: top;
  }
  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 1236px;
    height: 82.5vh;
    min-height: 683px;
    margin-left: 20px;
    padding-top: 22px;
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

const CompanyContatiner = () => {
  // 목차
  // [ Redux Area ]
  // [ State Area ]
  // [ Init Area ]
  // [ Common Logic Area ]
  // [ Change Area ]
  // [ Click Area ]
  // [ Search Categorie Area ]
  // [ Create Area ]
  // [ Update Area ]
  // [ Delete Area ]
  // [ Components Area ]

  // [ Redux Area ] ===============================================================
  const { data, loading, error } = useSelector(
    (state) => state.companies.companies
  );

  const workerData = useSelector((state) => state.workers.workers.data);
  const vehicleData = useSelector((state) => state.vehicles.vehicles.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getVehicles());
    dispatch(getWorkers());
  }, []);

  // [ State Area ] ===============================================================

  const [pageInfo, setPageInfo] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  const [selectedRow, setSelectedRow] = useState({
    selectedId: null,
    selectedItem: undefined,
    clickedIndex: null,
  });

  const [formData, setFormData] = useState({
    co_id: undefined,
    co_index: undefined,
    co_name: "",
    co_sectors: "",
    description: "",
  });

  // [ Init Area ] ======================================================================

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
    });
  };

  const initActiveRow = () => {
    setSelectedRow({
      selectedId: null,
      selectedItem: undefined,
      clickedIndex: null,
    });
  };
  const initFormData = () => {
    setFormData({
      co_id: undefined,
      co_index: undefined,
      co_name: "",
      co_sectors: "",
      description: "",
    });
  };

  // [ Change Area ] ======================================================================

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
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
    initActiveRow();
    initFormData();
  };

  // [ Click Area] ======================================================================

  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((company) => company.co_id === selectedId);

      setSelectedRow({
        selectedId: findItem.co_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        co_id: findItem.co_id,
        co_index: findItem.co_index,
        co_name: findItem.co_name,
        co_sectors: findItem.co_sectors,
        description: findItem.description,
      });
    }
  };

  // [ Create Area ] ======================================================================

  const createHandler = (e) => {
    e.preventDefault();
    let newCompany = { ...formData };
    dispatch(postCompany(newCompany));
    initActiveRow();
    initFormData();
  };

  // [ Update Area ] ======================================================================

  const updateHandler = (e) => {
    let modifyItem = { ...formData };
    dispatch(putCompany(modifyItem.co_index, modifyItem));
  };

  // [ Delete Area ] ======================================================================

  const deleteHandler = (e, co_id) => {
    dispatch(deleteCompany(co_id));
    initActiveRow();
    initFormData();
  };

  // [ Components Area ]===================================================================

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
        <div className="input-box">
          <CompanyInput
            className="company-input-box"
            onChange={onChange}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
          />
        </div>
        <div className="table-box">
          {data && (
            <CompanyTable
              className="company-table-box"
              pageInfo={pageInfo}
              data={data}
              workerData={workerData}
              vehicleData={vehicleData}
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
              initPage={initPage}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default CompanyContatiner;
