import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Header, Icon, Modal } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";

const CompanyInputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;

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
    margin-top: 29px;
    .resizable-area {
    overflow: auto;
    .input-form {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    color: #929292;
    opacity: 1;
   }
  }

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
  const {selectedId, selectedItem, clickedIndex} = selectedRow;
  const { co_id, co_index, co_name, co_sectors, description } = formData;

  return (
    <CompanyInputCompo className="input-compo">
      <p className="subtitle">작업자 등록</p>
      <Form
        className="input-form-body"
        onSubmit={(e) => {
          !selectedItem && createHandler(e);
        }}
      >
        <div className="resizable-area">
          <Form.Field className="input-form">
            <label className="input-form title">직위</label>
            <input
              className="input-form company"
              id="co_name"
              name="co_name"
              placeholder={"직위를 입력해주세요."}
              required
              value={co_name}
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field className="input-form">
            <label className="input-form title">이름</label>
            <input
              className="input-form company"
              id="co_name"
              name="co_name"
              placeholder={"이름을 입력해주세요."}
              required
              value={co_name}
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field className="input-form">
            <label className="input-form title">핸드폰</label>
            <input
              className="input-form company"
              id="co_name"
              name="co_name"
              placeholder={"번호를 입력해주세요."}
              required
              value={co_name}
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field className="input-form">
            <label className="input-form title">국적</label>
            <input
              className="input-form company"
              id="co_name"
              name="co_name"
              placeholder={"국적을 입력해 주세요."}
              required
              value={co_name}
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
              console.log("****************수정********************");
              console.log("selectedId");
              console.log(selectedId);
              console.log("formData");
              console.log(formData);
              updateHandler(e, selectedId);
              setModifyOpen(false);
              console.log("****************수정********************");
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
