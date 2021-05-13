import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Form, Button, Radio, Input } from "semantic-ui-react";

const InputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;

  .ui.input > input {
    /* ui focus 색상변경 */
    &:focus {
      border-color: #f1592a !important;
    }
  }
  .ui.dropdown {
    &:focus {
      border-color: #f1592a !important;
    }
  }
  .ui.selection.active.dropdown .menu {
    border-color: #f1592a !important;
  }
  .ui.dropdown .menu > .item {
    /* border-color: #f1592a !important; */
  }
  .ui.checkbox input:focus ~ label:before {
    border-color: #f1592a !important;
    /* ui focus 색상변경 끝 */
  }

  .subtitle {
    font-family: "NotoSansKR-Medium";
    font-size: 16px;
    text-align: left;
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
    margin: 0px;
    padding: 0px;
  }

  .input-form-body {
    margin-top: 20px;
    .resizable-area {
      height: 738px;
      @media screen and (max-height: 970px) {
        height: 68vh;
      }
      &::-webkit-scrollbar {
        display: none;
      }
      overflow: auto;
      @media screen and (max-height: 970px) {
        height: 67.5vh;
      }
      .form-title.time {
        margin: 8px;
      }
      .input-form.time {
        width: 160px !important;
      }
      .input-form {
        font-family: "NotoSansKR-Regular";
        font-size: 14px;
        text-align: left;
        letter-spacing: 0px;
        color: #929292;
        opacity: 1;
        &.title {
          color: #2e2e2e;
        }
      }
      .role-area {
        height: 50px;
        margin-bottom: 10px;
        .radio-row {
          margin: 10px;
          margin-left: 5px;
          &.two {
            margin-left: 15px;
          }
        }
      }
    }
  }

  .ui.form textarea {
    &:focus {
      border-color: #f1592a !important;
      color: black;
    }
  }

  .label,
  .ui.form .field > label,
  .form-title {
    margin-left: 5px;
    font-family: "NotoSansKR-Medium" !important;
    color: #2e2e2e;
    font-size: 14px !important;
    letter-spacing: 0px;
    opacity: 1;
    font-weight: initial !important;
  }

  // 드롭다운 버튼
  .ui.dropdown > .dropdown.icon,
  &:before,
  &:after {
    top: 22px;
    right: 27px;
    font-size: 20px;
    color: #2e2e2e !important;
    opacity: 0.8;
    padding: 0px;
  }

  .ui.form .required.field > label:after {
    content: "" !important;
  }

  .input-form.description {
    height: 105px !important;
    color: black !important;
  }

  .submit-button {
    width: 324px;
    height: 50px;
    background-color: #f1592f;
    border: 1px solid #d8d8d8;
    opacity: 1;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    position: absolute;
    top: 70.1vh;
    @media screen and (max-height: 970px) {
      top: 68vh;
    }
  }

  .modify-button {
    width: 324px;
    height: 50px;
    background-color: #f1592f;
    border: 1px solid #d8d8d8;
    opacity: 1;
    letter-spacing: 0px;
    color: #ffffff;
    position: absolute;
    top: 70.1vh;
    @media screen and (max-height: 970px) {
      top: 68vh;
    }
  }
  .ui.form .field .prompt.label {
    //에러 색상
    display: none;
  }
`;
const InputError = styled.div`
  margin-bottom: -4px;
  margin-top: -15px;
  font-family: "NotoSansKR-Regular";
  font-size: 13px;
  text-align: left;
  letter-spacing: 0.65px;
  color: #ff0000;
  opacity: 1;
`;

const SettingsInput = ({
  onChange,
  onRadioChange,
  formData,
  createHandler,
}) => {
  const {
    acc_id,
    created_date,
    modified_date,
    acc_name,
    acc_user_id,
    acc_password,
    acc_password_check,
    acc_salt,
    acc_phone,
    acc_tel,
    acc_mail,
    acc_role,
    description,
  } = formData;

  return (
    <InputCompo className="input-compo">
      <p className="subtitle">환경설정</p>
      <Form
        className="input-form-body"
        onSubmit={(e) => {
          createHandler(e);
        }}
      >
        <div className="resizable-area">
          <Form.Input
            label="주소등록(날씨조회)"
            className="input-form address"
            id="address"
            name="address"
            placeholder="주소를 검색해주세요."
            required
            value={acc_name && acc_name}
            onChange={onChange}
          />
          <div className="role-area">
            <div className="form-title role">작업공정 표시</div>
            <Radio
              label="사용"
              className="radio-row one"
              id="admin"
              name="radioGroup"
              value={1}
              checked={acc_role && acc_role === 1}
              onChange={(e, target) => onRadioChange(e, target)}
            />
            <Radio
              label="미사용"
              className="radio-row two"
              id="user"
              name="radioGroup"
              value={2}
              checked={acc_role && acc_role === 2}
              onChange={(e, target) => onRadioChange(e, target)}
            />
          </div>
          <div className="time-area">
            <div className="form-title time">공지사항 (Slider Time)</div>
            <Input
              label={{ basic: true, content: "초" }}
              labelPosition="right"
              className="input-form time"
              id="scn_pos_x"
              name="scn_pos_x"
              placeholder="슬라이더 시간"
              required
              // value={scn_pos_x && addComma(scn_pos_x)}
              onChange={onChange}
            />
          </div>
        </div>

        <Button
          className="modify-button"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          저장
        </Button>
      </Form>
    </InputCompo>
  );
};

export default SettingsInput;
