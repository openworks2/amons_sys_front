import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import WorkerInput from "../../components/general/WorkerInput";
import WorkerTable from "../../components/general/WorkerTable";
import { useDispatch, useSelector } from "react-redux";
import { getBeacons, getUnUsedBeacons } from "../../modules/beacons";
import { getCompanies } from "../../modules/companies";
import {
  getWorkers,
  postWorker,
  deleteWorker,
  putWorker,
} from "../../modules/workers";
import axios from "axios";

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

const WorkerContatiner = () => {
  const { data, loading, error } = useSelector(
    (state) => state.workers.workers
  );
  const companyData = useSelector((state) => state.companies.companies.data);
  const unUsedBeaconData = useSelector((state) => state.beacons.beacons.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnUsedBeacons());
    dispatch(getCompanies());
    dispatch(getWorkers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    wk_id: null,
    wk_index: null,
    wk_name: "",
    wk_phone: "",
    wk_position: "",
    wk_nation: "",
    wk_birth: "1980.01.01",
    wk_blood_type: "",
    wk_blood_group: "0",
    wk_sms_yn: false,
    wk_image_path: "",
    co_index: null,
    bc_index: null,
  });

  useEffect(() => {
    console.log("$$$$$$$change!");
    console.log(formData);
    console.log("$$$$$$$change!");
  }, [formData]);

  useEffect(() => {
    makeCompanyList(companyData);
  }, [companyData, formData.co_index]);

  useEffect(() => {
    makeBeaconList(unUsedBeaconData);
  }, [unUsedBeaconData, formData.bc_index]);

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

  const [companyList, setCompanyList] = useState([]);
  const [unUsedBeaconList, setUnUsedBeaconList] = useState([]);

  const makeCompanyList = (data) => {
    if (data) {
      let _companyList = [];
      data.map((item, index) => {
        _companyList.push({
          key: index,
          text: item.co_name,
          value: item.co_index,
        });
      });
      setCompanyList(_companyList);
    }
  };

  const makeBeaconList = (data) => {
    if (data) {
      let _unUsedBeaconList = [];
      _unUsedBeaconList.push({ key: 0, text: "할당 없음", value: null });
      if (formData.bc_address && formData.bc_index) {
        // 선택한 줄이 있을 경우, 해당 데이터 추가
        _unUsedBeaconList.push({
          key: 1,
          text: splitByColonInput(formData.bc_address),
          value: formData.bc_index,
        });
      }
      data.map((item, index) => {
        _unUsedBeaconList.push({
          key: index + 2,
          text: splitByColonInput(item.bc_address),
          value: item.bc_index,
        });
      });
      setUnUsedBeaconList(_unUsedBeaconList);
    }
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
    console.log("*****************************");
    console.log("e");
    console.log(e);
    console.log(e.target);
    console.log("value");
    const name = seletedValue.name;
    const value = seletedValue.value;
    console.log(name);
    console.log(value);

    if (name === "wk_sms_yn") {
      setFormData({
        ...formData,
        [name]: !value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log("formData");
    console.log(formData);
    console.log("*****************************");
  };

  // datepicker

  const getFormatDate = (date) => {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + "." + month + "." + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
  };

  const onChangeDate = (date) => {
    if (data) {
      setFormData({
        ...formData,
        wk_birth: getFormatDate(date),
      });
    }
  };

  // 사진 업로드

  const [imageUrl, setImageUrl] = useState("");
  const onFileUpload = (event) => {
    event.preventDefault();
    console.log("실행!@#!#@!@#@!#!@");
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    setImageUrl(file);
    console.log("imageUrl");
    console.log(imageUrl);
    console.log("imageUrl");
    console.log("imageUrl");
    console.log(imageUrl);
    console.log(imageUrl);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      wk_image_path: imageUrl,
    });
  }, [imageUrl]);

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
      wk_id: null,
      wk_index: null,
      wk_name: "",
      wk_phone: "",
      wk_position: "",
      wk_nation: "",
      wk_birth: "1980.01.01",
      wk_blood_type: null,
      wk_blood_group: "0",
      wk_sms_yn: false,
      wk_image_path: "",
      co_index: null,
      co_name: null,
      bc_index: null,
      bc_address: null,
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((worker) => worker.wk_id === selectedId);

      setSelectedRow({
        selectedId: findItem.wk_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        wk_id: findItem.wk_id,
        wk_index: findItem.wk_index,
        wk_name: findItem.wk_name,
        wk_phone: findItem.wk_phone,
        wk_position: findItem.wk_position,
        wk_nation: findItem.wk_nation,
        wk_birth: findItem.wk_birth,
        wk_blood_type: findItem.wk_blood_type,
        wk_blood_group: findItem.wk_blood_group,
        wk_sms_yn: findItem.wk_sms_yn,
        wk_image_path: findItem.wk_image_path,
        co_index: findItem.co_index,
        co_name: findItem.co_name,
        bc_index: findItem.bc_index,
        bc_address: findItem.bc_address,
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

  const [companyError, setCompanyError] = useState(undefined);
  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    const calAge = (birth) => {
      let currentYear = today.getFullYear();
      let age = currentYear - birth.substring(0, 4) + 1;
      return age;
    };

    let age = calAge(formData.wk_birth);

    if (age > 100 || age < 17) {
      setFormData({
        ...formData,
        wk_birth: "1980.01.01",
      });
    } else if (!formData.co_index) {
      setCompanyError({
        content: "소속사를 선택해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setCompanyError(undefined);
      }, 1500);
    } else {
      let newWorker = { ...formData };
      dispatch(postWorker(newWorker));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    // let filteredData = data.filter((item) => item.bc_id !== formData.bc_id);
    // 중복값 검사를 위해 자기 자신을 뺀 데이터 값.

    const calAge = (birth) => {
      let currentYear = today.getFullYear();
      let age = currentYear - formData.wk_birth.substring(0, 4) + 1;
      return age;
    };

    let age = calAge(formData.wk_birth);

    if (age > 100 || age < 17) {
      setFormData({
        ...formData,
        wk_birth: "1980.01.01",
      });
    } else if (!formData.co_index) {
      setCompanyError({
        content: "소속사를 선택해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setCompanyError(undefined);
      }, 1500);
    } else {
      let newWorker = { ...formData };
      dispatch(putWorker(newWorker.wk_index, newWorker));
      initActiveRow();
      initFormData();
    }
  };

  // DELETE
  const deleteHandler = (e, wk_id) => {
    dispatch(deleteWorker(wk_id));
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
          <WorkerInput
            className="worker-input-box"
            onChange={onChange}
            onSelectChange={onSelectChange}
            onChangeDate={onChangeDate}
            onFileUpload={onFileUpload}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
            companyList={companyList}
            unUsedBeaconList={unUsedBeaconList}
            companyError={companyError}
          />
        </div>
        <div className="table-box">
          {data && (
            <WorkerTable
              className="worker-table-box"
              pageInfo={pageInfo}
              data={data}
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
              companyData={companyData}
              companyList={companyList}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default WorkerContatiner;
