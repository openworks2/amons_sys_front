import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SettingsInput from "../../components/ect/SettingsInput";
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

const SettingsContatiner = () => {
  const { data, loading, error } = useSelector(
    (state) => state.accounts.accounts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

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
    console.log(target.value);

    let _acc_role = target.value;

    setFormData({
      ...formData,
      acc_role: _acc_role,
    });
  };

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();
    let newAccount = {
      ...formData,
    };
    dispatch(postAccount(newAccount));
  };

  // UPDATE
  const updateHandler = (e) => {
    let newAccount = {
      ...formData,
    };
    dispatch(putAccount(formData.acc_id, newAccount));
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
          <SettingsInput
            className="settings-input-box"
            onChange={onChange}
            onRadioChange={onRadioChange}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
          />
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default SettingsContatiner;
