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

const LocalInput = ({
  onChange,
  onSelectChange,
  formData,
  createHandler,
  updateHandler,
  selectedRow,
  initFormData,
  initActiveRow,
  // localList,
  localError,
  kindError,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
  const {
    scn_id,
    scn_index,
    created_date,
    modified_date,
    scn_pos_x,
    scn_kind,
    scn_group,
    scn_address,
    scn_name,
    scn_ip,
    scn_port,
    scn_receive_time,
    scn_result,
    scn_start_time,
    scn_stop_time,
    description,
    local_index,
    closed_count,
  } = formData;

  const splitByColonInput = (str) => {
    let _str = str.replace(/\:/g, "");

    if (_str.length > 10) {
      return str.substring(0, 14);
    }

    let length = _str.length;
    let point = _str.length % 2;
    let splitedStr = "";
    splitedStr = _str.substring(0, point);
    while (point < length) {
      if (splitedStr != "") splitedStr += ":";
      splitedStr += _str.substring(point, point + 2);
      point += 2;
    }
    return splitedStr;
  };

  const kindOptions = [
    { key: 0, text: "기타", value: 0 },
    { key: 1, text: "입장", value: 1 },
    { key: 2, text: "퇴장", value: 2 },
    { key: 3, text: "위치측정", value: 3 },
  ];

  return (
    <InputCompo className="input-compo" selectedState={scn_id}>
      <p className="subtitle">스캐너 등록</p>
      <Form
        className="input-form-body"
        onSubmit={(e) => {
          !selectedItem && createHandler(e);
        }}
      >
        <div className="resizable-area">
          {/* <Form.Field
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
          /> */}
          <div className="pos-x-area">
            <div className="form-title pos-x">설치위치</div>
            <Input
              label={{ basic: true, content: "m" }}
              labelPosition="right"
              className="input-form pos-x"
              id="scn_pos_x"
              name="scn_pos_x"
              placeholder="설치위치를 입력해주세요."
              required
              value={scn_pos_x && scn_pos_x.replace(/[^0-9]*$/g, "")}
              onChange={onChange}
            />
          </div>
          <Form.Field
            label="사용용도"
            className="input-form kind"
            id="scn_kind"
            name="scn_kind"
            control={Select}
            options={kindOptions}
            onChange={(e, value) => onSelectChange(e, value)}
            placeholder="사용 용도를 선택해주세요."
            error={kindError}
            required
          />
          <Form.Input
            className="input-form group"
            label="그룹"
            id="scn_group"
            name="scn_group"
            placeholder="그룹을 입력해 주세요."
            required
            value={
              scn_address &&
              splitByColonInput(scn_address)
                .toUpperCase()
                .replace(/[^a-z|^A-Z|^0-9]*$/g, "")
            }
            onChange={onChange}
          />
          <Form.Input
            className="input-form"
            label="MAC 주소"
            className="input-form address"
            id="scn_address"
            name="scn_address"
            placeholder="__:__:__:__:__:__"
            required
            value={
              scn_address &&
              splitByColonInput(scn_address)
                .toUpperCase()
                .replace(/[^a-z|^A-Z|^0-9]*$/g, "")
            }
            onChange={onChange}
          />
          <Form.Input
            label="URL"
            className="input-form ip"
            id="scn_ip"
            name="scn_ip"
            placeholder="URL을 입력해 주세요."
            required
            value={scn_ip}
            onChange={onChange}
          />
          <div className="group-area">
            <div className="form-title group">PORT</div>
            <NumberFormat
              format="#####"
              className="input-form port"
              id="scn_port"
              name="scn_port"
              placeholder="포트를 입력해주세요."
              required
              value={scn_port && scn_port}
              onChange={onChange}
            />
          </div>
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

export default LocalInput;
