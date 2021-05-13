import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import LocalInput from "../../components/field/LocalInput";
import LocalTable from "../../components/field/LocalTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocals,
  postLocal,
  putLocal,
  deleteLocal,
} from "../../modules/locals";

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

const LocalContainer = () => {
  const { data, loading, error } = useSelector((state) => state.locals.locals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocals());
  }, [dispatch]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("data-->", data);
      const _filteredData = data.filter((el) => el.local_used !== 0);
      setFilteredData(_filteredData);
    }
  }, [dispatch, data]);

  const [formData, setFormData] = useState({
    local_id: null,
    local_index: null,
    created_date: null,
    modified_date: null,
    local_name: "",
    plan_length: "",
    process: null,
    local_description: "",
    local_used: 1,
  });

  // form onChange Event
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // 입력값 state 에 저장
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addComma = (num) => {
    let _num = num.toString();
    _num = _num.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
    _num = _num.replace(/,/g, ""); // , 값 공백처리
    if (_num.length > 4) {
      _num = _num.substring(0, 4);
    }
    return _num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
  };

  const minusComma = (num) => {
    let _num = num.toString();
    _num = _num.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
    _num = _num.replace(/,/g, ""); // , 값 공백처리
    if (_num.length > 4) {
      // 4자리 초과시 뒷자리 자르기
      _num = _num.substring(0, 4);
    }
    return _num;
  };

  const [selectedRow, setSelectedRow] = useState({
    selectedId: null,
    selectedItem: undefined,
    clickedIndex: null,
  });

  const initActiveRow = () => {
    setSelectedRow({
      selectedId: null,
      selectedItem: undefined,
      clickedIndex: null,
    });
  };
  const initFormData = () => {
    setFormData({
      ...formData,
      local_id: null,
      local_index: null,
      created_date: null,
      modified_date: null,
      local_name: "",
      plan_length: "",
      process: null,
      local_description: "",
      local_used: 1,
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((local) => local.local_id === selectedId);

      setSelectedRow({
        selectedId: findItem.local_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        local_id: findItem.local_id,
        local_index: findItem.local_index,
        created_date: findItem.created_date,
        modified_date: findItem.modified_date,
        local_name: findItem.local_name,
        plan_length: findItem.plan_length,
        local_description: findItem.local_description,
        local_used: findItem.local_used,
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

  const today = new Date();

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    let _plan_length = minusComma(formData.plan_length);
    let newLocal = {
      ...formData,
      plan_length: _plan_length,
    };
    dispatch(postLocal(newLocal));
    initActiveRow();
    initFormData();
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();

    const findItem = selectedRow.selectedItem;

    let _plan_length = minusComma(formData.plan_length);
    let newLocal = {
      ...formData,
      plan_length: _plan_length,
      process: findItem.process,
      created_date: findItem.created_date,
      modified_date: today,
    };

    dispatch(putLocal(newLocal.local_index, newLocal));
  };

  // DELETE
  const deleteHandler = (e, local_index, selectedItem) => {
    // local 테이블은 데이터 삭제를 하지 않고 보존하기 때문에 put으로 수정한다.
    let _selectedItem = { ...selectedItem, local_used: 0 };
    dispatch(putLocal(local_index, _selectedItem));
    initActiveRow();
    initFormData();
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
        <div className="input-box">
          <LocalInput
            className="local-input-box"
            onChange={onChange}
            formData={formData}
            addComma={addComma}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
          />
        </div>
        <div className="table-box">
          {filteredData && (
            <LocalTable
              className="local-table-box"
              pageInfo={pageInfo}
              filteredData={filteredData}
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default LocalContainer;
