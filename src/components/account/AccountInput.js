import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import NumberFormat from "react-number-format";
import { Form, Button, Modal, Radio } from "semantic-ui-react";
import { FaExclamationCircle, FaCheck } from "react-icons/fa";

const InputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;

  .ui.form input,
  .ui.form .field .ui.input input {
    font-family: "NotoSansKR-Regular";
  }

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
      .form-title.phone {
        margin: 5px;
      }

      .input-form.mail {
        margin: 10px;
        margin-left: 0px;
        width: 322px;
      }
      .input-form.user-id {
        width: 180px;
        display: inline-block;
      }
      .input-form.user-id-passed {
        width: 180px;
        display: inline-block;
        #acc_user_id {
          border: 1px solid #f1592a;
          background-color: rgba(255, 255, 255, 0);
        }
      }
      #passed-icon {
        z-index: 1;
        float: left;
        margin-top: -40px;
        margin-left: 155px;
        color: #f1592a;
      }
      .duplication-check-button {
        margin-left: 10px;
        margin-top: -5px;
        padding: 7px;
        cursor: pointer;
        display: inline-block;
        color: #ffffff;
        font-family: "NotoSansKR-Regular";
        font-size: 14px;
        width: 132px;
        height: 38px;
        vertical-align: middle;
        text-align: center;
        background: #f1592a 0% 0% no-repeat padding-box;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        opacity: 1;
        &:hover {
          opacity: 0.9;
        }
        &.disabled {
          background: #d9d9d9 0% 0% no-repeat padding-box;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
  .phone {
    color: black !important;
    &:focus {
      border-color: #f1592a !important;
    }
  }
  .ui.form textarea {
    &:focus {
      border-color: #f1592a !important;
      color: black;
    }
  }
  #delete-icon {
    float: right;
    margin-top: -35px;
    margin-right: 10px;
    font-size: 25px !important;
    cursor: pointer;
    &:hover {
      color: red;
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
    resize: none;
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

const AccountInput = ({
  onChange,
  onRadioChange,
  formData,
  createHandler,
  updateHandler,
  selectedRow,
  initFormData,
  initActiveRow,
  idError,
  passwordError,
  passwordCheckError,
  duplicationCheck,
  setDuplicationCheck,
  duplicationCheckHandler,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
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
    acc_description,
  } = formData;

  // 중복확인 통과상태에서 아이디 값 바꿀 시 다시 중복확인 해야함.
  useEffect(() => {
    if (duplicationCheck) {
      setDuplicationCheck(false);
    }
  }, [acc_user_id]);

  return (
    <InputCompo className="input-compo">
      <p className="subtitle">계정 등록</p>
      <Form
        className="input-form-body"
        onSubmit={(e) => {
          !selectedItem && createHandler(e);
        }}
      >
        <div className="resizable-area">
          <div className="role-area">
            <div className="form-title role">계정 권한</div>
            {/* <Radio
              label="관리자"
              className="radio-row one"
              id="admin"
              name="radioGroup"
              value={1}
              checked={acc_role && acc_role === 1}
              onChange={(e, target) => onRadioChange(e, target)}
            /> */}
            <Radio
              label="사용자"
              className="radio-row two"
              id="user"
              name="radioGroup"
              value={2}
              checked={acc_role && acc_role === 2}
              onChange={(e, target) => onRadioChange(e, target)}
            />
          </div>
          <Form.Input
            label="이름"
            className="input-form name"
            id="acc_name"
            name="acc_name"
            placeholder="이름을 입력해주세요."
            required
            value={acc_name && acc_name}
            onChange={onChange}
            autocomplete="name"
          />
          <div className="id-area">
            {duplicationCheck ? (
              <Form.Input
                label="아이디"
                className="input-form user-id-passed"
                id="acc_user_id"
                name="acc_user_id"
                required
                placeholder="아이디를 입력해주세요."
                value={acc_user_id && acc_user_id}
                onChange={onChange}
              />
            ) : (
              <Form.Input
                label="아이디"
                className="input-form user-id"
                id="acc_user_id"
                name="acc_user_id"
                placeholder="아이디를 입력해주세요."
                required
                value={acc_user_id && acc_user_id}
                onChange={onChange}
              />
            )}
            {duplicationCheck ? (
              <div className="duplication-check-button disabled">중복 확인</div>
            ) : (
              <div
                className="duplication-check-button"
                onClick={duplicationCheckHandler}
              >
                중복 확인
              </div>
            )}

            {duplicationCheck && <FaCheck id="passed-icon" />}
            {idError && <InputError>{idError}</InputError>}
          </div>
          <Form.Input
            label="비밀번호"
            className="input-form password"
            id="acc_password"
            name="acc_password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            required
            value={acc_password && acc_password}
            onChange={onChange}
            autocomplete="new-password"
          />
          {passwordError && <InputError>{passwordError}</InputError>}
          <Form.Input
            label="비밀번호 확인"
            className="input-form password"
            id="acc_password_check"
            name="acc_password_check"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            required
            value={acc_password_check && acc_password_check}
            onChange={onChange}
            autocomplete="new-password"
          />
          {passwordCheckError && <InputError>{passwordCheckError}</InputError>}
          <div className="phone-area">
            <div className="form-title phone">핸드폰</div>
            <NumberFormat
              format="###-####-####"
              className="input-form phone"
              id="acc_phone"
              name="acc_phone"
              placeholder="번호를 입력해 주세요."
              required
              value={acc_phone && acc_phone}
              onChange={onChange}
            />
          </div>
          <Form.Input
            label="이메일"
            className="input-form mail"
            id="acc_mail"
            name="acc_mail"
            placeholder="이메일을 입력해주세요."
            required
            value={acc_mail && acc_mail}
            onChange={onChange}
          />
          <Form.Field className="dig-input-form description">
            <label className="input-form title">비고</label>
            <textarea
              className="input-form description"
              id="acc_description"
              name="acc_description"
              placeholder="비고 입력란"
              value={acc_description ? acc_description : ""}
              onChange={onChange}
            />
          </Form.Field>
        </div>
        {selectedItem ? (
          <Button
            className="modify-button"
            onClick={(e) => {
              e.stopPropagation();
              setModifyOpen(true);
            }}
          >
            수정
          </Button>
        ) : (
          <Button className="submit-button" type="submit">
            등록
          </Button>
        )}
      </Form>
      <Modal
        className="confirm-modal"
        onClose={() => setModifyOpen(false)}
        onOpen={() => setModifyOpen(true)}
        open={modifyOpen}
      >
        <Modal.Header className="confirm-modal header">수정</Modal.Header>
        <Modal.Content className="confirm-modal content">
          <Modal.Description className="confirm-modal description">
            <FaExclamationCircle className="confirm-modal warning-icon" />
            <p className="confirm-modal text">
              입력한 내용으로 수정하시겠습니까?
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className="confirm-modal actions">
          <Button
            className="confirm-modal button confirm"
            color="blue"
            content="수정"
            labelPosition="right"
            icon="checkmark"
            onClick={(e) => {
              updateHandler(e, selectedId);
              setModifyOpen(false);
            }}
          />
          <Button
            className="confirm-modal button cancel"
            color="black"
            onClick={() => {
              setModifyOpen(false);
              initFormData();
              initActiveRow();
            }}
          >
            취소
          </Button>
        </Modal.Actions>
      </Modal>
    </InputCompo>
  );
};

export default AccountInput;
