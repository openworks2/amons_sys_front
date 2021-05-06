import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AccountInput from "../../components/account/AccountInput";
import AccountTable from "../../components/account/AccountTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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

const AccountContatiner = () => {
  // const { data, loading, error } = useSelector(
  //   (state) => state.workers.workers
  // );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getWorkers());
  // }, [dispatch]);

  const data = [];

  const today = new Date();

  const [formData, setFormData] = useState({
    acc_id: null,
    created_date: null,
    modified_date: null,
    acc_name: "",
    acc_user_id: "",
    acc_password: "",
    acc_password_check: "",
    acc_salt: null,
    acc_phone: "",
    acc_tel: "",
    acc_mail: "",
    acc_role: 2,
    description: "",
  });

  useEffect(() => {
    console.log("$$$$$$$change!");
    console.log(formData);
    console.log("$$$$$$$change!");
  }, [formData]);

  // form onChange Event
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // 입력값 state 에 저장
    if (name === "acc_user_id") {
      let _acc_user_id = value.replace(/[^a-z|^A-Z|^0-9]*$/g, "");
      setFormData({
        ...formData,
        acc_user_id: _acc_user_id,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onRadioChange = (e, target) => {
    console.log(target.value);

    let _acc_role = target.value;

    setFormData({
      ...formData,
      acc_role: _acc_role,
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
      acc_id: null,
      created_date: null,
      modified_date: null,
      acc_name: "",
      acc_user_id: "",
      acc_password: "",
      acc_password_check: "",
      acc_salt: null,
      acc_phone: "",
      acc_tel: "",
      acc_mail: "",
      acc_role: 2,
      description: "",
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((account) => account.acc_id === selectedId);

      setSelectedRow({
        selectedId: findItem.acc_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        acc_id: findItem.acc_id,
        created_date: findItem.created_date,
        modified_date: findItem.modified_date,
        acc_name: findItem.acc_name,
        acc_user_id: findItem.acc_user_id,
        acc_password: findItem.acc_password,
        acc_password_check: findItem.acc_password,
        acc_salt: findItem.acc_salt,
        acc_phone: findItem.acc_phone,
        acc_tel: findItem.acc_tel,
        acc_mail: findItem.acc_mail,
        acc_role: findItem.acc_role,
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

  const [idError, setIdError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [passwordCheckError, setPasswordCheckError] = useState(undefined);
  const [duplicationCheck, setDuplicationCheck] = useState(true);

  const duplicationCheckHandler = () => {
    let _data = data;

    // 아이디 수정 시, 자기자신을 제외한 필터
    if (selectedRow.selectedId) {
      _data = _data.filter((el) => el.acc_id !== formData.acc_id);
    }

    if (formData.acc_user_id === "" || !formData.acc_user_id) {
      setDuplicationCheck(false);
      setIdError("*아이디를 입력해주세요.");
      setTimeout(() => {
        setIdError(undefined);
      }, 1350);
    } else if (_data.find((el) => el.acc_user_id === formData.acc_user_id)) {
      setDuplicationCheck(false);
      setIdError("*사용할 수 없는 아이디 입니다.");
      setTimeout(() => {
        setIdError(undefined);
      }, 1350);
    } else {
      setDuplicationCheck(true);
    }
  };

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();
    if (!formData.co_index) {
      // setCompanyError("*소속사를 선택해 주세요.");
      setTimeout(() => {
        // setCompanyError(undefined);
      }, 1350);
    } else {
      const createData = new FormData();

      dispatch(postWorker(createData));
      initActiveRow();
      initFormData();
    }
  };

  // UPDATE
  const updateHandler = (e) => {
    // let filteredData = data.filter((item) => item.bc_id !== formData.bc_id);
    // 중복값 검사를 위해 자기 자신을 뺀 데이터 값.
    if (!formData.co_index) {
      // setCompanyError("*소속사를 선택해 주세요.");
      setTimeout(() => {
        // setCompanyError(undefined);
      }, 1350);
    } else {
      // 성공
      const findItem = selectedRow.selectedItem;
      setFormData({
        ...formData,
        wk_io_state: findItem.wk_io_state,
        created_date: findItem.wk_create_date,
        modified_date: today,
      });
      const putData = new FormData();

      dispatch(putWorker(formData.wk_index, putData));
    }
  };

  // DELETE
  const deleteHandler = (e, wk_id) => {
    dispatch(deleteWorker(wk_id));
    initActiveRow();
    initFormData();
  };

  // if (error) {
  //   return (
  //     <ErrMsg className="err-msg">
  //       통신 에러가 발생했습니다. 새로고침 버튼을 눌러보세요.
  //     </ErrMsg>
  //   );
  // }

  return (
    <ContentsCompo className="contents-compo">
      <ContentsBodyCompo className="contents-body-compo">
        <div className="input-box">
          <AccountInput
            className="account-input-box"
            onChange={onChange}
            onRadioChange={onRadioChange}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
            idError={idError}
            passwordError={passwordError}
            passwordCheckError={passwordCheckError}
            duplicationCheck={duplicationCheck}
            setDuplicationCheck={setDuplicationCheck}
            duplicationCheckHandler={duplicationCheckHandler}
          />
        </div>
        <div className="table-box">
          {data && (
            <AccountTable
              className="account-table-box"
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

export default AccountContatiner;
