import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ScannerInput from "../../components/general/ScannerInput";
import ScannerTable from "../../components/general/ScannerTable";
import { useDispatch, useSelector } from "react-redux";
// import { getLocals } from "../../modules/locals";
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

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getLocals());
    dispatch(getScanners());
  }, [dispatch]);

  console.log(data);
  // const localData = useSelector((state) => state.locals.locals.data);

  const [formData, setFormData] = useState({
    scn_id: null,
    scn_index: null,
    created_date: null,
    modified_date: null,
    scn_pos_x: null,
    scn_kind: null,
    scn_group: null,
    scn_address: null,
    scn_name: null,
    scn_ip: null,
    scn_port: null,
    scn_receive_time: null,
    scn_result: null,
    scn_start_time: null,
    scn_stop_time: null,
    description: null,
    local_index: null,
    closed_count: null,
  });

  useEffect(() => {
    console.log("$$$$$$$change!");
    console.log(formData);
    console.log("$$$$$$$change!");
  }, [formData]);

  const [companyList, setCompanyList] = useState([]);
  const [companySearchList, setCompanySearchList] = useState([]);
  const [unUsedBeaconList, setUnUsedBeaconList] = useState([]);

  // useEffect(() => {
  //   makeLocalList(localData);
  // }, [localData, formData.local_index]);

  // const makeCompanyList = (data) => {
  //   if (data) {
  //     let _companyList = [];
  //     let _companySearchList = [];

  //     _companySearchList.push({
  //       key: "all",
  //       text: "소속사 전체",
  //       value: null,
  //     });

  //     data.map((item, index) => {
  //       _companyList.push({
  //         key: index,
  //         text: item.co_name,
  //         value: item.co_index,
  //       });
  //       _companySearchList.push({
  //         key: index,
  //         text: item.co_name,
  //         value: item.co_index,
  //       });
  //     });
  //     setCompanySearchList(_companySearchList);
  //     setCompanyList(_companyList);
  //   }
  // };

  const splitByColonInput = (str) => {
    let _str = str.replace(/\:/g, "");

    if (_str.length > 10) {
      return str.substring(0, 14);
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
      scn_pos_x: null,
      scn_kind: null,
      scn_group: null,
      scn_address: null,
      scn_name: null,
      scn_ip: null,
      scn_port: null,
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
        created_date: findItem.created_date,
        modified_date: findItem.modified_date,
        scn_pos_x: findItem.scn_pos_x,
        scn_kind: findItem.scn_kind,
        scn_group: findItem.scn_group,
        scn_address: findItem.scn_address,
        scn_name: findItem.scn_name,
        scn_ip: findItem.scn_ip,
        scn_port: findItem.scn_port,
        scn_receive_time: findItem.scn_receive_time,
        scn_result: findItem.scn_result,
        scn_start_time: findItem.scn_start_time,
        scn_stop_time: findItem.scn_stop_time,
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

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    // if (!formData.local_index) {
    //   setLocalError({
    //     content: "노선을 선택해 주세요.",
    //     pointing: "below",
    //   });
    //   setTimeout(() => {
    //     setLocalError(undefined);
    //   }, 1500);
    // } else {
    let newScanner = { ...formData };
    dispatch(postScanner(newScanner));
    initActiveRow();
    initFormData();
    // }
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();
    // if (!formData.local_index) {
    //   setLocalError({
    //     content: "노선을 선택해 주세요.",
    //     pointing: "below",
    //   });
    //   setTimeout(() => {
    //     setLocalError(undefined);
    //   }, 1500);
    // } else {
    // 성공
    const findItem = selectedRow.selectedItem;

    let newScanner = {
      ...formData,
      created_date: findItem.created_date,
      modified_date: today,
    };
    dispatch(putScanner(newScanner.scn_index, newScanner));
    initActiveRow();
    initFormData();
    // }
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
            // localList={localList}
            localError={localError}
            kindError={kindError}
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
              // localData={localData}
              // localList={localList}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default ScannerContainer;
