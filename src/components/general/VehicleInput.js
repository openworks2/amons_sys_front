import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Form, Button, Select, Modal, Input } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaImage, FaRegCalendarAlt } from "react-icons/fa";

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
  .ui.form textarea {
    &:focus {
      border-color: #f1592a !important;
    }
  }
  .ui.checkbox input:focus ~ label:before {
    border-color: #f1592a !important;
    /* ui focus 색상변경 끝 */
  }

  ${(props) =>
    props.selectedState &&
    css`
      // drop 선택
      .ui.default.dropdown:not(.button) > .text,
      .ui.dropdown:not(.button) > .default.text {
        color: #2f2f2f;
      }
    `};

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
        color: #929292;
        opacity: 1;
        &.title {
          color: #2e2e2e;
        }
      }
    }
  }

  .photo {
    .photo-box {
      cursor: pointer;
      border: solid 1px;
      border-radius: 4px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      opacity: 1;
      height: 38px;
      margin-top: 5px;
      .icon-box {
        background-color: #2e2e2e;
        display: inline-block;
        height: 37px;
        border-radius: 5px;
        .photo-icon {
          font-size: 20px;
          margin-left: 9px;
          margin-right: 9px;
          margin-top: 7px;
          color: #ffffff;
        }
      }
      .photo-description {
        display: inline-block;
        margin: 0px;
        padding-bottom: 12px;
        vertical-align: middle;
        margin-left: 10px;
        text-align: left;
        letter-spacing: 0px;
        color: #d8d8d8;
        opacity: 1;
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
    &.phone {
      margin-bottom: 5px;
    }
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
  .ui.form .field .prompt.label {
    position: absolute;
    top: 55px;
    left: 100px;
  }

  .ui.checkbox input:checked ~ label:after {
    background-color: #2e2e2e;
    border-radius: 4px;
    border-color: #929292;
    color: #ffffff;
    font-size: 12px;
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

const VehicleInput = ({
  onChange,
  onSelectChange,
  onFileUpload,
  createHandler,
  updateHandler,
  formData,
  selectedRow,
  initFormData,
  initActiveRow,
  companyList,
  unUsedBeaconList,
  companyError,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
  const {
    vh_id,
    vh_index,
    created_date,
    modified_date,
    vh_name,
    vh_number,
    vh_image,
    vh_io_state,
    description,
    co_index,
    co_name,
    bc_index,
    bc_address,
  } = formData;

  return (
    <InputCompo className="input-compo" selectedState={vh_id}>
      <p className="subtitle">차량 등록</p>
      <Form
        className="input-form-body"
        onSubmit={(e) => {
          !selectedItem && createHandler(e);
        }}
      >
        <div className="resizable-area">
          <Form.Field
            className="input-form company"
            id="co_index"
            name="co_index"
            control={Select}
            label="소속사"
            options={companyList}
            onChange={(e, value) => onSelectChange(e, value)}
            placeholder="소속사를 선택해주세요."
            value={co_index}
            error={companyError}
            required
          />
          <Form.Input
            label="차량 종류"
            className="input-form name"
            id="vh_name"
            name="vh_name"
            placeholder="차량 종류를 입력해주세요."
            required
            value={vh_name}
            onChange={onChange}
          />
          <Form.Input
            className="input-form"
            label="차량번호"
            className="input-form number"
            id="vh_number"
            name="vh_number"
            placeholder="차량 번호를 입력해주세요."
            required
            value={vh_number}
            onChange={onChange}
          />
          <Form.Field
            className="input-form beacon"
            control={Select}
            label="비콘 사용 정보"
            options={unUsedBeaconList}
            placeholder={
              vh_id ? !bc_index && "할당없음" : "할당할 비콘을 선택해 주세요."
            }
            name="bc_index"
            onChange={(e, value) => onSelectChange(e, value)}
            value={bc_index}
            required
          />
          <Form.Field
            className="input-form photo"
            method="post"
            enctype="multipart/form-data"
          >
            <div className="form-title">사진</div>
            <Input
              type="file"
              accept="image/jpg,jpge,png,gif"
              className="photo-box"
              onChange={(e) => {
                onFileUpload(e);
              }}
              placeholder="사진을 등록해 주세요.(jpg, png, gif)"
              // value={wk_image_path && wk_image_path}
            >
              {/* <div className="icon-box">
                <FaImage className="photo-icon" />
              </div>
                <div className="photo-description">
                  {}
                </div> */}
            </Input>
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
    </InputCompo>
  );
};

export default VehicleInput;
