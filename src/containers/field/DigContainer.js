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

  const initSeq = () => {
    setFormData({
      ...formData,
      dig_seq: null,
      record_date: moment(formData.record_date).format("YYYY-MM-DD"),
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
      ...formData,
      dig_seq: null,
      created_date: null,
      modified_date: null,
      record_date: moment(today).format("YYYY-MM-DD"),
      dig_length: "",
      description: "",
      local_index: null,
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
      return "굴진거리초과";
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
    _num = _num.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
    _num = _num.replace(/,/g, ""); // , 값 공백처리
    if (_num.length > 4) {
      _num = _num.substring(0, 4);
    }
    return _num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
  };

  const minusComma = (num) => {
    if (num) {
      let _num = num.toString();
      _num = _num.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
      _num = _num.replace(/,/g, ""); // , 값 공백처리
      if (_num.length > 4) {
        // 4자리 초과시 뒷자리 자르기
        _num = _num.substring(0, 4);
      }
      return _num;
    }
  };

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

  const date_descending = (a, b) => {
    let dateA = new Date(a["record_date"]).getTime();
    let dateB = new Date(b["record_date"]).getTime();
    return dateA < dateB ? 1 : -1;
  };

  const isAlreadyTyped = () => {
    // 현재 입력하려는 record_date 와 일치하는 데이터가 이미 있는지
    // true : 있음 (수정).
    // false : 없음 (등록).
    if (formData.local_index) {
      let _data = data.filter((el) => el.local_index === formData.local_index);
      _data = _data.find(
        (el) =>
          moment(el.record_date).format("YYYY-MM-DD") === formData.record_date
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
        moment(el.record_date).format("YYYY-MM-DD").toString() ===
        moment(formData.record_date).format("YYYY-MM-DD").toString()
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
        moment(el.record_date).format("YYYY-MM-DD").toString() ===
        moment(formData.record_date).format("YYYY-MM-DD").toString()
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
          dig_length: _dig_length,
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
        let _dig_seq = formData.dig_seq;
        if (!selectedRow.selectedItem) {
          _dig_seq = data.find(
            (el) =>
              moment(el.record_date).format("YYYY-MM-DD").toString() ===
              moment(formData.record_date).format("YYYY-MM-DD").toString()
          ).dig_seq;
        }
        let newDig = {
          ...formData,
          dig_seq: _dig_seq,
          modified_date: today,
          dig_length: _dig_length,
        };
        dispatch(putDig(_dig_seq, newDig));
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
      let _value = value.toString();
      _value = _value.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
      _value = _value.replace(/,/g, ""); // , 값 공백처리
      if (_value.length > 4) {
        _value = _value.substring(0, 4);
      }
      setFormData({
        ...formData,
        dig_length: addComma(
          _value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ),
      });
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
  };

  useEffect(() => {
    if (!selectedRow.selectedId && data && formData.local_index) {
      let _digData = data;
      _digData = _digData.filter(
        (el) => el.local_index === formData.local_index
      );
      _digData = _digData.sort((a, b) =>
        b.record_date.localeCompare(a.record_date)
      )[0];
      setCurrentLatestDigInfo(_digData);
    }
  }, [onSelectChange]);

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
    // 활성화된 로우 초기화
    initActiveRow();
    initFormData();
  };

  // [ Click Area ] ======================================================================

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

  // [ Create Area ] ======================================================================

  const createHandler = (e) => {
    e.preventDefault();
    let _dig_length = minusComma(formData.dig_length);
    let result = isAlreadyTyped();

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 3000);
    } else if (_dig_length > localInfo.plan_length) {
      setLocalError("*계획 연장 거리를 초과하였습니다. 다시 입력해주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 3000);
    } else if (result) {
      //result = true (수정)
      let condition = getConditionOnPut();
      conditionalPut(condition, _dig_length);
      initActiveRow();
      initFormData();
    } else {
      //result = false (등록)
      let condition = getConditionOnPost();
      conditionalPost(condition, _dig_length);
      initActiveRow();
      initFormData();
    }
  };

  // [ Update Area ] ======================================================================

  const updateHandler = (e) => {
    e.preventDefault();

    let _dig_length = minusComma(formData.dig_length);

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 3000);
    } else if (_dig_length > localInfo.plan_length) {
      setLocalError("*계획 연장 거리를 초과하였습니다. 다시 입력해주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 3000);
    } else {
      let condition = getConditionOnPut();
      conditionalPut(condition, _dig_length);
    }
  };

  // [ Delete Area ] ======================================================================

  const deleteHandler = (e, dig_seq) => {
    dispatch(deleteDig(dig_seq));
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
          <DigInput
            className="dig-input-box"
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
            digLengthError={digLengthError}
            addComma={addComma}
            localInfo={localInfo}
            currentLatestDigInfo={currentLatestDigInfo}
            onChangeDate={onChangeDate}
            getDigAmountPercent={getDigAmountPercent}
          />
        </div>
        <div className="table-box">
          {data && (
            <DigTable
              className="dig-table-box"
              pageInfo={pageInfo}
              data={data}
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
              initSeq={initSeq}
              initPage={initPage}
              localData={localData}
              localList={localList}
              addComma={addComma}
              addZero={addZero}
              getDigAmountPercent={getDigAmountPercent}
              currentLatestDigInfo={currentLatestDigInfo}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default DigContainer;
