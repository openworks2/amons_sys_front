import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ScannerInput from "../../components/general/ScannerInput";
import ScannerTable from "../../components/general/ScannerTable";
import { useDispatch, useSelector } from "react-redux";
import { getLocals } from "../../modules/locals";
import {
  getScanners,
  postScanner,
  putScanner,
  deleteScanner,
} from "../../modules/scanners";

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

const ScannerContainer = () => {
  const { data, loading, error } = useSelector(
    (state) => state.scanners.scanners
  );
  const localData = useSelector((state) => state.locals.locals.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getScanners());
  }, [dispatch]);

  console.log(data);

  const [formData, setFormData] = useState({
    scn_id: null,
    scn_index: null,
    created_date: null,
    modified_date: null,
    scn_pos_x: null,
    scn_kind: null,
    scn_group: "",
    scn_address: "",
    scn_name: null,
    scn_ip: "",
    scn_port: "",
    scn_receive_time: null,
    scn_result: null,
    scn_start_time: null,
    scn_stop_time: null,
    description: "",
    local_index: null,
    closed_count: null,
  });

  useEffect(() => {
    makeLocalList(localData);
  }, [localData, formData.local_index]);

  useEffect(() => {
    console.log("$$$$$$$change!");
    console.log(formData);
    console.log("$$$$$$$change!");
  }, [formData]);

  const [localList, setLocalList] = useState([]);

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

  // mac address 입력 / 출력
  //입력
  const splitByColonInput = (str) => {
    let _str = str.replace(/\:/g, "");

    if (_str.length > 12) {
      return str.substring(0, 17);
    }

    let length = _str.length;
    let point = _str.length % 2;
    let splitedStr = "";
    splitedStr = _str.substring(0, point);
    while (point < length) {
      if (splitedStr !== "") splitedStr += ":";
      splitedStr += _str.substring(point, point + 2);
      point += 2;
    }
    return splitedStr;
  };
  // 출력

  const splitByColon = (str = "") => {
    let length = str.length;
    let point = str.length % 2;
    let splitedStr = "";

    splitedStr = str.substring(0, point);
    while (point < length) {
      if (splitedStr !== "") splitedStr += ":";
      splitedStr += str.substring(point, point + 2);
      point += 2;
    }

    return splitedStr;
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

  // form onSelectChant Event
  const onSelectChange = (e, seletedValue) => {
    const name = seletedValue.name;
    const value = seletedValue.value;

    if (name === "bc_index") {
      const findBeacon = seletedValue.options.find((el) => el.value == value);
      const address = findBeacon.address;
      console.log(findBeacon);
      setFormData({
        ...formData,
        [name]: value,
        bc_address: address,
        bc_id: findBeacon.bc_id,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      scn_id: null,
      scn_index: null,
      created_date: null,
      modified_date: null,
      scn_pos_x: "",
      scn_kind: null,
      scn_group: "",
      scn_address: "",
      scn_name: "",
      scn_ip: "",
      scn_port: "",
      scn_receive_time: null,
      scn_result: null,
      scn_start_time: null,
      scn_stop_time: null,
      description: "",
      local_index: null,
      closed_count: null,
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((scanner) => scanner.scn_id === selectedId);

      setSelectedRow({
        selectedId: findItem.scn_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        scn_id: findItem.scn_id,
        scn_index: findItem.scn_index,
        scn_pos_x: findItem.scn_pos_x,
        scn_kind: findItem.scn_kind,
        scn_group: findItem.scn_group,
        scn_address: findItem.scn_address,
        scn_name: findItem.scn_name,
        scn_ip: findItem.scn_ip,
        scn_port: findItem.scn_port,
        description: findItem.description,
        local_index: findItem.local_index,
        closed_count: findItem.closed_count,
      });
    }

    console.log("formData");
    console.log("formData");
    console.log(formData);
    console.log("formData");
    console.log("formData");
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
  const [kindError, setKindError] = useState(undefined);
  const [addressError, setAddressError] = useState(undefined);

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    let _scn_address = formData.scn_address.replace(/\:/g, "");
    _scn_address = _scn_address.substring(0, 12); // 입력된 글자수 10자리 맞추기

    if (_scn_address.length !== 12) {
      // 자리수 유효성 검사
      setAddressError({
        content: "비콘 번호 12자리를 모두 입력해주세요.",
      });
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else if (!formData.local_index) {
      setLocalError({
        content: "노선을 선택해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setLocalError(undefined);
      }, 1500);
    } else if (formData.scn_kind === null || formData.scn_kind === undefined) {
      setKindError({
        content: "사용용도를 선택해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setKindError(undefined);
      }, 1500);
    } else {
      let newScanner = { ...formData, scn_address: _scn_address };
      dispatch(postScanner(newScanner));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();

    let _scn_address = formData.scn_address.replace(/\:/g, "");
    _scn_address = _scn_address.substring(0, 12); // 입력된 글자수 12자리 맞추기

    if (_scn_address.length !== 12) {
      // 자리수 유효성 검사
      setAddressError({
        content: "비콘 번호 12자리를 모두 입력해주세요.",
      });
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else if (!formData.local_index) {
      setLocalError({
        content: "노선을 선택해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setLocalError(undefined);
      }, 1500);
    } else if (formData.scn_kind === (null || undefined)) {
      setKindError({
        content: "사용용도를 선택해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setKindError(undefined);
      }, 1500);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;

      let newScanner = {
        ...formData,
        created_date: findItem.created_date,
        modified_date: today,
        scn_receive_time: findItem.scn_receive_time,
        scn_result: findItem.scn_result,
        scn_start_time: findItem.scn_start_time,
        scn_stop_time: findItem.scn_stop_time,
        scn_address: _scn_address,
      };
      dispatch(putScanner(newScanner.scn_index, newScanner));
      initActiveRow();
      initFormData();
    }
  };

  // DELETE
  const deleteHandler = (e, scn_id) => {
    dispatch(deleteScanner(scn_id));
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
          <ScannerInput
            className="scanner-input-box"
            onChange={onChange}
            onSelectChange={onSelectChange}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
            localList={localList}
            localError={localError}
            kindError={kindError}
            addressError={addressError}
            addComma={addComma}
            splitByColonInput={splitByColonInput}
          />
        </div>
        <div className="table-box">
          {data && (
            <ScannerTable
              className="scanner-table-box"
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
              splitByColon={splitByColon}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default ScannerContainer;
