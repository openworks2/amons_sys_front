import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Modal } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";

const CompanyInputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;
  .ui.form input {
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
  .ui.form input {
    border-radius: 4px;
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

  .company-input-form-body {
    margin-top: 29px;
    .resizable-area {
      overflow: auto;
    }
  }
  .input-form {
    font-family: "NotoSansKR-Regular";
    font-size: 24px;
    text-align: left;
    letter-spacing: 0px;
    opacity: 1;
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
    top: 69.3vh;
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
    top: 69.3vh;
    @media screen and (max-height: 970px) {
      top: 68vh;
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
`;

const CompanyInput = ({
  onChange,
  createHandler,
  updateHandler,
  formData,
  selectedRow,
  initFormData,
  initActiveRow,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
  const { co_id, co_index, co_name, co_sectors, description } = formData;

  return (
    <CompanyInputCompo className="company-input-compo">
      <p className="subtitle">소속사 등록</p>
      <Form
        className="company-input-form-body"
        onSubmit={(e) => {
          !selectedItem && createHandler(e);
        }}
      >
        <div className="resizable-area">
          <Form.Field className="company-input-form co-name">
            <label className="input-form title">소속사</label>
            <input
              className="input-form"
              id="co_name"
              name="co_name"
              placeholder={"소속사를 입력해 주세요."}
              required
              value={co_name.replace(
                /[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g,
                ""
              )}
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field className="company-input-form co-sectors">
            <label className="input-form title">업종</label>
            <input
              className="input-form"
              id="co_sectors"
              name="co_sectors"
              placeholder={"업종을 입력해 주세요."}
              required
              value={co_sectors.replace(
                /[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g,
                ""
              )}
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field className="company-input-form description">
            <label className="input-form title">비고</label>
            <textarea
              className="input-form description"
              id="description"
              name="description"
              placeholder={"비고 입력란"}
              value={description}
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
    </CompanyInputCompo>
  );
};

export default CompanyInput;
