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
  }, [dispatch, postLocal, putLocal]);

  const [formData, setFormData] = useState({
    local_id: null,
    local_index: null,
    created_date: null,
    modified_date: null,
    local_name: "",
    plan_length: "",
    process: null,
    description: "",
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
      description: "",
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

  const today = new Date();

  const [localError, setLocalError] = useState(undefined);
  const [lengthError, setlengthError] = useState(undefined);

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    if (!formData.local_name) {
      setLocalError({
        content: "노선이름을 입력해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setLocalError(undefined);
      }, 1500);
    } else {
      let _plan_length = minusComma(formData.plan_length);
      let newLocal = {
        ...formData,
        plan_length: _plan_length,
      };
      dispatch(postLocal(newLocal));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();

    const findItem = selectedRow.selectedItem;
    if (!formData.local_name) {
      setLocalError({
        content: "노선이름을 입력해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setLocalError(undefined);
      }, 1500);
    } else {
      let _plan_length = minusComma(formData.plan_length);
      let newLocal = {
        ...formData,
        plan_length: _plan_length,
        process: findItem.process,
        created_date: findItem.created_date,
        modified_date: today,
      };
      dispatch(putLocal(newLocal.local_index, newLocal));
    }
    initActiveRow();
    initFormData();
  };

  // DELETE
  const deleteHandler = (e, local_id) => {
    dispatch(deleteLocal(local_id));
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
            localError={localError}
            kindError={lengthError}
          />
        </div>
        <div className="table-box">
          {data && (
            <LocalTable
              className="local-table-box"
              pageInfo={pageInfo}
              data={data}
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
