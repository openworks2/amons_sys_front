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
  // 목차
  // [ Redux Area ]
  // [ State Area ]
  // [ Init Area ]
  // [ Common Logic Area ]
  // [ Change Area ]
  // [ Search Categorie Area ]
  // [ Click Area ]
  // [ Create Area ]
  // [ Update Area ]
  // [ Delete Area ]
  // [ Components Area ]

  // [ Redux Area ] ======================================================================

  const { data, loading, error } = useSelector(
    (state) => state.scanners.scanners
  );
  const localData = useSelector((state) => state.locals.locals.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getScanners());
  }, []);

  // [ State Area ] ======================================================================
  const today = new Date();

  const [categorieValue, setCategorieValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentData, setCurrentData] = useState([]);

  const [localList, setLocalList] = useState([]);

  const [localError, setLocalError] = useState(undefined);
  const [kindError, setKindError] = useState(undefined);
  const [addressError, setAddressError] = useState(undefined);

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
    scn_description: "",
    local_index: null,
    closed_count: null,
  });

  // [ Init Area ] ======================================================================

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
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
      scn_description: "",
      local_index: null,
      closed_count: null,
    });
  };

  // [ Common Logic Area ] ======================================================================

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

  const splitByColonInput = (str) => {
    let _str = str.replace(/\:/g, "");

    if (_str.length > 12) {
      return splitByColon(_str.substring(0, 12));
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

  // 그룹 2자리 제한
  const groupLimit = () => {
    let _scn_group = formData.scn_group;
    _scn_group = _scn_group.toUpperCase().replace(/[^a-z|^A-Z|^0-9]*$/g, "");
    if (formData.scn_group && formData.scn_group.length >= 2) {
      _scn_group = _scn_group.substring(0, 2);
      return _scn_group;
    }
    return _scn_group;
  };

  const kindReturn = (kind) => {
    let str = "";
    if (kind === 0) {
      str = "기타";
    }
    if (kind === 1) {
      str = "입장";
    }
    if (kind === 2) {
      str = "퇴장";
    }
    if (kind === 3) {
      str = "위치측정";
    }
    return str;
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

  // [ Change Area ] ======================================================================

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "scn_pos_x") {
      let _value = value.replace(/[^0-9|^\.]/g, "");
      // console.log("_value", _value);
      let parts = _value.toString().split(".");
      // console.log("parts", parts);
      let result = "";
      if (parts[0] && parts[0].length > 4) {
        parts[0] = parts[0].toString().substring(0, 4);
      }
      if (parts[1] && parts[1].length > 1) {
        parts[1] = parts[1].toString().substring(0, 1);
      }
      if (parts.length > 2) {
        result = parts[0] + (parts[1] || parts[1] === "" ? "." + parts[1] : "");
        // console.log("result", result);

        setFormData({
          ...formData,
          scn_pos_x: result,
        });
      } else {
        result = parts[0] + (parts[1] || parts[1] === "" ? "." + parts[1] : "");
        // console.log("result", result);
        setFormData({
          ...formData,
          scn_pos_x: result,
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

  const onSearchChange = (e) => {
    const _searchValue = e.target.value;
    setSearchValue(_searchValue);
  };

  const onSearch = (e) => {
    document.getElementById("scroll0").scrollIntoView();
    const _data = data;
    let tempData = [];
    if (!searchValue) {
      dispatch(getScanners());
    }
    if (categorieValue === null) {
      // 전체검색
      let _searchValue = searchValue.replace(/\:/g, "");
      _searchValue = _searchValue.toUpperCase();
      _searchValue = _searchValue.substring(0, 12);
      tempData = _data.filter((item) =>
        item.scn_address.includes(_searchValue)
      );

      setCurrentData(tempData);
    } else {
      // 검색
      tempData = _data.filter((item) => item.local_index === categorieValue);
      let _searchValue = searchValue;
      _searchValue = _searchValue.toUpperCase();
      _searchValue = _searchValue.substring(0, 12);
      tempData = tempData.filter((item) =>
        item.scn_address.includes(_searchValue)
      );

      setCurrentData(tempData);
    }
    if (selectedRow.selectedId) {
      initActiveRow();
      initFormData();
    }
    initPage();
  };

  const onClickCategorie = (e, value) => {
    if (selectedRow.selectedId) {
      initActiveRow();
      initFormData();
    }
    initPage();
    const _value = value.value;
    setCategorieValue(_value);
  };

  //검색에 따라 데이터 변경
  useEffect(() => {
    const _data = data;
    setCurrentData(_data);
    let tempData = [];
    if (categorieValue === null) {
      setCurrentData(_data);
    } else {
      tempData = _data.filter((item) => item.local_index === categorieValue);
      setCurrentData(tempData);
    }
  }, [data, categorieValue]);

  // [ Click Area ] ======================================================================

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
        scn_description: findItem.scn_description,
        local_index: findItem.local_index,
        closed_count: findItem.closed_count,
      });
    }
  };

  // [ Create Area ] ======================================================================

  const createHandler = (e) => {
    e.preventDefault();
    let _scn_address = formData.scn_address.replace(/\:/g, "").toUpperCase();
    _scn_address = _scn_address.substring(0, 12); // 입력된 글자수 10자리 맞추기
    let _scn_pos_x = parseFloat(minusComma(formData.scn_pos_x));
    let _scn_group = formData.scn_group.substring(0, 2); // 입력된 글자수 맞추기

    if (_scn_address.length !== 12) {
      // 자리수 유효성 검사
      setAddressError("*비콘 번호 12자리를 모두 입력해주세요.");
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else if (formData.scn_kind === null || formData.scn_kind === undefined) {
      setKindError("*사용용도를 선택해 주세요.");
      setTimeout(() => {
        setKindError(undefined);
      }, 1350);
    } else {
      let newScanner = {
        ...formData,
        scn_address: _scn_address,
        scn_pos_x: _scn_pos_x,
        scn_group: _scn_group,
      };
      dispatch(postScanner(newScanner));
      initActiveRow();
      initFormData();
    }
  };

  // [ Update Area ] ======================================================================

  const updateHandler = (e) => {
    e.preventDefault();

    let _scn_address = formData.scn_address.replace(/\:/g, "").toUpperCase();
    _scn_address = _scn_address.substring(0, 12); // 입력된 글자수 10자리 맞추기
    let _scn_pos_x = parseFloat(minusComma(formData.scn_pos_x));
    let _scn_group = formData.scn_group.substring(0, 2); // 입력된 글자수 맞추기

    if (_scn_address.length !== 12) {
      // 자리수 유효성 검사
      setAddressError("*비콘 번호 12자리를 모두 입력해주세요.");
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else if (formData.scn_kind === null || formData.scn_kind === undefined) {
      setKindError("*사용용도를 선택해 주세요.");
      setTimeout(() => {
        setKindError(undefined);
      }, 1350);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;

      let newScanner = {
        ...formData,
        created_date: findItem.created_date,
        modified_date: today,
        scn_pos_x: _scn_pos_x,
        scn_group: _scn_group,
        scn_receive_time: findItem.scn_receive_time,
        scn_result: findItem.scn_result,
        scn_start_time: findItem.scn_start_time,
        scn_stop_time: findItem.scn_stop_time,
        scn_address: _scn_address,
      };
      dispatch(putScanner(newScanner.scn_index, newScanner));
    }
  };

  // [ Delete Area ] ======================================================================

  const deleteHandler = (e, scn_id) => {
    dispatch(deleteScanner(scn_id));
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
          {localData && (
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
              groupLimit={groupLimit}
            />
          )}
        </div>
        <div className="table-box">
          {data && currentData && localData && (
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
              initPage={initPage}
              localData={localData}
              localList={localList}
              addComma={addComma}
              splitByColon={splitByColon}
              addZero={addZero}
              categorieValue={categorieValue}
              searchValue={searchValue}
              currentData={currentData}
              kindReturn={kindReturn}
              onClickCategorie={onClickCategorie}
              onSearchChange={onSearchChange}
              onSearch={onSearch}
              splitByColon={splitByColon}
              splitByColonInput={splitByColonInput}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default ScannerContainer;
