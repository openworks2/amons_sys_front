import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Select, Checkbox, Modal } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";

import DatePicker, { registerLocale } from "react-datepicker";
import "../react-datepicker.css";
import ko from 'date-fns/locale/ko';
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
      height: 67.5vh ;
      }
    .input-form {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    color: #929292;
    opacity: 1;
      &.title{
      color: #2E2E2E;
      }
     }
   }
  }

.ui.form .required.field>label:after{
  content : ''!important;
 }
.ui.form .field .prompt.label {
  position : absolute;
  top : 55px;
  left : 100px;
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
  addressError
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const {selectedId, selectedItem, clickedIndex} = selectedRow;
  const { bc_address, description } = formData;
  const [startDate, setStartDate] = useState(new Date());
 

  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  const splitByColonInput = (str) =>{
    let _str = str.replace(/\:/g,'');

    if(_str.length>10){
      return str.substring(0,14);
    }

    let length = _str.length;
    let point = _str.length % 2;
    let splitedStr = "";
    splitedStr = _str.substring (0, point);
    while(point < length){
      if (splitedStr != "") splitedStr+= ":";
      splitedStr += _str.substring(point, point + 2);
      point += 2;
    }
    return splitedStr;
  }
  
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
            control={Select}
            label='소속사'
            options={options}
            placeholder='소속사를 선택해주세요.'
          />
          <Form.Input
              className="input-form"       
              error={addressError}
              label="직위"
              className="input-form address"
              id="bc_address"
              name="bc_address"
              placeholder="직위를 입력해주세요."
              required
              value={
                splitByColonInput(bc_address).toUpperCase().replace(/[^a-z|^A-Z|^0-9]*$/g, "")}
              onChange={onChange}
          />
          <Form.Input
              className="input-form"       
              error={addressError}
              label="이름"
              className="input-form address"
              id="bc_address"
              name="bc_address"
              placeholder="이름을 입력해주세요."
              required
              value={
                splitByColonInput(bc_address).toUpperCase().replace(/[^a-z|^A-Z|^0-9]*$/g, "")}
              onChange={onChange}
          />
          <Form.Input
              className="input-form"       
              error={addressError}
              label="핸드폰"
              className="input-form address"
              id="bc_address"
              name="bc_address"
              placeholder="번호를 입력해 주세요."
              required
              value={
                splitByColonInput(bc_address).toUpperCase().replace(/[^0-9]*$/g, "")}
              onChange={onChange}
          />
             <Form.Field
          control={Checkbox}
          label='비상알람 SMS'
        />
        <div>
        <DatePicker
          className="date date-record"
          locale="ko"
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        </div>

        {/* <DatePicker
        
          selected={startDate}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="yyyy.MM.dd(eee)"
          useWeekdaysShort={true}
          
          useWeekdaysShort={true}
          excludeDates={excludeDates}
          ref={calendar}
        />; */}
          <Form.Field
            control={Select}
            label='혈액형'
            options={options}
            placeholder='Gender'
          />
          <Form.Field
            control={Select}
            options={options}
            placeholder='Gender'
          />
          <Form.Input
              className="input-form"       
              error={addressError}
              label="국적"
              className="input-form address"
              id="bc_address"
              name="bc_address"
              placeholder="국적을 입력해주세요."
              required
              value={
                splitByColonInput(bc_address).toUpperCase().replace(/[^0-9]*$/g, "")}
              onChange={onChange}
          />
           <Form.Field
            control={Select}
            label='비콘 사용 정보'
            options={options}
            placeholder='Gender'
          />
          <Form.Input
              className="input-form"       
              error={addressError}
              label="국적"
              className="input-form address"
              id="bc_address"
              name="bc_address"
              placeholder="국적을 입력해주세요."
              required
              value={
                splitByColonInput(bc_address).toUpperCase().replace(/[^0-9]*$/g, "")}
              onChange={onChange}
          />
          <Form.Input
              className="input-form"       
              error={addressError}
              className="input-form address"
              id="bc_address"
              name="bc_address"
              placeholder="국적을 입력해주세요."
              required
              value={
                splitByColonInput(bc_address).toUpperCase().replace(/[^0-9]*$/g, "")}
              onChange={onChange}
          />
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
