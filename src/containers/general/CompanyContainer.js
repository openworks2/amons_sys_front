import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CompanyInput from "../../components/general/CompanyInput";
import CompanyTable from "../../components/general/CompanyTable";
import { Input, Loader } from "semantic-ui-react";
import { FaIdCardAlt } from "react-icons/fa";
import { Image } from "semantic-ui-react";
// 가짜 데이터
import companydata from "../../fakedata/companydata";
const ContentsCompo = styled.div`
  min-width: 1920px !important;
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
    min-height: 860px;
    margin-top: 10px;
    position: absolute;
    padding-top: 22px;
  }
  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 1236px;
    min-height: 860px;
    margin-top: 10px;
    margin-left: 388px;
    padding-top: 22px;
    position: absolute;
  }
`;

const initForm = {
  id: undefined,
  co_name: "",
  co_sectors: "",
  description: "",
};

const CompanyContatiner = () => {
  const date = new Date();
  const [formData, setFormData] = useState(initForm);
  const [selectRow, setRows] = useState({
    id: null,
    item: undefined,
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const activeHandler = (e, id) => {
    console.log(id);
    console.log(companyData);
    const findItem = companyData.find((item) => item.co_id === id);
    console.log(findItem);

    if (id === selectRow.id) {
      setRows({
        id: null,
        item: undefined,
      });
      setFormData(initForm);
    } else {
      setRows({
        id: findItem.co_id,
        item: findItem,
      });

      setFormData({
        formData,
        id: findItem.co_id,
        co_name: findItem.co_name,
        co_sectors: findItem.co_sectors,
        description: findItem.description,
      });
    }
  };

  // =====================테이블=========================
  // 페이지 네이션
  const [companyData, setCompanyData] = useState(companydata);
  const [activePage, setActivePage] = useState(1);

  // 삭제;
  function deleteItem(element) {
    if (element.co_id !== selectRow.co_id) {
      return true;
    }
  }

  const deleteHandler = () => {
    let _companyData = companyData.filter(deleteItem);
    setCompanyData(_companyData);
  };

  return (
    <ContentsCompo>
      <ContentTitleBoxCompo>
        <span className="content-icon-compo">
          <FaIdCardAlt />
        </span>
        <span className="content-title-compo">소속사 관리</span>
        <div className="content-title-divide-line" />
      </ContentTitleBoxCompo>
      <ContentsBodyCompo className="contents-body-compo">
        <span className="input-box">
          <CompanyInput onChange={onChange} formData={formData} />
        </span>
        <span className="table-box">
          <CompanyTable
            deleteHandler={deleteHandler}
            activeHandler={activeHandler}
            companyData={companyData}
            activePage={activePage}
            selectRow={selectRow}
          />
        </span>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default CompanyContatiner;
