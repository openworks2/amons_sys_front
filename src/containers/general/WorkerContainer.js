import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import WorkerInput from "../../components/general/WorkerInput";
import WorkerTable from "../../components/general/WorkerTable";
import { useDispatch, useSelector } from "react-redux";
import { getUnUsedBeacons } from "../../modules/beacons";
import { getCompanies } from "../../modules/companies";
import {
  getWorkers,
  postWorker,
  deleteWorker,
  putWorker,
} from "../../modules/workers";

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
    wk_blood_type: "0",
    wk_blood_group: "0",
    wk_sms_yn: false,
    wk_image: "",
    co_index: null,
    co_name: null,
    co_sector: null,
    bc_id: null,
    bc_index: null,
    bc_address: null,
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
  const [companySearchList, setCompanySearchList] = useState([]);
  const [unUsedBeaconList, setUnUsedBeaconList] = useState([]);

  const makeCompanyList = (data) => {
    if (data) {
      let _companyList = [];
      let _companySearchList = [];

      _companySearchList.push({
        key: "all",
        text: "소속사 전체",
        value: null,
      });

      data.map((item, index) => {
        _companyList.push({
          key: index,
          text: item.co_name,
          value: item.co_index,
        });
        _companySearchList.push({
          key: index,
          text: item.co_name,
          value: item.co_index,
        });
      });
      setCompanySearchList(_companySearchList);
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
          address: formData.bc_address,
        });
      }
      data.map((item, index) => {
        _unUsedBeaconList.push({
          key: index + 2,
          text: splitByColonInput(item.bc_address),
          value: item.bc_index,
          address: item.bc_address,
          bc_id: item.bc_id,
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
    console.log("*****************************");
    console.log(seletedValue.options);
    const name = seletedValue.name;
    const value = seletedValue.value;
    if (formData.wk_blood_type) {
      setFormData({ ...formData, wk_blood_type: 0 });
    }
    if (formData.wk_blood_group) {
      setFormData({ ...formData, wk_blood_group: 0 });
    }

    if (name === "wk_sms_yn") {
      setFormData({
        ...formData,
        [name]: !value,
      });
    } else if (name === "bc_index") {
      const findBeacon = seletedValue.options.find((el) => el.value === value);
      const address = findBeacon.address;
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
    if (!data) {
    } else if (data.length) {
      setFormData({
        ...formData,
        wk_birth: getFormatDate(date),
      });
    }
  };

  // 사진 업로드

  const [files, setFiles] = useState({
    file: null,
    base64URL: "",
  });

  const initFiles = () => {
    setFiles({
      file: null,
      base64URL: "",
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";

      // FileReader 생성
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    let { file } = files;
    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setFiles({
          file,
          base64URL: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setFiles({
      file: e.target.files[0],
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      wk_image: files.base64URL,
    });
    console.log("###################################################");
    console.log("###################################################");
    console.log(formData.wk_image);
    console.log(files);
    console.log(files.file);
    console.log(files.base64URL);
    console.log("###################################################");
    console.log("###################################################");
  }, [files]);

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
      wk_blood_type: "0",
      wk_blood_group: "0",
      wk_sms_yn: false,
      wk_image: "",
      co_index: null,
      co_name: null,
      co_sector: null,
      bc_id: null,
      bc_index: null,
      bc_address: null,
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
      initFiles();
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
        wk_image: findItem.wk_image,
        co_index: findItem.co_index,
        co_name: findItem.co_name,
        co_sector: findItem.co_sector,
        bc_id: findItem.bc_id,
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
    initFiles();
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
      initFiles();
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
      // 성공
      const findItem = selectedRow.selectedItem;
      console.log("qiopweujofiodifjaiefdjaowegfwaoiehgfawiuhe");
      console.log(formData);
      console.log("qiopweujofiodifjaiefdjaowegfwaoiehgfawiuhe");
      console.log("qiopweujofiodifjaiefdjaowegfwaoiehgfawiuhe");
      let newWorker = {
        ...formData,
        wk_io_state: findItem.wk_io_state,
        created_date: findItem.wk_create_date,
        modified_date: today,
      };
      dispatch(putWorker(newWorker.wk_index, newWorker));
      initActiveRow();
      initFormData();
      initFiles();
    }
  };

  // DELETE
  const deleteHandler = (e, wk_id) => {
    dispatch(deleteWorker(wk_id));
    initActiveRow();
    initFormData();
    initFiles();
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
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            handleFileInputChange={handleFileInputChange}
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
              companySearchList={companySearchList}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default WorkerContatiner;
