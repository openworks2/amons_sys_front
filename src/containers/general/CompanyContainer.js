import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CompanyInput from "../../components/general/CompanyInput";
import CompanyTable from "../../components/general/CompanyTable";
import { Input, Loader, Dimmer, Image, Segment } from "semantic-ui-react";
import { FaIdCardAlt } from "react-icons/fa";
import { act } from "react-dom/test-utils";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies, postCompany, putCompany, deleteCompany } from "../../modules/companies";

const ContentsCompo = styled.div`
  min-width: 1680px !important;
  min-height: 856px;
  height: 100%;
  padding-left: 280px !important;
  padding-top: 85px !important;
  padding-right: 130px;
  position: block;
`;

const ContentTitleBoxCompo = styled.div`
  font-family: "NotoSansKR-Medium";
  padding: 0;
  text-align: left;
  color: #2e2e2e;
  position: relative;

  .content-title-compo {
    font-family: "NotoSansKR-Medium";
    margin-left: 15px;
    font-size: 24px;
    vertical-align: middle;
  }

  .content-icon-compo {
    font-family: "NotoSansKR-Medium";
    width: 30px;
    height: 30px;
    font-size: 25px;
    padding: 5px;
    display: inline-block;
    vertical-align: middle;
  }

  .img-icons {
    display: inline-block;
    vertical-align: middle;
  }
  .content-title-divide-line {
    background: #000000;
    margin-top: 12px;
    height: 1px;
    width: 1623px;
    margin-bottom: 20px;
  }
`;

const ContentsBodyCompo = styled.div`
  min-width: 1630px !important;
  min-height: 780px !important;
  width: 100%;
  overflow: auto;
  margin: 0px;
  padding: 0px;
  .input-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 368px;
    height: 82.5vh;
    min-height: 683px;
    /* position: absolute; */
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
    /* position: absolute; */
    vertical-align: top;
    display: inline-block;
  }
`;

const OnLoading = styled.div`
  width: 100%;
`;

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
    id: undefined,
    co_name: "",
    co_sectors: "",
    description: "",
  });
  // 클릭된 row의 데이터
  const [selectRow, setSelectRow] = useState({
    id: null,
    item: undefined,
    clickedIndex: null,
  });
  // form onChange Event
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);

    // 입력값 state 에 저장
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // onSubmit
  const createHandler = (e) => {
    e.preventDefault();
    console.log("서브밋 호출!");
    // console.log("formData");
    // console.log(formData);
    let randomNum = Math.ceil(Math.random()*1000);
    let newCompany = { ...formData,
      co_index : "COP"+randomNum,
      created_date: date };
      
      dispatch(postCompany(newCompany))
      alert("등록되었습니다.");
      initActiveRow();
      initFormData();
    };
    const updateHandler = (e,id) => {
      e.preventDefault();
      console.log("수정 서브밋 호출!");
      let modifyItem = { ...formData, modified_date: date };
      dispatch(putCompany(id, modifyItem));
    alert("수정되었습니다.");
    initActiveRow();
    initFormData();
  };

  const initActiveRow = () => {
    setSelectRow({
      id: null,
      item: undefined,
      clickedIndex: null,
    });
  };
  const initFormData = () => {
    setFormData({
      id: undefined,
      co_name: "",
      co_sectors: "",
      description: "",
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    console.log("index");
    console.log(index);
    console.log("selectRow");
    console.log(selectRow);

    if (index === selectRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((company) => company.co_id === selectedId);
      console.log("findItem");
      console.log(findItem);

      setSelectRow({
        id: findItem.co_id,
        item: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        id: findItem.co_id,
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

  const deleteHandler = (e, co_id) => {
    e.preventDefault();
    dispatch(deleteCompany(co_id));
    initActiveRow();
    initFormData();
  };

  // const [fullHeight, setTest] = useState(false);
  // const resizeHandler = useCallback(() => {
  //   setTest(!fullHeight);
  //   setTable({
  //     ...table,
  //     itemsPerPage: fullHeight ? 14 : 10,
  //   });
  // }, [fullHeight]);

  // useEffect(() => {
  //   window.addEventListener("resize", resizeHandler);
  //   return () => {
  //     window.removeEventListener("resize", resizeHandler);
  //   };
  // }, [resizeHandler]);

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
      <ContentTitleBoxCompo className="content-title-box-compo">
        <div className="content-icon-compo">
          <FaIdCardAlt />
        </div>
        <span className="content-title-compo">소속사 관리</span>
        <div className="content-title-divide-line" />
      </ContentTitleBoxCompo>
      <ContentsBodyCompo className="contents-body-compo">
        <div className="input-box">
          <CompanyInput
            className="company-input-box"
            onChange={onChange}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectRow={selectRow}
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
              selectRow={selectRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
              // fullHeight={fullHeight}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default CompanyContatiner;
