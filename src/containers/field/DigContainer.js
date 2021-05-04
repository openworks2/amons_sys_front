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
  const { data, loading, error } = useSelector((state) => state.digs.digs);
  const localData = useSelector((state) => state.locals.locals.data);

  const dispatch = useDispatch();
  const today = new Date();

  const [localInfo, setLocalInfo] = useState({});
  const [currentLatestDigInfo, setCurrentLatestDigInfo] = useState({}); // 현재 조회 중인 로컬인덱스의 가장 최신 로그

  const [formData, setFormData] = useState({
    dig_seq: null,
    created_date: null,
    modified_date: null,
    record_date: moment(today).format("YYYY.MM.DD"),
    dig_length: null,
    description: "",
    local_index: null,
  });
  const [localList, setLocalList] = useState([]);

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getDigs());
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

  useEffect(() => {
    console.log("$$$$$$$change!");
    console.log(formData);
    console.log("$$$$$$$change!");
  }, [formData]);

  // 누적 굴진율 퍼센트 구하기
  const getDigAmountPercent = (plan_length, dig_length) => {
    return ((dig_length / plan_length) * 100).toFixed(1) + "%";
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
    let _num = num.toString();
    _num = _num.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
    _num = _num.replace(/,/g, ""); // , 값 공백처리
    if (_num.length > 4) {
      // 4자리 초과시 뒷자리 자르기
      _num = _num.substring(0, 4);
    }
    return _num;
  };

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

  const onChangeDate = (date) => {
    let _date = date;
    if (_date === null || undefined) {
      _date = today;
    }
    setFormData({
      ...formData,
      record_date: moment(_date).format("YYYY.MM.DD"),
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
      dig_seq: null,
      created_date: null,
      modified_date: null,
      record_date: moment(today).format("YYYY.MM.DD"),
      dig_length: "",
      description: "",
      local_index: null,
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

    let _dig_length = minusComma(formData.dig_length);
    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else if (_dig_length > localInfo.plan_length) {
      setLocalError("*계획 연장 거리를 초과하였습니다. 다시 입력해주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else {
      let newDig = {
        ...formData,
        dig_length: _dig_length,
      };
      dispatch(postDig(newDig));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();

    let _dig_length = minusComma(formData.dig_length);

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else if (_dig_length > localInfo.plan_length) {
      setLocalError("*계획 연장 거리를 초과하였습니다. 다시 입력해주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;

      let newDig = {
        ...formData,
        modified_date: today,
        dig_length: _dig_length,
      };
      dispatch(putDig(newDig.dig_seq, newDig));
    }
  };

  // DELETE
  const deleteHandler = (e, dig_seq) => {
    dispatch(deleteDig(dig_seq));
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
