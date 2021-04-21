import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Select, Checkbox, Modal } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";

import { FaImage, FaRegCalendarAlt } from "react-icons/fa";

import DatePicker, { registerLocale } from "react-datepicker";
import "../react-datepicker.css";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

const InputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  @media screen and (max-height: 937px) {
    margin-right: 12px;
  }
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
    margin-top: 20px;
    .resizable-area {
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
      /* background-color : red; */
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

const WorkerInput = ({
  onChange,
  createHandler,
  updateHandler,
  formData,
  selectedRow,
  initFormData,
  initActiveRow,
  addressError,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
  const {
    wk_id,
    wk_index,
    wk_name,
    wk_phone,
    wk_position,
    wk_birth,
    wk_nation,
    wk_blood_type,
    wk_blood_group,
    wk_image_path,
    co_index,
    bc_index,
  } = formData;
  const [startDate, setStartDate] = useState(new Date());

  const options = [
    { key: "a", text: "A", value: "0" },
    { key: "b", text: "B", value: "1" },
    { key: "o", text: "O", value: "2" },
    { key: "ab", text: "AB", value: "3" },
  ];

  const bloodType = [
    { key: "a", text: "A", value: "0" },
    { key: "b", text: "B", value: "1" },
    { key: "o", text: "O", value: "2" },
    { key: "ab", text: "AB", value: "3" },
  ];

  const bloodGroup = [
    { key: "+", text: "RH+", value: "0" },
    { key: "-", text: "RH-", value: "1" },
  ];

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

  return (
    <InputCompo className="input-compo">
      <p className="subtitle">비콘 등록</p>
      <Form
        className="input-form-body"
        onSubmit={(e) => {
          !selectedItem && createHandler(e);
        }}
      >
        <div className="resizable-area">
          <Form.Field
            className="input-form"
            control={Select}
            label="소속사"
            options={options}
            placeholder="소속사를 선택해주세요."
            required
          />
          <Form.Input
            className="input-form"
            error={addressError}
            label="직위"
            className="input-form position"
            id="wk_position"
            name="wk_position"
            placeholder="직위를 입력해주세요."
            required
            value={
              wk_position &&
              wk_position.replace(
                /[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g,
                ""
              )
            }
            onChange={onChange}
          />
          <Form.Input
            className="input-form"
            error={addressError}
            label="이름"
            className="input-form name"
            id="wk_name"
            name="wk_name"
            placeholder="이름을 입력해주세요."
            required
            value={
              wk_name &&
              wk_name.replace(/[^a-z|^A-Z|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g, "")
            }
            onChange={onChange}
          />
          <Form.Input
            className="input-form"
            error={addressError}
            label="핸드폰"
            className="input-form address"
            id="wk_phone"
            name="wk_phone"
            placeholder="번호를 입력해 주세요."
            required
            value={wk_phone && wk_phone.replace(/[^0-9]*$/g, "")}
            onChange={onChange}
          />
          <Form.Field control={Checkbox} label="비상알람 SMS" />
          <div>생년월일</div>
          <FaRegCalendarAlt />
          <DatePicker
            className="input-form"
            locale="ko"
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            useWeekdaysShort={true}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <div>
            <Form.Field
              className="input-form"
              control={Select}
              label="혈액형"
              options={bloodType}
              placeholder="혈액형을 선택해 주세요."
            />
            <Form.Field
              className="input-form"
              control={Select}
              options={bloodGroup}
              placeholder="RH형을 선택해 주세요."
            />
          </div>
          <Form.Input
            error={addressError}
            label="국적"
            className="input-form address"
            id="wk_nation"
            name="wk_nation"
            placeholder="국적을 입력해주세요."
            required
            value={
              wk_nation &&
              wk_nation.replace(/[^a-z|^A-Z|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g, "")
            }
            onChange={onChange}
          />
          <Form.Field
            className="input-form"
            control={Select}
            label="비콘 사용 정보"
            options={options}
            placeholder="Gender"
          />
          <Form.Field className="input-form">
            <div>하이욤</div>
            <div>
              <div>
                <FaImage />
              </div>
              <div>사진을 등록해 주세요.(jpg, png, gif)</div>
            </div>
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

export default WorkerInput;
