import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CompanyInput from "../../components/general/CompanyInput";
import CompanyTable from "../../components/general/CompanyTable";
import { Loader, Image } from "semantic-ui-react";
import { FaIdCardAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies, postCompany, putCompany, deleteCompany } from "../../modules/companies";
import ContentTitle from "../../components/ContentTitle";

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
  position : relative;
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

const OnLoading = styled.div`
  width: 100%;
`;
// ***********************************Logic Area*****************************************

const CompanyContatiner = () => {
  const { data, loading, error } = useSelector(
    (state) => state.companies.companies
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  console.log("=====================================");
  console.log("data");
  console.log(data);
  console.log("loading");
  console.log(loading);
  console.log("error");
  console.log(error);
  console.log("=====================================");

  const date = new Date();

  const [formData, setFormData] = useState({
    co_id : undefined,
    co_index: undefined,
    co_name: "",
    co_sectors: "",
    description: "",
  });
  // 클릭된 row의 데이터
  const [selectedRow, setSelectedRow] = useState({
    selectedId: null,
    selectedItem: undefined,
    clickedIndex: null,
  });
  // form onChange Event
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("formData");
    console.log(formData);
    // 입력값 state 에 저장
    setFormData({
      ...formData,
      [name]: value,
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
      co_id : undefined,
      co_index: undefined,
      co_name: "",
      co_sectors: "",
      description: "",
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    console.log("*************클릭*************");
    // console.log("index");
    // console.log(index);
    // console.log("selectedRow");
    // console.log(selectedRow);
    // console.log("*************클릭*************");

    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((company) => company.co_id === selectedId);
      console.log("findItem");
      console.log(findItem);

      setSelectedRow({
        selectedId: findItem.co_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        co_id: findItem.co_id,
        co_index : findItem.co_index,
        co_name: findItem.co_name,
        co_sectors: findItem.co_sectors,
        description: findItem.description,
      });
    }
  };

  // 페이지 네이션
  const [pageInfo, setPageInfo] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  const onPageChange = (e, { activePage }) => {
    e.preventDefault();
    let _activePage = Math.ceil(activePage);
    const PreState = pageInfo;
    setPageInfo({
      ...PreState,
      activePage: _activePage,
    });
    // 활성화된 로우 초기화
    initActiveRow();
    initFormData();
  };

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();
    let newCompany = { ...formData,}
      dispatch(postCompany(newCompany))
      initActiveRow();
      initFormData();
    };

  // UPDATE
    const updateHandler = (e, selectedId) => {
      let modifyItem = { ...formData};
      console.log("modifyItem")
      console.log(modifyItem)
      dispatch(putCompany(selectedId, modifyItem));
    initActiveRow();
    initFormData();
  };

  const deleteHandler = (e, co_id) => {
    dispatch(deleteCompany(co_id));
    initActiveRow();
    initFormData();
  };

  if (loading) {
    return (
      <OnLoading className="onLoading">
        <Loader
          active
          size="large"
          content="소속사 정보를 가져오는 중입니다."
        />
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </OnLoading>
    );
  }
  if (error) {
    return <div>통신 에러가 발생했습니다. 새로고침 버튼을 눌러보세요.</div>;
  }
  if (!data) {
    return null;
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
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
              // fullHeight={fullHeight}
              // 제발
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default CompanyContatiner;
