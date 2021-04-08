import React, { useState } from "react";
import ContentSubTitle from "../ContentSubTitle";
import styled from "styled-components";
import { Form, Button, Header, Icon, Modal } from "semantic-ui-react";

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
    margin-top: 400px;
  }
`;

const CompanyInput = ({
  activeItem,
  onChangeInput,
  submitButtonHandler,
  modifiButtonHandler,
  initFormData,
  onChange,
  formData,
}) => {
  const [submitOpen, setSubmitOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);

  const { id, co_name, co_sectors, description } = formData;

  return (
    <CompanyInputCompo className="company-input-compo">
      <ContentSubTitle subTitle="소속사 등록" />
      <Form className="company-input-form-body" onSubmit={"onsubmit"}>
        <Form.Field className="company-input-form co-name">
          <label className="input-form title">소속사</label>
          <input
            className="input-form"
            id="co_name"
            name="co_name"
            placeholder={
              activeItem ? activeItem.co_name : "소속사를 입력해 주세요."
            }
            required={true}
            // value={activeItem ? activeItem.co_name : ""}
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
            placeholder={
              activeItem ? activeItem.co_sectors : "업종을 입력해 주세요."
            }
            required={true}
            value={activeItem ? activeItem.co_sectors : ""}
            // value={activeItem ? activeItem.co_sectors : ""}
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
            placeholder={activeItem ? activeItem.description : "비고 입력란"}
            // value={activeItem ? activeItem.description : ""}
            value={description}
            onChange={onChange}
          />
        </Form.Field>
        {activeItem ? (
          // =================================등록 모달==============================
          <Modal
            basic
            onClose={() => setSubmitOpen(false)}
            onOpen={() => setSubmitOpen(true)}
            open={submitOpen}
            size="tiny"
            trigger={<Button className="submit-button">수정</Button>}
          >
            <Header icon>
              <Icon name="pencil alternate" />
              수정하시겠습니까?
            </Header>

            <Modal.Actions>
              <Button
                basic
                color="red"
                inverted
                onClick={() => {
                  initFormData();
                  setSubmitOpen(false);
                }}
              >
                <Icon name="remove" /> 취소
              </Button>
              <Button
                color="green"
                inverted
                type="submit"
                onClick={(e) => {
                  modifiButtonHandler(e);
                  initFormData();
                  setSubmitOpen(false);
                }}
              >
                <Icon name="checkmark" /> 수정하기
              </Button>
            </Modal.Actions>
          </Modal>
        ) : !id ? (
          <Button
            className="submit-button"
            type="submit"
            onClick={(e) => {
              submitButtonHandler(e);
              initFormData();
              setSubmitOpen(false);
            }}
          >
            등록
          </Button>
        ) : (
          <Button className="submit-button" type="submit">
            수정
          </Button>
        )}
      </Form>
    </CompanyInputCompo>
  );
};

export default CompanyInput;
