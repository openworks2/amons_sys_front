import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ProcessInput from "../../components/field/ProcessInput";
import ProcessTable from "../../components/field/ProcessTable";
import { useDispatch, useSelector } from "react-redux";
import { getLocals } from "../../modules/locals";
import {
  getProcesses,
  postProcess,
  putProcess,
  deleteProcess,
} from "../../modules/processes";
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

const ProcessContainer = () => {
  const { data, loading, error } = useSelector(
    (state) => state.processes.processes
  );
  const localData = useSelector((state) => state.locals.locals.data);

  const dispatch = useDispatch();
  const today = new Date();

  const [localInfo, setLocalInfo] = useState({});
  const [currentLatestDigInfo, setCurrentLatestDigInfo] = useState({}); // 현재 조회 중인 로컬인덱스의 가장 최신 로그

  const [formData, setFormData] = useState({
    pcs_seq: null,
    created_date: null,
    modified_date: null,
    prev_pcs_state: null,
    pcs_state: null,
    local_index: null,
    description: "",
  });
  const [localList, setLocalList] = useState([]);

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getProcesses());
  }, [dispatch]);

  useEffect(() => {
    makeLocalList(localData);
  }, [localData, formData.local_index]);

  const makeLocalList = (data) => {
    if (data) {
      let _localList = [];

      data.map((item, index) => {
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

  // form onSelectChant Event
  const onSelectChange = (e, seletedValue) => {
    const name = seletedValue.name;
    const value = seletedValue.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // 시간순 정렬
  // useEffect(() => {
  //   if (!selectedRow.selectedId && data && formData.local_index) {
  //     let _digData = data;
  //     _digData = _digData.filter(
  //       (el) => el.local_index === formData.local_index
  //     );
  //     _digData = _digData.sort((a, b) =>
  //       b.record_date.localeCompare(a.record_date)
  //     )[0];
  //     setCurrentLatestDigInfo(_digData);
  //   }
  // }, [onSelectChange]);

  useEffect(() => {
    console.log("$$$$$$$change!");
    console.log(formData);
    console.log("$$$$$$$change!");
  }, [formData]);

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

  // 클릭된 row의 데이터
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
      pcs_seq: null,
      created_date: null,
      modified_date: null,
      prev_pcs_state: null,
      pcs_state: null,
      local_index: null,
      description: "",
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((digLog) => digLog.dig_seq === selectedId);

      setSelectedRow({
        selectedId: findItem.dig_seq,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        pcs_seq: findItem.pcs_seq,
        created_date: findItem.created_date,
        modified_date: findItem.modified_date,
        prev_pcs_state: findItem.prev_pcs_state,
        pcs_state: findItem.pcs_state,
        local_index: findItem.local_index,
        description: findItem.description,
      });
    }
  };

  useEffect(() => {
    // 클릭 된 열 있을 시 노선 정보 대입하기
    if (formData.local_index === null || undefined) {
      setLocalInfo(null);
      setCurrentLatestDigInfo(null);
    } else {
      let _localInfo = localData.find(
        (el) => el.local_index === formData.local_index
      );

      setLocalInfo(_localInfo);

      let _currentLatestDigInfo = {};
      _currentLatestDigInfo = data.find(
        (el) => el.local_index === formData.local_index
      );
      setCurrentLatestDigInfo(_currentLatestDigInfo);
    }
  }, [activeHandler]);

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

  const [localError, setLocalError] = useState(undefined);
  const [dateError, setDateError] = useState(undefined);

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else {
      let newProcess = {
        ...formData,
      };
      dispatch(postProcess(newProcess));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;

      let newProcess = {
        ...formData,
        modified_date: today,
      };
      dispatch(putProcess(newProcess.pcs_seq, newProcess));
    }
  };

  // DELETE
  const deleteHandler = (e, pcs_seq) => {
    dispatch(deleteProcess(pcs_seq));
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
          <ProcessInput
            className="process-input-box"
            onChange={onChange}
            onSelectChange={onSelectChange}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
            localData={localData}
            localList={localList}
            localError={localError}
            localInfo={localInfo}
          />
        </div>
        <div className="table-box">
          {data && (
            <ProcessTable
              className="process-table-box"
              pageInfo={pageInfo}
              data={data}
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
              localData={localData}
              localList={localList}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default ProcessContainer;
