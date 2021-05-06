import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CctvInput from "../../components/general/CctvInput";
import CctvTable from "../../components/general/CctvTable";
import { useDispatch, useSelector } from "react-redux";
import { getLocals } from "../../modules/locals";
import { getCctvs, postCctv, putCctv, deleteCctv } from "../../modules/cctvs";

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

const CctvContainer = () => {
  const { data, loading, error } = useSelector((state) => state.cctvs.cctvs);
  const localData = useSelector((state) => state.locals.locals.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocals());
    dispatch(getCctvs());
  }, [dispatch]);

  console.log(data);

  const [formData, setFormData] = useState({
    cctv_id: null,
    cctv_index: null,
    created_date: null,
    modified_date: null,
    cctv_name: "",
    cctv_pos_x: "",
    cctv_user_id: "",
    cctv_pw: "",
    cctv_ip: "",
    cctv_port: "",
    local_index: null,
    cctv_number: 1,
    description: "",
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

  // form onSelectChant Event
  const onSelectChange = (e, seletedValue) => {
    const name = seletedValue.name;
    const value = seletedValue.value;

    setFormData({
      ...formData,
      [name]: value,
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
      cctv_id: null,
      cctv_index: null,
      created_date: null,
      modified_date: null,
      cctv_name: "",
      cctv_pos_x: "",
      cctv_user_id: "",
      cctv_pw: "",
      cctv_ip: "",
      cctv_port: "",
      local_index: null,
      cctv_number: 1,
      description: "",
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((cctv) => cctv.cctv_id === selectedId);

      setSelectedRow({
        selectedId: findItem.cctv_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        cctv_id: findItem.cctv_id,
        cctv_index: findItem.cctv_index,
        cctv_name: findItem.cctv_name,
        cctv_pos_x: findItem.cctv_pos_x,
        cctv_user_id: findItem.cctv_user_id,
        cctv_pw: findItem.cctv_pw,
        cctv_ip: findItem.cctv_ip,
        cctv_port: findItem.cctv_port,
        local_index: findItem.local_index,
        cctv_number: 1,
        description: findItem.description,
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
  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
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

  const today = new Date();

  const [localError, setLocalError] = useState(undefined);

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    let _cctv_pos_x = minusComma(formData.cctv_pos_x);

    if (!formData.local_index) {
      setLocalError("*노선을 선택해 주세요.");
      setTimeout(() => {
        setLocalError(undefined);
      }, 1350);
    } else {
      let newCctv = {
        ...formData,
        cctv_pos_x: _cctv_pos_x,
      };
      dispatch(postCctv(newCctv));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();

    let _cctv_pos_x = minusComma(formData.cctv_pos_x);

    if (!formData.local_index) {
      setLocalError({
        content: "*노선을 선택해 주세요.",
        pointing: "below",
      });
      setTimeout(() => {
        setLocalError(undefined);
      }, 1500);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;

      let newCctv = {
        ...formData,
        cctv_pos_x: _cctv_pos_x,
        created_date: findItem.created_date,
        modified_date: today,
      };
      dispatch(putCctv(newCctv.cctv_index, newCctv));
    }
  };

  // DELETE
  const deleteHandler = (e, cctv_id) => {
    dispatch(deleteCctv(cctv_id));
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
          <CctvInput
            className="cctv-input-box"
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
            addComma={addComma}
          />
        </div>
        <div className="table-box">
          {data && (
            <CctvTable
              className="cctv-table-box"
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
              addZero={addZero}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default CctvContainer;
