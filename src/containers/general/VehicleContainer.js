import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import VehicleInput from "../../components/general/VehicleInput";
import VehicleTable from "../../components/general/VehicleTable";
import { useDispatch, useSelector } from "react-redux";
import { getUnUsedBeacons } from "../../modules/beacons";
import { getCompanies } from "../../modules/companies";
import {
  getVehicles,
  postVehicle,
  putVehicle,
  deleteVehicle,
} from "../../modules/vehicles";

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

const VehicleContainer = () => {
  const { data, loading, error } = useSelector(
    (state) => state.vehicles.vehicles
  );
  const companyData = useSelector((state) => state.companies.companies.data);
  const unUsedBeaconData = useSelector((state) => state.beacons.beacons.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnUsedBeacons());
    dispatch(getCompanies());
    dispatch(getVehicles());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    vh_id: null,
    vh_index: null,
    created_date: null,
    modified_date: null,
    vh_name: "",
    vh_number: "",
    vh_image: "",
    vh_io_state: null,
    description: "",
    co_id: null,
    co_index: null,
    co_name: null,
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
    const name = seletedValue.name;
    const value = seletedValue.value;

    if (name === "bc_index") {
      const findBeacon = seletedValue.options.find((el) => el.value === value);
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

  // 사진 업로드

  const [files, setFiles] = useState({
    selectFile: null,
  });

  const initFiles = () => {
    setFiles({
      selectFile: null,
    });
  };

  const handleFileInputChange = (e) => {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log("set file!!");
    console.log(files);
    console.log("e.target.files[0]");
    console.log(e.target.files[0]);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    setFiles({
      selectFile: e.target.files[0],
    });
  };

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (files.selectFile) {
      setFileName(" ");
      files.selectFile.name && files.selectFile.name.length > 25
        ? setFileName(fileName.toString().substring(0, 25) + "...")
        : setFileName(files.selectFile.name.toString());
    } else {
      setFileName("사진을 등록해 주세요.(jpg, png, gif)");
    }
  }, [handleFileInputChange]);

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
      vh_id: null,
      vh_index: null,
      created_date: null,
      modified_date: null,
      vh_name: "",
      vh_number: "",
      description: "",
      vh_image: "",
      vh_io_state: null,
      co_id: null,
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
      const findItem = data.find((vehicle) => vehicle.vh_id === selectedId);

      setSelectedRow({
        selectedId: findItem.vh_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        vh_id: findItem.vh_id,
        vh_index: findItem.vh_index,
        vh_name: findItem.vh_name,
        vh_number: findItem.vh_name,
        vh_image: findItem.vh_image,
        co_id: findItem.co_id,
        co_index: findItem.co_index,
        co_name: findItem.co_name,
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
  };

  const today = new Date();

  const [companyError, setCompanyError] = useState(undefined);
  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    if (!formData.co_index) {
      setCompanyError({
        content: "소속사를 선택해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setCompanyError(undefined);
      }, 1500);
    } else {
      const createData = new FormData();
      createData.append("file", files.selectFile);
      createData.append("reqBody", JSON.stringify(formData));
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log("createData!!");
      console.log(createData);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      dispatch(postVehicle(createData));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();
    if (!formData.co_index) {
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
      setFormData({
        ...formData,
        vh_io_state: findItem.vh_io_state,
        created_date: findItem.created_date,
        modified_date: today,
      });
      const putData = new FormData();
      putData.append("file", files.selectFile);
      putData.append("reqBody", JSON.stringify(formData));
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log("putData!!");
      console.log(putData);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      dispatch(putVehicle(formData.vh_index, putData));
      initActiveRow();
      initFormData();
    }
  };

  // DELETE
  const deleteHandler = (e, vh_id) => {
    dispatch(deleteVehicle(vh_id));
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
          <VehicleInput
            className="vehicle-input-box"
            onChange={onChange}
            onSelectChange={onSelectChange}
            handleFileInputChange={handleFileInputChange}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
            companyList={companyList}
            unUsedBeaconList={unUsedBeaconList}
            companyError={companyError}
            fileName={fileName}
          />
        </div>
        <div className="table-box">
          {data && (
            <VehicleTable
              className="vehicle-table-box"
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

export default VehicleContainer;
