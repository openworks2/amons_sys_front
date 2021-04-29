import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Form, Button, Select, Modal, Input } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaImage, FaRegCalendarAlt } from "react-icons/fa";
import NumberFormat from "react-number-format";

const InputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  @media screen and (max-height: 937px) {
    margin-right: 12px;
  }
  margin-top: 5px;
  .ui.form .field > label,
  .field > label {
    font-family: "NotoSansKR-Medium" !important;
    color: #2e2e2e;
    font-size: 14px !important;
    letter-spacing: 0px;
    opacity: 1;
    font-weight: initial !important;
  }
  .ui.input > input {
    /* ui focus 색상변경 */
    &:focus {
      border-color: #f1592a !important;
    }
  }
  .input-form.port {
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
  .ui.form textarea {
    &:focus {
      border-color: #f1592a !important;
    }
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
      @media screen and (max-height: 937px) {
        height: 68vh;
      }
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        margin: 10px !important;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
      }
      overflow: auto;
      @media screen and (max-height: 937px) {
        height: 67.5vh;
      }
      .input-form {
        font-family: "NotoSansKR-Regular";
        font-size: 14px;
        text-align: left;
        letter-spacing: 0px;
        opacity: 1;
        &.title {
          color: #2e2e2e;
          margin-top: 14px;
        }
        &.description {
          height: 105px !important;
        }
        &.pos-x {
          width: 283px !important;
          margin-top: 6px;
          margin-bottom: 15px;
        }
        &.description {
        }
        &.port {
          margin-bottom: 10px;
        }
      }
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

  .ui.form .field .ui.input input#scn_address {
    // input 맥 어드레스 placeholder
    font-family: "NotoSansKR-Regular" !important;
    font-size: 14px;
    text-align: left;
    letter-spacing: 1.05px;
    opacity: 1;
  }

  .ui.form .required.field > label:after {
    content: "" !important;
  }

  .input-form.description {
    height: 105px !important;
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
    @media screen and (max-height: 937px) {
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
    @media screen and (max-height: 937px) {
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

const CctvInput = ({
  onChange,
  onSelectChange,
  formData,
  createHandler,
  updateHandler,
  selectedRow,
  initFormData,
  initActiveRow,
  localList,
  localError,
  kindError,
  addressError,
  addComma,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
  const {
    cctv_id,
    cctv_index,
    cctv_name,
    cctv_pos_x,
    cctv_user_id,
    cctv_pw,
    cctv_ip,
    cctv_port,
    local_index,
    description,
  } = formData;

  const tabOrder = [{ key: 0, text: "기타", value: 0 }];

  return (
    <InputCompo className="input-compo">
      <p className="subtitle">CCTV 등록</p>
      <Form
        className="input-form-body"
        onSubmit={(e) => {
          !selectedItem && createHandler(e);
        }}
      >
        <div className="resizable-area">
          <Form.Field
            className="input-form local"
            id="local_index"
            name="local_index"
            control={Select}
            label="노선"
            options={localList}
            onChange={(e, value) => onSelectChange(e, value)}
            placeholder="노선을 선택해주세요."
            value={local_index}
            error={localError}
            required
          />
          {localError && <InputError>{localError}</InputError>}
          <div className="pos-x-area">
            <div className="form-title pos-x">설치위치</div>
            <Input
              label={{ basic: true, content: "m" }}
              labelPosition="right"
              className="input-form pos-x"
              id="cctv_pos_x"
              name="cctv_pos_x"
              placeholder="설치위치를 입력해주세요."
              required
              value={cctv_pos_x && addComma(cctv_pos_x)}
              onChange={onChange}
            />
          </div>
          <Form.Field
            className="input-form tab-order-num"
            id="tab-order-num"
            name="tab-order-num"
            control={Select}
            label="탭 순서"
            options={localList}
            onChange={(e, value) => onSelectChange(e, value)}
            placeholder="탭 순서를 선택해주세요."
            value={local_index}
            error={localError}
            required
          />
          <Form.Input
            className="input-form group"
            label="이름"
            id="cctv_name"
            name="cctv_name"
            placeholder="이름을 입력해 주세요."
            required
            value={cctv_name && cctv_name}
            onChange={onChange}
          />
          <Form.Input
            className="input-form"
            label="IP 주소"
            className="input-form ip"
            id="cctv_ip"
            name="cctv_ip"
            placeholder="ip주소를 입력해주세요."
            required
            value={cctv_ip && cctv_ip}
            onChange={onChange}
          />
          <div className="group-area">
            <div className="form-title port">PORT</div>
            <NumberFormat
              format="#####"
              className="input-form port"
              id="cctv_port"
              name="cctv_port"
              placeholder="포트를 입력해주세요."
              required
              value={cctv_port && cctv_port}
              onChange={onChange}
            />
          </div>
          <Form.Input
            className="input-form id"
            label="아이디"
            id="cctv_user_id"
            name="cctv_user_id"
            placeholder="아이디를 입력해 주세요."
            required
            value={cctv_user_id && cctv_user_id}
            onChange={onChange}
          />
          <Form.Input
            className="input-form pw"
            label="비밀번호"
            id="cctv_pw"
            name="cctv_pw"
            placeholder="비밀번호를 입력해 주세요."
            required
            value={cctv_pw && cctv_pw}
            onChange={onChange}
          />
          <Form.Field className="company-input-form description">
            <label className="input-form title">비고</label>
            <textarea
              className="input-form description"
              id="description"
              name="description"
              placeholder="비고 입력란"
              value={description ? description : ""}
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

export default CctvInput;
