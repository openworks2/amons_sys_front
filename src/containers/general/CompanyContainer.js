import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CompanyInput from "../../components/general/CompanyInput";
import CompanyTable from "../../components/general/CompanyTable";
import { Input, Loader } from "semantic-ui-react";
import { FaIdCardAlt } from "react-icons/fa";
import { Image } from "semantic-ui-react";
// 가짜 데이터
import companydata from "../../fakedata/companydata";
import { act } from "react-dom/test-utils";
const ContentsCompo = styled.div`
  min-width: 1680px !important;
  padding-left: 280px !important;
  padding-top: 96px !important;
  padding-right: 130px;
`;

const ContentTitleBoxCompo = styled.div`
  font-family: "NotoSansKR-Medium";
  padding: 0;
  margin-bottom: 32px;
  text-align: left;
  color: #2e2e2e;

  .content-title-compo {
    font-family: "NotoSansKR-Medium";
    margin-left: 35px;
    font-size: 24px;
    vertical-align: middle;
  }

  .content-icon-compo {
    font-family: "NotoSansKR-Medium";
    width: 30px;
    height: 30px;
    font-size: 25px;
    position: absolute;
  }

  .content-title-divide-line {
    background: #000000;
    margin-top: 12px;
    height: 1px;
    top: 125px;
    width: 1623px;
    position: absolute;
  }
  .img-icons {
    display: inline-block;
  }
`;

const ContentsBodyCompo = styled.div`
  .input-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 368px;
    height: 883px;
    min-height: 683px;
    margin-top: 10px;
    position: absolute;
    padding-top: 22px;
  }
  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 1236px;
    height: 883px;
    min-height: 683px;
    margin-top: 10px;
    margin-left: 388px;
    padding-top: 22px;
    position: absolute;
  }
`;

const CompanyContatiner = () => {
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
      const findItem = companyData.find(
        (company) => company.co_id === selectedId
      );
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
  const [companyData, setCompanyData] = useState(companydata);

  const [table, setTable] = useState({
    items: companyData, // 전체 리스트
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  const onPageChange = (e, { activePage }) => {
    let _activePage = Math.ceil(activePage);
    const Prestate = table;
    setTable({
      ...Prestate,
      activePage: _activePage,
    });
    // 활성화된 로우 초기화
    initActiveRow();
    initFormData();
  };

  const deleteHandler = () => {
    let _companyData = companyData.filter((item) => {
      if (item.co_id !== selectRow.item.co_id) {
        return item;
      }
    });
    setCompanyData(_companyData);
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

  return (
    <ContentsCompo>
      <ContentTitleBoxCompo>
        <div className="content-icon-compo">
          <FaIdCardAlt />
        </div>
        <span className="content-title-compo">소속사 관리</span>
        <div className="content-title-divide-line" />
      </ContentTitleBoxCompo>
      <ContentsBodyCompo className="contents-body-compo">
        <div className="input-box">
          <CompanyInput onChange={onChange} formData={formData} />
        </div>
        <div className="table-box">
          <CompanyTable
            table={table}
            activeHandler={activeHandler}
            deleteHandler={deleteHandler}
            onPageChange={onPageChange}
            selectRow={selectRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
            // fullHeight={fullHeight}
          />
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default CompanyContatiner;
