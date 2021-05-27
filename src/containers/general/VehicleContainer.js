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
import moment, { now } from "moment";
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

const VehicleContainer = () => {
  // 목차
  // [ Redux Area ]
  // [ State Area ]
  // [ Init Area ]
  // [ Common Logic Area ]
  // [ Change Area ]
  // [ Click Area ]
  // [ File Upload Area ]
  // [ Create Area ]
  // [ Update Area ]
  // [ Delete Area ]
  // [ Componets Area ]

  // [ Redux Area ] ======================================================================

  const { data, loading, error } = useSelector(
    (state) => state.vehicles.vehicles
  );
  const companyData = useSelector((state) => state.companies.companies.data);
  const unUsedBeaconData = useSelector((state) => state.beacons.beacons.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicles());
    dispatch(getUnUsedBeacons());
    dispatch(getCompanies());
  }, []);

  // [ State Area ] ======================================================================

  const today = new Date();

  const [companyList, setCompanyList] = useState([]);
  const [companyError, setCompanyError] = useState(undefined);
  const [companySearchList, setCompanySearchList] = useState([]);
  const [unUsedBeaconList, setUnUsedBeaconList] = useState([]);
  const [files, setFiles] = useState({
    selectFile: null,
  });
  const [fileName, setFileName] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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

  // [ Init Area ] ======================================================================

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
    });
  };

  const initFiles = () => {
    setFiles({
      selectFile: null,
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

  // [ Common Logic Area ] ======================================================================

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

  useEffect(() => {
    makeCompanyList(companyData);
  }, [companyData]);

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

  useEffect(() => {
    makeBeaconList(unUsedBeaconData);
  }, [unUsedBeaconData]);

  const makeBeaconList = (data) => {
    if (data) {
      let _unUsedBeaconList = [];
      _unUsedBeaconList.push({
        key: "unUsedBeaconList0",
        text: "할당 없음",
        value: null,
      });
      data.map((item, index) => {
        _unUsedBeaconList.push({
          key: "unUsedBeaconList" + index,
          text: `${addZero(item.bc_id, 3)} : 
          ${splitByColonInput(item.bc_address)}`,
          value: item.bc_index,
          address: item.bc_address,
          bc_id: item.bc_id,
        });
      });
      setUnUsedBeaconList(_unUsedBeaconList);
    }
  };

  const makeBeaconListOnCreate = () => {
    if (formData.bc_index) {
      let _unUsedBeaconList = unUsedBeaconList.filter(
        (el) => el.value !== formData.bc_index
      );
      setUnUsedBeaconList(_unUsedBeaconList);
    }
  };

  const makeBeaconListOnUpdate = () => {
    let originalVehicle = data.find((el) => el.vh_index === formData.vh_index);
    let _unUsedBeaconList = unUsedBeaconList;
    // 1.이전 값과 비교해서
    // 2.이전 값과 현재 값이 다르다면(변경되었다면),
    if (originalVehicle.bc_index !== formData.bc_index) {
      // 2-1.변경한 값이 NULL 이라면 (비콘 할당 해제)
      if (formData.bc_index === null) {
        // 2-1-1. 이전 값을 비콘 리스트에 추가.
        let unUsedBeacon = {
          key: now() + 1,
          text: `${addZero(originalVehicle.bc_id, 3)} : 
              ${splitByColonInput(originalVehicle.bc_address)}`,
          value: originalVehicle.bc_index,
          address: originalVehicle.bc_address,
          bc_id: originalVehicle.bc_id,
        };
        _unUsedBeaconList.push(unUsedBeacon);
        setUnUsedBeaconList(_unUsedBeaconList);
      }
      // 2-2.변경한 값이 NULL 이 아니라면 (할당 비콘 변경)
      else {
        // 2-2-1. 바뀐 값을 비콘 리스트에서 제거.
        _unUsedBeaconList = _unUsedBeaconList.filter(
          (el) => el.value !== formData.bc_index
        );
        setUnUsedBeaconList(_unUsedBeaconList);
        // 2-2-2. 이전 값이 NULL 이 아니라면 비콘 리스트에 추가.
        if (originalVehicle.bc_id) {
          let unUsedBeacon = {
            key: now() + 2,
            text: `${addZero(originalVehicle.bc_id, 3)} : 
                ${splitByColonInput(originalVehicle.bc_address)}`,
            value: originalVehicle.bc_index,
            address: originalVehicle.bc_address,
            bc_id: originalVehicle.bc_id,
          };
          _unUsedBeaconList.push(unUsedBeacon);
          setUnUsedBeaconList(_unUsedBeaconList);
        }
      }
    }
    // 이전 값과 이후 값이 동일한 경우 비콘 리스트는 바뀌지 않음.
  };

  const makeBeaconListOnDelete = () => {
    if (formData.bc_index !== null) {
      let _unUsedBeaconList = unUsedBeaconList;
      let unUsedBeacon = {
        key: now() + 1,
        text: `${addZero(formData.bc_id, 3)} : 
        ${splitByColonInput(formData.bc_address)}`,
        value: formData.bc_index,
        address: formData.bc_address,
        bc_id: formData.bc_id,
      };
      _unUsedBeaconList.push(unUsedBeacon);
      setUnUsedBeaconList(_unUsedBeaconList);
    }
  };

  // const makeBeaconListOnActive = () => {
  //   let _unUsedBeaconList = unUsedBeaconList;

  //   let unUsedBeacon = {
  //     key: now() + 1,
  //     text: `${addZero(formData.bc_id, 3)} :
  //       ${splitByColonInput(formData.bc_address)}`,
  //     value: formData.bc_index,
  //     address: formData.bc_address,
  //     bc_id: formData.bc_id,
  //   };
  //   _unUsedBeaconList.push(unUsedBeacon);
  //   setUnUsedBeaconList(_unUsedBeaconList);
  // };

  // const makeBeaconListOnDeactive = () => {
  //   let _unUsedBeaconList = unUsedBeaconList.filter(
  //     (el) => el.value !== formData.bc_index
  //   );
  //   setUnUsedBeaconList(_unUsedBeaconList);
  // };

  // useEffect(() => {
  //   // 비콘리스트 정렬
  //   if (unUsedBeaconList) {
  //     let _unUsedBeaconList = unUsedBeaconList.sort(function (a, b) {
  //       return a.bc_id - b.bc_id;
  //     });
  //     setUnUsedBeaconList(_unUsedBeaconList);
  //   }
  // }, [
  //   makeBeaconList,
  //   makeBeaconListOnCreate,
  //   makeBeaconListOnUpdate,
  //   makeBeaconListOnDelete,
  // ]);

  // [ Change Area ] ======================================================================

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

  // form onSelectChange Event
  const onSelectChange = (e, seletedValue) => {
    const name = seletedValue.name;
    const value = seletedValue.value;

    if (name === "bc_index") {
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
  };

  // 페이지 네이션
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
    initFiles();
    setImagePreview(null);
  };

  // [ Click Area ] ======================================================================

  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
      initFiles();
      setImagePreview(null);
      setPreviewOpen(false);
    } else {
      setImagePreview(null);
      setPreviewOpen(false);

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
        vh_number: findItem.vh_number,
        vh_image: findItem.vh_image,
        co_id: findItem.co_id,
        co_index: findItem.co_index,
        co_name: findItem.co_name,
        bc_id: findItem.bc_id,
        bc_index: findItem.bc_index,
        bc_address: findItem.bc_address,
        description: findItem.description,
      });
    }
  };

  // [ File Upload Area ] ======================================================================

  const handleFileInputChange = (e) => {
    let deletedImageForm = {
      ...formData,
      vh_image: null,
    };
    setFormData(deletedImageForm);
    setFiles({
      selectFile: e.target.files[0],
    });
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    if (theFile) {
      const reader = new FileReader();
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setImagePreview(result);
      };
    }
  };

  const imageDeleteHandler = (e) => {
    e.stopPropagation();
    initFiles();
    let deletedImageForm = {
      ...formData,
      vh_image: null,
    };
    setImagePreview(null);
    setFormData(deletedImageForm);
    setPreviewOpen(false);
  };

  // 가짜 input form 이미지 이름 바꾸기
  useEffect(() => {
    if (formData.vh_image) {
      let _filename = formData.vh_image.toString();
      _filename && _filename.length > 25
        ? setFileName(_filename.substring(0, 25) + "...")
        : setFileName(_filename);
    } else if (files.selectFile) {
      let _filename = files.selectFile.name.toString();
      _filename && _filename.length > 25
        ? setFileName(_filename.substring(0, 25) + "...")
        : setFileName(_filename);
    } else {
      setFileName(null);
    }
  }, [handleFileInputChange, activeHandler, files]);

  // [ Create Area ] ======================================================================

  const createHandler = (e) => {
    e.preventDefault();

    if (!formData.co_index) {
      setCompanyError("*소속사를 선택해 주세요.");
      setTimeout(() => {
        setCompanyError(undefined);
      }, 1350);
    } else {
      const createData = new FormData();
      createData.append("file", files.selectFile);
      createData.append("reqBody", JSON.stringify(formData));
      dispatch(postVehicle(createData));
      makeBeaconListOnCreate();
      initActiveRow();
      initFormData();
      initFiles();
      setImagePreview(null);
    }
  };

  // [ Update Area ] ======================================================================

  const updateHandler = (e) => {
    e.preventDefault();
    if (!formData.co_index) {
      setCompanyError("*소속사를 선택해 주세요.");
      setTimeout(() => {
        setCompanyError(undefined);
      }, 1350);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;
      setFormData({
        ...formData,
        vh_image: fileName,
        vh_io_state: findItem.vh_io_state,
        created_date: findItem.created_date,
        modified_date: today,
      });
      const putData = new FormData();
      putData.append("file", files.selectFile);
      putData.append("reqBody", JSON.stringify(formData));
      dispatch(putVehicle(formData.vh_index, putData));
      makeBeaconListOnUpdate();
    }
  };

  // [ Delete Area ] ======================================================================

  const deleteHandler = (e, vh_id) => {
    dispatch(deleteVehicle(vh_id));
    makeBeaconListOnDelete();
    initActiveRow();
    initFormData();
    initFiles();
    setImagePreview(null);
  };

  // [ Compoents Area ] ======================================================================

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
            imagePreview={imagePreview}
            previewOpen={previewOpen}
            setPreviewOpen={setPreviewOpen}
            imageDeleteHandler={imageDeleteHandler}
            addZero={addZero}
            splitByColonInput={splitByColonInput}
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
              initPage={initPage}
              companyData={companyData}
              companyList={companyList}
              companySearchList={companySearchList}
              addZero={addZero}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default VehicleContainer;
