import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../lib/server.config";
import styled from "styled-components";
import AccountInput from "../../components/account/AccountInput";
import AccountTable from "../../components/account/AccountTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccounts,
  postAccount,
  deleteAccount,
  putAccount,
} from "../../modules/accounts";

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
  // 목차
  // [ Redux Area ]
  // [ State Area ]
  // [ Init Area ]
  // [ Common Logic Area ]
  // [ Change Area ]
  // [ Click Area ]
  // [ Create Area ]
  // [ Update Area ]
  // [ Delete Area ]
  // [ Components Area ]

  // [ Redux Area ] =====================================================
  const { data, loading, error } = useSelector(
    (state) => state.accounts.accounts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  // [ State Area ] ======================================================

  const today = new Date();

  const [idError, setIdError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [passwordCheckError, setPasswordCheckError] = useState(undefined);
  const [duplicationCheck, setDuplicationCheck] = useState(true);

  const [categorieValue, setCategorieValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentData, setCurrentData] = useState([]);

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
    acc_description: "",
  });

  // [ Init Area ] ======================================================

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
      acc_description: "",
    });
  };

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
    });
  };

  //  [ Common Logic Area ] =====================================================

  const duplicationCheckHandler = async () => {
    let auth = false;
    try {
      const response = await axios.post(
        `${API}/api/account/doublecheck/`,
        formData
      );
      auth = response.data.auth;
    } catch (e) {
      // console.log("중복확인 서버 통신 에러");
    }
    if (formData.acc_user_id === "" || !formData.acc_user_id) {
      setDuplicationCheck(false);
      setIdError("*아이디를 입력해주세요.");
      setTimeout(() => {
        setIdError(undefined);
      }, 1350);
    } else if (!auth) {
      setDuplicationCheck(false);
      setIdError("*사용할 수 없는 아이디 입니다.");
      setTimeout(() => {
        setIdError(undefined);
      }, 1350);
    } else {
      setDuplicationCheck(true);
    }
    if (selectedRow && selectedRow.selectedId) {
      data.find((el) => el.acc_id === selectedRow.selectedId).acc_user_id ===
        formData.acc_user_id && setDuplicationCheck(true);
      setIdError(undefined);
    }
  };

  const onSearch = (e) => {
    const _data = data;
    let tempData = [];
    if (!searchValue) {
      dispatch(getAccounts());
    }
    if (categorieValue === null) {
      // 전체검색
      tempData = _data.filter((item) => item.acc_user_id.includes(searchValue));
      setCurrentData(tempData);
    } else {
      // 검색
      tempData = _data.filter((item) => item.acc_role === categorieValue);
      tempData = tempData.filter((item) =>
        item.acc_user_id.includes(searchValue)
      );
      setCurrentData(tempData);
    }
    initActiveRow();
    initFormData();
    initPage();
  };

  const roleStrReturn = (role) => {
    let str = "";
    if (role === 2) {
      str = "사용자";
    } else {
      str = "관리자";
    }
    return str;
  };

  useEffect(() => {
    let _data = data;
    setCurrentData(_data);
  }, [data]);

  // [ Change Area ] =====================================================

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // 입력값 state 에 저장
    if (name === "acc_user_id") {
      let _acc_user_id = value.replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, "");
      setFormData({
        ...formData,
        acc_user_id: _acc_user_id,
      });
    } else if (name === "acc_name") {
      let _acc_name = value.replace(/[^a-z|^A-Z|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g, "");
      setFormData({
        ...formData,
        acc_name: _acc_name,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onRadioChange = (e, target) => {
    let _acc_role = target.value;

    setFormData({
      ...formData,
      acc_role: _acc_role,
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

  const onChangeCategorie = (e, value) => {
    const _value = value.value;
    setCategorieValue(_value);
  };

  const onSearchChange = (e) => {
    const _searchValue = e.target.value;
    setSearchValue(_searchValue);
  };
  // [ Click Area ] =====================================================

  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
      setDuplicationCheck(false);
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
        acc_phone: findItem.acc_phone,
        acc_tel: findItem.acc_tel,
        acc_mail: findItem.acc_mail,
        acc_role: findItem.acc_role,
        acc_description: findItem.acc_description,
      });
      setTimeout(() => {
        setDuplicationCheck(true);
      }, 10);
    }
  };

  // [ Create Area ] =====================================================

  const createHandler = (e) => {
    e.preventDefault();
    if (!duplicationCheck) {
      setIdError("*중복 확인을 먼저 해주세요.");
      setTimeout(() => {
        setIdError(undefined);
      }, 1350);
    } else if (formData.acc_password_check !== formData.acc_password) {
      setPasswordCheckError("*비밀번호가 일치하지 않습니다.");
      setTimeout(() => {
        setPasswordCheckError(undefined);
      }, 1350);
    } else if (formData.acc_password.length < 4) {
      setPasswordError("*비밀번호는 4자리 이상이어야 합니다.");
      setTimeout(() => {
        setPasswordError(undefined);
      }, 1350);
    } else {
      let newAccount = {
        ...formData,
      };
      dispatch(postAccount(newAccount));
      initActiveRow();
      initFormData();
    }
  };

  // [ Update Area ] =====================================================

  const updateHandler = (e) => {
    if (!duplicationCheck) {
      setIdError("*중복 확인을 먼저 해주세요.");
      setTimeout(() => {
        setIdError(undefined);
      }, 1350);
    } else if (formData.acc_password_check !== formData.acc_password) {
      setPasswordCheckError("*비밀번호가 일치하지 않습니다.");
      setTimeout(() => {
        setPasswordCheckError(undefined);
      }, 1350);
    } else if (formData.acc_password.length < 4) {
      setPasswordError("*비밀번호는 4자리 이상이어야 합니다.");
      setTimeout(() => {
        setPasswordError(undefined);
      }, 1350);
    } else {
      const findItem = selectedRow.selectedItem;
      let newAccount = {
        ...formData,
      };
      dispatch(putAccount(formData.acc_id, newAccount));
    }
  };

  // [ Delete Area ] =====================================================

  const deleteHandler = (e, acc_id) => {
    dispatch(deleteAccount(acc_id));
    initActiveRow();
    initFormData();
  };

  // [ Componets Area ] =====================================================

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
          {data && currentData && (
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
              initPage={initPage}
              onSearch={onSearch}
              roleStrReturn={roleStrReturn}
              categorieValue={categorieValue}
              searchValue={searchValue}
              currentData={currentData}
              onChangeCategorie={onChangeCategorie}
              onSearchChange={onSearchChange}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default AccountContatiner;
