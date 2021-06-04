import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import DigInput from "../../components/field/DigInput";
import DigTable from "../../components/field/DigTable";
import { useDispatch, useSelector } from "react-redux";
import { getLocals } from "../../modules/locals";
import { getDigs, postDig, putDig, deleteDig } from "../../modules/digs";
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

const DigContainer = () => {
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

  const { data, loading, error } = useSelector((state) => state.digs.digs);
  const localData = useSelector((state) => state.locals.locals.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getDigs());
  }, []);

  // [ State Area ] ===============================================================

  const today = new Date();

  const [currentData, setCurrentData] = useState([]);
  const [categorieValue, setCategorieValue] = useState(null);

  const [localInfo, setLocalInfo] = useState({});
  const [localList, setLocalList] = useState([]);
  const [currentLatestDigInfo, setCurrentLatestDigInfo] = useState({}); // 현재 조회 중인 로컬인덱스의 가장 최신 로그

  const [localError, setLocalError] = useState(undefined);
  const [dateError, setDateError] = useState(undefined);
  const [digLengthError, setDigLengthError] = useState(undefined);

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
    dig_seq: null,
    created_date: null,
    modified_date: null,
    record_date: moment(today).format("YYYY-MM-DD"),
    dig_length: null,
    description: "",
    local_index: null,
  });

  // [ Init Area ] ======================================================================

  // const initSeq = () => {
  //   setFormData({
  //     ...formData,
  //     dig_seq: null,
  //     record_date: moment(formData.record_date).format("YYYY-MM-DD"),
  //   });
  // };

  const initActiveRow = () => {
    setSelectedRow({
      selectedId: null,
      selectedItem: undefined,
      clickedIndex: null,
    });
  };

  const initFormData = (local_index = null) => {
    setFormData({
      ...formData,
      dig_seq: null,
      created_date: null,
      modified_date: null,
      record_date: moment(today).format("YYYY-MM-DD"),
      dig_length: "",
      description: "",
      local_index: local_index,
    });
  };

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
    });
  };

  // [ Common Logic Area ] ======================================================================

  // 누적 굴진율 퍼센트 구하기
  const getDigAmountPercent = (plan_length, dig_length) => {
    let _percent = ((minusComma(dig_length) / plan_length) * 100).toFixed(1);

    if (_percent > 100) {
      return "거리초과";
    } else {
      return _percent + "%";
    }
  };

  // 0 추가
  const addZero = (str, digit) => {
    if (str.length >= digit) {
      return str;
    } else {
      let _str = str.toString();
      let zeros = "";
      for (let i = 0; i < digit - _str.length; i++) {
        zeros = zeros + "0";
      }
      return zeros + _str;
    }
  };

  // 미터 콤마 더하기 빼기
  const addComma = (num) => {
    let _num = num.toString();
    let parts = _num.split(".");
    return (
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] || parts[1] === "" ? "." + parts[1] : "")
    );
  };

  const minusComma = (num) => {
    if (num) {
      let _num = num.toString();
      _num = _num.replace(/[^0-9|^\.]/g, ""); // 입력값이 숫자가 아니면 공백
      _num = _num.replace(/,/g, ""); // , 값 공백처리
      return _num;
    }
  };

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
          name: item.local_name,
        });
      });
      setLocalList(_localList);
    }
  };

  const date_descending = (a, b) => {
    let dateA = new Date(a["record_date"]).getTime();
    let dateB = new Date(b["record_date"]).getTime();
    return dateA < dateB ? 1 : -1;
  };

  const isFirstDigLog = () => {
    // 초기값 판단
    let _data = data.filter((el) => el.local_index === formData.local_index);
    let firstData = _data.sort(date_descending)[0];

    let result = false;
    if (
      moment(firstData.record_date).unix() ===
      moment(formData.record_date).unix()
    ) {
      result = true;
    }

    return result;
  };

  const isAlreadyTyped = () => {
    // 현재 입력하려는 record_date 와 일치하는 데이터가 이미 있는지
    // true : 있음 (수정).
    // false : 없음 (등록).
    if (formData.local_index) {
      let _data = data.filter((el) => el.local_index === formData.local_index);
      _data = _data.find(
        (el) =>
          moment(el.record_date).unix() === moment(formData.record_date).unix()
      );
      if (_data) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getConditionOnPost = () => {
    let _data = data.filter((el) => el.local_index === formData.local_index);
    _data.push(formData);
    _data = _data.sort(date_descending);
    let _index = _data.findIndex(
      (el) =>
        moment(el.record_date).unix() === moment(formData.record_date).unix()
    );
    return {
      maxLength: _data[_index - 1] && _data[_index - 1].dig_length,
      minLength: _data[_index + 1] && _data[_index + 1].dig_length,
    };
  };

  const getConditionOnPut = () => {
    let _data = data.filter((el) => el.local_index === formData.local_index);
    _data = _data.sort(date_descending);
    let _index = _data.findIndex(
      (el) =>
        moment(el.record_date).unix() === moment(formData.record_date).unix()
    );
    return {
      maxLength: _data[_index - 1] && _data[_index - 1].dig_length,
      minLength: _data[_index + 1] && _data[_index + 1].dig_length,
    };
  };

  const conditionalPost = (condition, _dig_length) => {
    let maxTestResult = condition.maxLength
      ? _dig_length < condition.maxLength
        ? true
        : false
      : true;
    let minTestResult = condition.minLength
      ? _dig_length > condition.minLength
        ? true
        : false
      : true;

    if (minTestResult) {
      if (maxTestResult) {
        let newDig = {
          ...formData,
          dig_length: minusComma(_dig_length),
        };
        dispatch(postDig(newDig));
      } else {
        setDigLengthError(
          `*이후 입력일에 입력된굴진량(${condition.maxLength}m)보다 작아야합니다.`
        );
        setTimeout(() => {
          setDigLengthError(undefined);
        }, 3000);
      }
    } else {
      setDigLengthError(
        `*이전 입력일에 입력된굴진량(${condition.minLength}m)보다 커야합니다.`
      );
      setTimeout(() => {
        setDigLengthError(undefined);
      }, 3000);
    }
  };

  const conditionalPut = (condition, _dig_length) => {
    let maxTestResult = condition.maxLength
      ? _dig_length < condition.maxLength
        ? true
        : false
      : true;
    let minTestResult = condition.minLength
      ? _dig_length > condition.minLength
        ? true
        : false
      : true;

    if (minTestResult) {
      if (maxTestResult) {
        let _dig_seq = data.find(
          (el) =>
            moment(el.record_date).unix() ===
            moment(formData.record_date).unix()
        ).dig_seq;
        let newDig = {
          ...formData,
          dig_seq: _dig_seq,
          modified_date: today,
          dig_length: minusComma(_dig_length),
        };
        dispatch(putDig(_dig_seq, newDig));
      } else {
        setDigLengthError(
          `*이후 굴진량(${condition.maxLength}m)보다 작아야합니다.`
        );
        setTimeout(() => {
          setDigLengthError(undefined);
        }, 3000);
      }
    } else {
      setDigLengthError(
        `*이전 굴진량(${condition.minLength}m)보다 커야합니다.`
      );
      setTimeout(() => {
        setDigLengthError(undefined);
      }, 3000);
    }
  };

  // [ Change Area ] ======================================================================

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // 입력값 state 에 저장
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "dig_length") {
      let _value = value.replace(/[^0-9|^\.]/g, "");
      // console.log("_value", _value);
      let parts = _value.toString().split(".");
      // console.log("parts", parts);
      let result = "";
      if (parts[0] && parts[0].length > 4) {
        parts[0] = parts[0].toString().substring(0, 4);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].toString().substring(0, 2);
      }
      if (parts.length > 2) {
        result = parts[0] + (parts[1] || parts[1] === "" ? "." + parts[1] : "");
        // console.log("result", result);
        setFormData({
          ...formData,
          dig_length: result,
        });
      } else {
        result = parts[0] + (parts[1] || parts[1] === "" ? "." + parts[1] : "");
        // console.log("result", result);
        setFormData({
          ...formData,
          dig_length: result,
        });
      }
    }
  };

  const onSelectChange = (e, seletedValue) => {
    const name = seletedValue.name;
    const value = seletedValue.value;

    setFormData({
      ...formData,
      [name]: value,
      dig_length: "",
    });

    setCategorieValue(value);
  };

  const onChangeDate = (date) => {
    let _date = date;
    if (_date === null || undefined) {
      _date = today;
    }
    setFormData({
      ...formData,
      record_date: moment(_date).format("YYYY-MM-DD"),
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

  // [ Search Categorie Area ] ======================================================================

  const onClickCategorie = (e, value) => {
    initActiveRow();
    initPage();
    const _value = value.value;
    setCategorieValue(_value);
    initFormData(_value);
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

  // [ Create Area ] ======================================================================

  const createHandler = (e) => {
    e.preventDefault();

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 3000);
    } else {
      let _dig_length = parseFloat(formData.dig_length);
      let isAlreadyTyped_result = isAlreadyTyped();
      let isFirstDigLog_result = isFirstDigLog();

      // console.log(typeof _dig_length, "--->", _dig_length);
      // console.log(typeof localInfo.plan_length, "--->", localInfo.plan_length);

      if (_dig_length > parseFloat(localInfo.plan_length)) {
        setLocalError("*계획 연장 거리를 초과하였습니다. 다시 입력해주세요.");
        setTimeout(() => {
          setLocalError(undefined);
        }, 3000);
      }
      //  else if (isFirstDigLog_result) {
      //   setDigLengthError(`*초기 데이터는 수정할 수 없습니다.`);
      //   setTimeout(() => {
      //     setDigLengthError(undefined);
      //   }, 3000);
      // }
      else if (isAlreadyTyped_result) {
        //result = true (수정)
        let condition = getConditionOnPut();
        conditionalPut(condition, parseFloat(_dig_length));
      } else {
        //result = false (등록)
        let condition = getConditionOnPost();
        conditionalPost(condition, parseFloat(_dig_length));
      }
    }

    initActiveRow();
    initFormData(categorieValue);
  };

  // [ Update Area ] ======================================================================

  const updateHandler = (e) => {
    e.preventDefault();

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 3000);
    } else {
      let _dig_length = parseFloat(formData.dig_length);

      if (_dig_length > parseFloat(localInfo.plan_length)) {
        setLocalError("*계획 연장 거리를 초과하였습니다. 다시 입력해주세요.");
        setTimeout(() => {
          setLocalError(undefined);
        }, 3000);
      }
      //  else if (!isFirstDigLog) {
      //   setDigLengthError(`*초기 데이터는 수정할 수 없습니다.`);
      //   setTimeout(() => {
      //     setDigLengthError(undefined);
      //   }, 3000);
      // }
      else {
        let condition = getConditionOnPut();
        conditionalPut(condition, parseFloat(_dig_length));
      }
    }
  };

  // [ Delete Area ] ======================================================================

  const deleteHandler = (e, dig_seq) => {
    dispatch(deleteDig(dig_seq));
    initActiveRow();
    initFormData(categorieValue);
  };

  // [ Click Area ] ======================================================================

  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData(categorieValue);
    } else {
      const findItem = data.find((digLog) => digLog.dig_seq === selectedId);

      setSelectedRow({
        selectedId: findItem.dig_seq,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        dig_seq: findItem.dig_seq,
        created_date: findItem.created_date,
        modified_date: findItem.modified_date,
        record_date: findItem.record_date,
        dig_length: findItem.dig_length,
        description: findItem.description,
        local_index: findItem.local_index,
      });
    }
  };

  useEffect(() => {
    // 노선 정보가 있을 때 input 안의 테이블에 넣을 노선 정보 최신화 하기
    if (formData.local_index === null || formData.local_index === undefined) {
      setLocalInfo(null);
      setCurrentLatestDigInfo(null);
    } else {
      // 노선 정보 state 대입
      let _localInfo = localData.find(
        (el) => el.local_index === formData.local_index
      );
      setLocalInfo(_localInfo);
      // 가장 최신 굴진 데이터 state 대입
      let _currentLatestDigInfo = data.filter(
        (el) => el.local_index === formData.local_index
      );
      _currentLatestDigInfo = _currentLatestDigInfo.sort(date_descending)[0];
      setCurrentLatestDigInfo(_currentLatestDigInfo);
    }
  }, [
    formData.local_index,
    categorieValue,
    createHandler,
    updateHandler,
    deleteHandler,
  ]);

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
          {data && currentData && (
            <DigInput
              className="dig-input-box"
              onChange={onChange}
              data={data}
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
              digLengthError={digLengthError}
              addComma={addComma}
              minusComma={minusComma}
              localInfo={localInfo}
              currentLatestDigInfo={currentLatestDigInfo}
              onChangeDate={onChangeDate}
              getDigAmountPercent={getDigAmountPercent}
              categorieValue={categorieValue}
            />
          )}
        </div>
        <div className="table-box">
          {data && currentData && localData && (
            <DigTable
              className="dig-table-box"
              pageInfo={pageInfo}
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
              localData={localData}
              localList={localList}
              addComma={addComma}
              addZero={addZero}
              getDigAmountPercent={getDigAmountPercent}
              categorieValue={categorieValue}
              currentData={currentData}
              onClickCategorie={onClickCategorie}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default DigContainer;
