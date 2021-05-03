import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Form, Button, Select, Modal, Input, Table } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaImage, FaRegCalendarAlt } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "../../react-datepicker.css";
import ko from "date-fns/locale/ko";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import moment from "moment";
import "moment/locale/ko";
registerLocale("ko", ko);
const _ = require("lodash");

const InputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  .ui.table {
    margin-top: 5px;
    table-layout: fixed;
    word-break: break-all;
  }
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
  /* date picker customize 시작 */
  .react-datepicker {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
    .react-datepicker__day-names {
      font-family: "NotoSansKR-Medium";
      font-size: 15px;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
      border-color: #f1592a !important;
      background-color: #f1592a !important;
    }
  }
  .increase-button,
  .decrease-button {
    font-family: "NotoSansKR-Medium";
    font-size: 20px;
    vertical-align: middle;
    text-align: center;
    padding: 5px;
    padding-top: 0px;
    margin: 5px;
    border-radius: 200px;
    height: 23px;
    border: solid 1px rgba(34, 36, 38, 0.35);
    display: inline-block;
    font-weight: bolder;
    cursor: pointer;
    &:hover {
      color: #f1592a !important;
      background-color: #ffffff;
    }
  }
  .ui.form select {
    font-family: "NotoSansKR-Medium";
    font-size: 14px;
    padding: 5px;
    width: 66px;
    &:focus,
    &:hover {
      border-color: #f1592a;
    }
  }
  /* date picker customize 종료 */

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

  .ui.table,
  .sub-info-table {
    border-radius: 4px 4px 0px 0px;
    background: #f9fafb 0% 0% no-repeat padding-box;
    border: 1px solid #d8d8d8;
    opacity: 1;
    font-family: "NotoSansKR-Regular";
    font-size: 13px;
    text-align: center;
    letter-spacing: 0px;
    color: #2e2e2e;
    opacity: 1;
    &.header {
      border-radius: 0px;
      width: 146px !important;
    }
    &.origin {
      border-radius: 0px;
      letter-spacing: 0px;
      color: #7c7c7c !important;
      opacity: 1;
    }
    &.cell {
      width: 90px !important;
      border-radius: 0px;
    }
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
        &.date-area {
          height: 70px;
          width: 321px;
          margin-top: 5px;
          .date-box {
            border: solid 1px;
            border-radius: 4px;
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 1px solid #d8d8d8;
            border-radius: 4px;
            opacity: 1;
            height: 38px;
            margin-top: 5px;
            .cal-icon {
              margin-top: 4px;
              margin-left: 15px;
              color: #2e2e2e;
              display: inline-block;
              font-size: 15px;
              vertical-align: middle;
            }
            .date-picker-box {
              .date {
                vertical-align: middle;
                padding-left: 17px;
                width: 213px !important;
                margin-top: 5px;
                border: 0px;
                height: 25px;
                color: black;
              }
              vertical-align: middle;
              display: inline-block;
            }
          }
        }
        &.title {
          color: #2e2e2e;
          margin-top: 14px;
        }
        &.description {
          height: 105px !important;
        }
        &.dig-length {
          margin-top: 2px;
          margin-bottom: 10px;
        }
        &.description {
          height: 105px;
        }
      }
    }
  }

  #dig_length {
    width: 282px;
  }

  .sub-info-table.last-row {
    margin-top: -14px;
    border-radius: 0px 0px 4px 4px;
    height: 39px;
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
    &.dig-length {
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

const ProcessInput = ({
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
  addComma,
  localInfo,
  currentLatestDigInfo,
  onChangeDate,
  getDigAmountPercent,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
  const {
    dig_seq,
    created_date,
    modified_date,
    record_date,
    dig_length,
    description,
    local_index,
  } = formData;

  const years = _.range(2019, getYear(new Date()) + 1, 1); // 수정
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <InputCompo className="input-compo">
      <p className="subtitle">공정상태 변경</p>
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
            disabled={selectedRow.selectedId}
            required
          />
          {localError && <InputError>{localError}</InputError>}

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
            입력
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

export default ProcessInput;
