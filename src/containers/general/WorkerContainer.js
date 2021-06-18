import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import WorkerInput from "../../components/general/WorkerInput";
import WorkerTable from "../../components/general/WorkerTable";
import { useDispatch, useSelector } from "react-redux";
import { getUnUsedBeacons } from "../../modules/beacons";
import { getCompanies } from "../../modules/companies";
import { getSettings } from "../../modules/settings";
import {
  getWorkers,
  postWorker,
  deleteWorker,
  putWorker,
} from "../../modules/workers";
import moment, { now } from "moment";
import "moment/locale/ko";
import Compressor from "compressorjs";

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
  // [ Components Area ]

  // [ Redux Area ] ======================================================================

  const { data, loading, error } = useSelector(
    (state) => state.workers.workers
  );
  const companyData = useSelector((state) => state.companies.companies.data);
  const unUsedBeaconData = useSelector((state) => state.beacons.beacons.data);
  const settingsData = useSelector((state) => state.settings.settings.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkers());
    dispatch(getCompanies());
    dispatch(getUnUsedBeacons());
    dispatch(getSettings());
  }, [dispatch]);

  // [ State Area ] ======================================================================

  const today = new Date();

  const [companyList, setCompanyList] = useState([]);
  const [companySearchList, setCompanySearchList] = useState([]);
  const [unUsedBeaconList, setUnUsedBeaconList] = useState([]);
  // 실제 파일 데이터 저장
  const [files, setFiles] = useState({
    selectFile: null,
  });
  // input안에 들어갈 사진 이름
  const [fileName, setFileName] = useState("");
  // 미리보기 modal
  const [previewOpen, setPreviewOpen] = useState(false);
  // 현재 업로드 된 이미지 정보 (서버 말고 클라이언트 단)
  const [imagePreview, setImagePreview] = useState(null);

  const [companyError, setCompanyError] = useState(undefined);
  const [ageError, setAgeError] = useState(undefined);
  const [smsError, setSmsError] = useState(undefined);

  const [pageInfo, setPageInfo] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  // 클릭된 row의 데이터
  const [selectedRow, setSelectedRow] = useState({
    selectedId: null,
    selectedItem: undefined,
    clickedIndex: null,
  });

  const [defaultFormData, setDefaultFormData] = useState({
    wk_id: null,
    wk_index: null,
    wk_name: "",
    wk_phone: "",
    wk_position: "",
    wk_nation: "",
    wk_birth: today,
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
    image_file: null,
  });

  const [formData, setFormData] = useState(defaultFormData);

  // [ Init Area ] ======================================================================

  const initPage = useCallback(() => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
    });
  }, []);

  const initFiles = useCallback(() => {
    setFiles({
      selectFile: null,
    });
  }, []);

  const initActiveRow = useCallback(() => {
    setSelectedRow({
      selectedId: null,
      selectedItem: undefined,
      clickedIndex: null,
    });
  }, []);

  const initFormData = useCallback(() => {
    setFormData(defaultFormData);
  }, [defaultFormData]);

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
        key: "unUsedBeaconListNULL",
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
    let originalWorker = data.find((el) => el.wk_index === formData.wk_index);
    let _unUsedBeaconList = unUsedBeaconList;
    // 1.이전 값과 비교해서
    // 2.이전 값과 현재 값이 다르다면(변경되었다면),
    if (originalWorker.bc_index !== formData.bc_index) {
      // 2-1.변경한 값이 NULL 이라면 (비콘 할당 해제)
      if (formData.bc_index === null) {
        // 2-1-1. 이전 값을 비콘 리스트에 추가.
        let unUsedBeacon = {
          key: now() + 1,
          text: `${addZero(originalWorker.bc_id, 3)} : 
              ${splitByColonInput(originalWorker.bc_address)}`,
          value: originalWorker.bc_index,
          address: originalWorker.bc_address,
          bc_id: originalWorker.bc_id,
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
        if (originalWorker.bc_id) {
          let unUsedBeacon = {
            key: now() + 2,
            text: `${addZero(originalWorker.bc_id, 3)} : 
                ${splitByColonInput(originalWorker.bc_address)}`,
            value: originalWorker.bc_index,
            address: originalWorker.bc_address,
            bc_id: originalWorker.bc_id,
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

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSelectChange = (e, seletedValue) => {
    const name = seletedValue.name;
    const value = seletedValue.value;
    if (formData.wk_blood_type) {
      setFormData({ ...formData, wk_blood_type: 0 });
    }
    if (formData.wk_blood_group) {
      setFormData({ ...formData, wk_blood_group: 0 });
    }

    if (name === "wk_sms_yn") {
      let sms_limit = 10; // sms 수신가능 기본값 10명
      if (
        settingsData[0].sms_limit !== null ||
        settingsData[0].sms_limit !== undefined
      ) {
        sms_limit = settingsData[0].sms_limit;
      }
      let smsCount = 0;
      if (formData.wk_sms_yn) {
        setFormData({ ...formData, wk_sms_yn: 0 });
      } else {
        data.map((el) => {
          if (el.wk_sms_yn) {
            smsCount += 1;
          }
        });
        if (smsCount < sms_limit) {
          setFormData({
            ...formData,
            [name]: !value,
          });
        } else {
          setSmsError(
            `*비상알람은 최대 ${sms_limit} 명만 수신 할 수 있습니다.`
          );
          setTimeout(() => {
            setSmsError(undefined);
          }, 1350);
        }
      }
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
  };

  // datepicker
  const onChangeDate = (date) => {
    let _date = date;
    if (_date === null || undefined) {
      _date = today;
    }
    setFormData({
      ...formData,
      wk_birth: moment(_date).format("YYYY-MM-DD"),
    });
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

  const activeHandler = useCallback(
    (e, index, selectedId) => {
      if (index === selectedRow.clickedIndex) {
        initActiveRow();
        initFormData();
        initFiles();
        setImagePreview(null);
        setPreviewOpen(false);
      } else {
        setImagePreview(null);
        setPreviewOpen(false);

        const findItem = data.find((worker) => worker.wk_id === selectedId);

        setSelectedRow({
          selectedId: findItem.wk_id,
          selectedItem: findItem,
          clickedIndex: index,
        });

        setFormData({
          ...formData,
          ...findItem,
        });
      }
    },
    [
      data,
      formData,
      initActiveRow,
      initFiles,
      initFormData,
      selectedRow.clickedIndex,
    ]
  );

  // [ File Upload Area ] =================================================================

  const handleFileInputChange = useCallback(
    (e) => {
      try {
        let deletedImageForm = {
          ...formData,
          wk_image: null,
        };
        setFormData(deletedImageForm);
        let uploadImg = e.target.files[0];
        const isImg = () => {
          let type = uploadImg.type.toString();
          if (type.includes("image")) {
            return true;
          } else {
            alert("*이미지 파일만 등록할 수 있습니다.");
            return false;
          }
        };
        if (uploadImg && isImg()) {
          const resizedImg = document.createElement("img");
          resizedImg.src = URL.createObjectURL(uploadImg);
          // 이미지가 로드되면 canvas를 원하는 크기로 만들고 이미지를 그에 맞춰 그립니다.
          resizedImg.onload = () => {
            // alert(resizedImg.width); 원본 파일의 사이즈
            // alert(resizedImg.height); 원본 파일의 사이즈
            URL.revokeObjectURL(resizedImg.src);
            const per_width = (resizedImg.width / resizedImg.height) * 125;
            const canvas = document.createElement("canvas");
            canvas.width = per_width;
            canvas.height = 125;
            const context = canvas.getContext("2d");
            context.drawImage(resizedImg, 0, 0, per_width, 125);
            // canvas에 그려진 이미지를 Blob으로 만들고 다시 File로 만들어 배열에 저장합니다.
            context.canvas.toBlob(
              (newImageBlob) => {
                setFiles({
                  selectFile: new File([newImageBlob], uploadImg.name),
                });
              },
              "image/png",
              0.5
            );
            //미리보기
            const reader = new FileReader();
            reader.readAsDataURL(uploadImg);
            reader.onloadend = (finishedEvent) => {
              const {
                currentTarget: { result },
              } = finishedEvent;
              setImagePreview(result);
            };
          };
        }
      } catch (e) {
        console.log("handleFileInputChange", e);
      }
    },
    [formData]
  );

  const imageDeleteHandler = useCallback(
    (e) => {
      e.stopPropagation();
      initFiles();
      let deletedImageForm = {
        ...formData,
        wk_image: null,
      };
      setImagePreview(null);
      setFormData(deletedImageForm);
      setPreviewOpen(false);
    },
    [formData, initFiles]
  );

  // 가짜 input form 이미지 이름 바꾸기
  useEffect(() => {
    if (formData.wk_image) {
      let _filename = formData.wk_image.toString();
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
  }, [handleFileInputChange, activeHandler, files, formData.wk_image]);

  // [ Create Area ] ======================================================================

  const createHandler = (e) => {
    e.preventDefault();

    const calAge = (birth) => {
      let currentYear = today.getFullYear();
      let age = currentYear - birth.substring(0, 4) + 1;
      return age;
    };

    if (typeof formData.wk_birth !== "string") {
      setAgeError("*정확한 생년월일을 입력해주세요.");
      setTimeout(() => {
        setAgeError(undefined);
      }, 1350);
    } else if (
      calAge(formData.wk_birth) > 100 ||
      calAge(formData.wk_birth) < 17
    ) {
      setAgeError("*정확한 생년월일을 입력해주세요.");
      setTimeout(() => {
        setAgeError(undefined);
      }, 1350);
    } else if (!formData.co_index) {
      setCompanyError("*소속사를 선택해 주세요.");
      setTimeout(() => {
        setCompanyError(undefined);
      }, 1350);
    } else {
      const createData = new FormData();
      createData.append("file", files.selectFile);
      createData.append("reqBody", JSON.stringify(formData));
      dispatch(postWorker(createData));
      makeBeaconListOnCreate();
      initActiveRow();
      initFormData();
      initFiles();
      setImagePreview(null);
    }
  };

  // [ Update Area ] ======================================================================

  const updateHandler = (e) => {
    const calAge = (birth) => {
      let currentYear = today.getFullYear();
      let age = currentYear - birth.substring(0, 4) + 1;
      return age;
    };

    if (typeof formData.wk_birth !== "string") {
      setAgeError("*정확한 생년월일을 입력해주세요.");
      setTimeout(() => {
        setAgeError(undefined);
      }, 1350);
    } else if (
      calAge(formData.wk_birth) > 100 ||
      calAge(formData.wk_birth) < 17
    ) {
      setAgeError("*정확한 생년월일을 입력해주세요.");
      setTimeout(() => {
        setAgeError(undefined);
      }, 1350);
    } else if (!formData.co_index) {
      setCompanyError("*소속사를 선택해 주세요.");
      setTimeout(() => {
        setCompanyError(undefined);
      }, 1350);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;
      setFormData({
        ...formData,
        wk_io_state: findItem.wk_io_state,
        created_date: findItem.wk_create_date,
        modified_date: today,
        wk_image: fileName,
      });
      const putData = new FormData();
      putData.append("file", files.selectFile);
      putData.append("reqBody", JSON.stringify(formData));
      dispatch(putWorker(formData.wk_index, putData));
      makeBeaconListOnUpdate();
    }
  };

  // [ Delete Area ] ======================================================================

  const deleteHandler = (e, wk_id) => {
    dispatch(deleteWorker(wk_id));
    makeBeaconListOnDelete();
    initActiveRow();
    initFormData();
    initFiles();
    setImagePreview(null);
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
            ageError={ageError}
            smsError={smsError}
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

export default WorkerContatiner;
