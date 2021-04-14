import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Header, Icon, Modal } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";

const CompanyInputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;

  .company-input-form-body {
    margin-top: 29px;
  }

  .input-form {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    color: #929292;
    opacity: 1;
  }

  .input-form.title {
    font-family: "NotoSansKR-Medium";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    color: #2e2e2e;
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
    top: 68.3vh;
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
    top: 68.3vh;
  }

  .form-body {
    overflow: auto;
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
`;

const CompanyInput = ({
  onChange,
  createHandler,
  updateHandler,
  formData,
  selectRow,
  initFormData,
  initActiveRow,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);

  const { id, co_name, co_sectors, description } = formData;

  return (
    <CompanyInputCompo className="company-input-compo">
      <p className="subtitle">소속사 등록</p>
      <Form
        className="company-input-form-body"
        onSubmit={() => {
          !selectRow.item && createHandler();
        }}
      >
        <div className="form-body">
          <Form.Field className="company-input-form co-name">
            <label className="input-form title">소속사</label>
            <input
              className="input-form"
              id="co_name"
              name="co_name"
              placeholder={"소속사를 입력해 주세요."}
              required
              value={co_name}
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
              value={co_sectors}
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
        {selectRow.item ? (
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
            onClick={() => {
              updateHandler();
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
