import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import BeaconInput from "../../components/general/BeaconInput";
import BeaconTable from "../../components/general/BeaconTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getBeacons,
  postBeacon,
  deleteBeacon,
  putBeacon,
} from "../../modules/beacons";

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
    (state) => state.beacons.beacons
  );

  const [addressError, setAddressError] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBeacons());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    bc_address: "",
    description: "",
  });

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
      bc_address: "",
      description: "",
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((beacon) => beacon.bc_id === selectedId);

      setSelectedRow({
        selectedId: findItem.bc_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        bc_id: findItem.bc_id,
        bc_index: findItem.bc_index,
        bc_address: findItem.bc_address,
        description: findItem.description,
      });
    }
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

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    let _bc_address = formData.bc_address.replace(/\:/g, "");
    _bc_address = _bc_address.substring(0, 10); // 입력된 글자수 10자리 맞추기
    if (_bc_address.length !== 10) {
      // 자리수 유효성 검사
      setAddressError({
        content: "비콘 번호 10자리를 모두 입력해주세요.",
      });
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else if (data.find((item) => item.bc_address === _bc_address)) {
      // 중복 유효성 검사
      setAddressError({
        content: "이미 동일한 주소의 비콘이 있습니다.",
      });
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else {
      // 성공
      let newBeacon = {
        ...formData,
        bc_address: _bc_address,
      };
      dispatch(postBeacon(newBeacon));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    let _bc_address = formData.bc_address.replace(/\:/g, "");
    _bc_address = _bc_address.substring(0, 10); // 입력된 글자수 10자리 맞추기

    let filteredData = data.filter((item) => item.bc_id !== formData.bc_id);
    // 중복값 검사를 위해 자기 자신을 뺀 데이터 값.

    if (_bc_address.length !== 10) {
      // 자리수 유효성 검사
      setAddressError({
        content: "비콘 번호 10자리를 모두 입력해주세요.",
      });
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else if (filteredData.find((item) => item.bc_address === _bc_address)) {
      //중복 유효성 검사
      // 중복 에러
      setAddressError({
        content: "이미 동일한 주소의 비콘이 있습니다.",
      });
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;
      const now = new Date();
      let newBeacon = {
        ...formData,
        bc_address: _bc_address,
        created_date: findItem.created_date,
        modified_date: now,
        bc_used_type: findItem.bc_used_type,
        battery_remain: findItem.battery_remain,
        battery_time: findItem.battery_time,
        sc_group: findItem.sc_group,
        bc_receive_time: findItem.bc_receive_time,
        bc_input_time: findItem.bc_input_time,
        bc_out_time: findItem.bc_out_time,
        bc_pos_x: findItem.bc_pos_x,
        bc_emergency: findItem.bc_emergency,
        wk_id: findItem.wk_id,
        wk_name: findItem.wk_name,
        vh_id: findItem.vh_id,
        vh_index: findItem.vh_index,
        vh_name: findItem.vh_name,
      };
      console.log(newBeacon);
      console.log(newBeacon);
      console.log("newBeacon");
      console.log("newBeacon");
      console.log("newBeacon");
      console.log(newBeacon);
      dispatch(putBeacon(newBeacon.bc_index, newBeacon));
      initActiveRow();
      initFormData();
    }
  };

  // DELETE
  const deleteHandler = (e, bc_id) => {
    dispatch(deleteBeacon(bc_id));
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
          <BeaconInput
            className="beacon-input-box"
            onChange={onChange}
            formData={formData}
            // splitedAddress={splitedAddress}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
            addressError={addressError}
          />
        </div>
        <div className="table-box">
          {data && (
            <BeaconTable
              className="beacon-table-box"
              pageInfo={pageInfo}
              data={data}
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default WorkerContatiner;
