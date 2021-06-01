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
    (state) => state.processes.processes
  );
  const localData = useSelector((state) => state.locals.locals.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getProcesses());
  }, []);

  // [ State Area ] ===============================================================

  const today = new Date();

  // 검색 기능 table 데이터 처리
  const [categorieValue, setCategorieValue] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  const [localInfo, setLocalInfo] = useState({});
  const [localList, setLocalList] = useState([]);

  const [localError, setLocalError] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);

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
    pcs_seq: null,
    created_date: null,
    modified_date: null,
    prev_pcs_state: null,
    pcs_state: null,
    local_index: null,
    pcs_description: "",
  });

  // [ Init Area ] ======================================================================

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
      pcs_description: "",
    });
  };

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
    });
  };

  // [ Common Logic Area ] ======================================================================

  useEffect(() => {
    makeLocalList(localData);
  }, [localData]);

  const makeLocalList = (data) => {
    if (data) {
      let _localList = [];
      const _data = data.filter((el) => el.local_used !== 0);
      _data.map((item, index) => {
        _localList.push({
          key: index,
          text: item.local_name,
          value: item.local_index,
        });
      });
      setLocalList(_localList);
    }
  };
  // 상태 종류 / 컬러
  // 미착공  #286e41
  // 천공 #7c3795
  // 장약 #636363
  // 발파 #971717
  // 버력처리 #375795
  // 숏크리트 #7c4c17
  // 강지보 #707017
  // 격자지보 #a1922b
  // 록볼트 #175c59
  // 방수시트 #1b2f54
  // 라이닝 #3c3a3a
  // 근무교대 #407d23
  // 장비점검 #4c7e7c
  // 기타 #351c3e

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
        str = "미착공";
    }
    return str;
  };

  const returnColor = (pcsState) => {
    let colorValue = "#286e41";
    switch (pcsState) {
      case 1: // 미착공
        colorValue = "#286e41";
        break;
      case 2: // 천공
        colorValue = "#7c3795";
        break;
      case 3: // 장약
        colorValue = "#636363";
        break;
      case 4: // 발파
        colorValue = "#971717";
        break;
      case 5: // 버력처리
        colorValue = "#375795";
        break;
      case 6: // 숏크리트
        colorValue = "#7c4c17";
        break;
      case 7: // 강지보
        colorValue = "#707017";
        break;
      case 8: // 격자지보
        colorValue = "#a1922b";
        break;
      case 9: // 록볼트
        colorValue = "#175c59";
        break;
      case 10: // 방수시트
        colorValue = "#1b2f54";
        break;
      case 11: //라이닝
        colorValue = "#3c3a3a";
        break;
      case 12: // 근무교대
        colorValue = "#407d23";
        break;
      case 13: // 장비점검
        colorValue = "#4c7e7c";
        break;
      case 14: // 기타
        colorValue = "#351c3e";
        break;
    }
    return colorValue;
  };

  const colorStyle = (pcsState) => {
    return { backgroundColor: returnColor(pcsState) };
  };

  const dateDescending = (a, b) => {
    let dateA = new Date(a["created_date"]).getTime();
    let dateB = new Date(b["created_date"]).getTime();
    return dateA < dateB ? 1 : -1;
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

  const onRadioChange = (e, target) => {
    let _pcs_state = target.value;

    if (_pcs_state === formData.pcs_state) {
      _pcs_state = 14;
    }
    setFormData({
      ...formData,
      pcs_state: _pcs_state,
    });
  };

  const onSelectChange = (e, seletedValue) => {
    const name = seletedValue.name;
    const value = seletedValue.value;

    let findItem = data
      .filter((el) => el.local_index === value)
      .sort(dateDescending)[0];

    if (findItem) {
      setFormData({
        ...formData,
        prev_pcs_state: findItem.pcs_state,
      });
    } else {
      setFormData({
        ...formData,
        prev_pcs_state: 1,
      });
    }
    setCategorieValue(value);
    setFormData({ ...formData, local_index: value, pcs_state: 0 });
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

  // [ Click Area ] ======================================================================

  // const activeHandler = (e, index, selectedId) => {
  //   if (index === selectedRow.clickedIndex) {
  //     initActiveRow();
  //     initFormData();
  //   } else {
  //     const findItem = data.find(
  //       (processLog) => processLog.pcs_seq === selectedId
  //     );

  //     setSelectedRow({
  //       selectedId: findItem.pcs_seq,
  //       selectedItem: findItem,
  //       clickedIndex: index,
  //     });

  //     setFormData({
  //       ...formData,
  //       pcs_seq: findItem.pcs_seq,
  //       created_date: findItem.created_date,
  //       modified_date: findItem.modified_date,
  //       prev_pcs_state: findItem.prev_pcs_state,
  //       pcs_state: findItem.pcs_state,
  //       local_index: findItem.local_index,
  //       pcs_description: findItem.pcs_description,
  //     });
  //   }
  // };

  // [ Search Categorie Area ] ======================================================================

  const onClickCategorie = (e, target) => {
    initPage();
    // initActiveRow();
    initFormData();
    const _target = target.value;
    setCategorieValue(_target);
    setFormData({
      ...formData,
      local_index: _target,
      pcs_state: 0,
      pcs_description: "",
    });
  };

  useEffect(() => {
    let _data = data;
    let tempData = [];
    if (categorieValue === null) {
      setCurrentData(_data);
    } else {
      tempData = _data.filter((item) => item.local_index === categorieValue);
      setCurrentData(tempData);
    }
  }, [data, categorieValue]);

  // useEffect(() => {
  //   // 클릭 시 input에 테이블에 표기할 노선 데이터 대입
  //   if (formData.local_index === null || undefined) {
  //     setLocalInfo(null);
  //   } else {
  //     let _localInfo = localData.find(
  //       (el) => el.local_index === formData.local_index
  //     );
  //     setLocalInfo(_localInfo);
  //   }
  // }, [activeHandler]);

  // [ Create Area ] ======================================================================

  const createHandler = (e) => {
    e.preventDefault();

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else if (!formData.pcs_state) {
      setStateError("*공정 상태를 선택해 주세요.");
      setTimeout(() => {
        setStateError(undefined);
      }, 1350);
    } else {
      let newProcess = {
        ...formData,
      };

      if (!formData.prev_pcs_state) {
        newProcess = {
          ...formData,
          prev_pcs_state: 1,
        };
      }
      dispatch(postProcess(newProcess));
      initActiveRow();
      initFormData();
    }
  };

  // [ Update Area ] ======================================================================

  const updateHandler = (e) => {
    e.preventDefault();

    // 성공
    let newProcess = {
      ...formData,
      modified_date: today,
    };
    dispatch(putProcess(newProcess.pcs_seq, newProcess));
  };

  // [ Delete Area ] ======================================================================

  const deleteHandler = (e, pcs_seq) => {
    dispatch(deleteProcess(pcs_seq));
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
            stateError={stateError}
            data={data}
            dateDescending={dateDescending}
            colorStyle={colorStyle}
            returnColor={returnColor}
          />
        </div>
        <div className="table-box">
          {data && currentData && (
            <ProcessTable
              className="process-table-box"
              pageInfo={pageInfo}
              data={data}
              // activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
              initPage={initPage}
              localData={localData}
              stateToString={stateToString}
              dateDescending={dateDescending}
              onClickCategorie={onClickCategorie}
              categorieValue={categorieValue}
              currentData={currentData}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default ProcessContainer;
