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

  // radioChange event handler
  const onRadioChange = (e, target) => {
    console.log(target.value);

    let _pcs_state = target.value;
    if (_pcs_state === formData.pcs_state) {
      _pcs_state = null;
    }
    setFormData({
      ...formData,
      pcs_state: _pcs_state,
    });
  };

  const stateToString = (value) => {
    let _value = parseInt(value);
    let str = "";

    switch (_value) {
      case 0:
        str = "미착공";
        break;
      case 1:
        str = "미착공";
        break;
      case 2:
        str = "천공";
        break;
      case 3:
        str = "장약";
        break;
      case 4:
        str = "발파";
        break;
      case 5:
        str = "버력처리";
        break;
      case 6:
        str = "숏크리트";
        break;
      case 7:
        str = "강지보";
        break;
      case 8:
        str = "격자지보";
        break;
      case 9:
        str = "록볼트";
        break;
      case 10:
        str = "방수시트";
        break;
      case 11:
        str = "라이닝";
        break;
      case 12:
        str = "근무교대";
        break;
      case 13:
        str = "장비점검";
        break;
      case 14:
        str = "기타";
        break;
      default:
        str = "error";
    }
    return str;
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
      const findItem = data.find(
        (processLog) => processLog.pcs_seq === selectedId
      );

      setSelectedRow({
        selectedId: findItem.pcs_seq,
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
    } else {
      let _localInfo = localData.find(
        (el) => el.local_index === formData.local_index
      );
      setLocalInfo(_localInfo);
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
            onRadioChange={onRadioChange}
            stateToString={stateToString}
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
              stateToString={stateToString}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default ProcessContainer;
