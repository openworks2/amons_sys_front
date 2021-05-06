import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Modal, Input } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";

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
  .ui.form textarea {
    &:focus {
      border-color: #f1592a !important;
    }
  }

  .ui.form .field > label,
  .form-title.dig-length,
  .form-title {
    margin-left: 5px;
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
      .form-title {
        margin-bottom: 5px;
      }

      .input-form {
        font-family: "NotoSansKR-Regular";
        font-size: 14px;
        text-align: left;
        letter-spacing: 0px;
        opacity: 1;
        &.title {
          margin-top: 10px;
          color: #2e2e2e;
        }
      }
      #plan_length {
        width: 283px;
      }
    }
  }

  .label,
  .field > label,
  .form-title {
    font-family: "NotoSansKR-Medium" !important;
    color: #2e2e2e;
    font-size: 14px !important;
    letter-spacing: 0px;
    opacity: 1;
    font-weight: initial !important;
  }
  .ui.form .required.field > label:after {
    content: "" !important;
  }
  .ui.form .field .prompt.label {
    position: absolute;
    top: 55px;
    left: 100px;
  }

  .input-form.description {
    height: 105px !important;
  }
  .ui.form .field .prompt.label {
    position: absolute;
    top: -25px;
    left: 150px;
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
`;

const LocalInput = ({
  onChange,
  formData,
  addComma,
  createHandler,
  updateHandler,
  selectedRow,
  initFormData,
  initActiveRow,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
  const {
    local_id,
    local_index,
    created_date,
    modified_date,
    local_name,
    plan_length,
    local_description,
  } = formData;

  return (
    <InputCompo className="input-compo">
      <p className="subtitle">노선 등록</p>
      <Form
        className="input-form-body"
        onSubmit={(e) => {
          !selectedItem && createHandler(e);
        }}
      >
        <div className="resizable-area">
          <Form.Input
            className="input-form name"
            label="노선"
            id="local_name"
            name="local_name"
            placeholder="노선명을 입력해 주세요."
            required
            value={local_name && local_name}
            onChange={onChange}
          />
          <div className="length-area">
            <div className="form-title length">계획 연장</div>
            <Input
              label={{ basic: true, content: "m" }}
              labelPosition="right"
              className="input-form length"
              id="plan_length"
              name="plan_length"
              placeholder="굴착 계획 연장 거리를 입력해주세요."
              required
              value={plan_length && addComma(plan_length)}
              onChange={onChange}
            />
          </div>
          <Form.Field className="local-input-form description">
            <label className="input-form title">비고</label>
            <textarea
              className="input-form description"
              id="local_description"
              name="local_description"
              placeholder={"비고 입력란"}
              value={local_description ? local_description : ""}
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

export default LocalInput;
