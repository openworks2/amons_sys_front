import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Form, Button, Select, Modal, Radio } from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaImage, FaRegCalendarAlt } from "react-icons/fa";
import "../../react-datepicker.css";

const InputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;

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
        display: none;
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
    }
  }

  .radio-grouper {
    height: 150px;
    width: 90px;
    display: inline-block;
    margin: 8px;
    margin-top: 3px;
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    .radio-row {
      margin: 6px;
    }
    .blank-place {
      font-size: 25px;
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

  .ui.form .field > label,
  .form-title.dig-length,
  .form-title {
    margin-left: 5px;
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

const PreviewBox = styled.div`
  font-family: "NotoSansKR-Regular";
  font-size: 13px;
  text-align: center;
  vertical-align: middle;
  color: #2e2e2e;
  opacity: 1;
  width: 322px;
  height: 80px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  opacity: 1;
  padding: 0px;
  .tri-angle {
    position: absolute;
    top: 125px;
    left: 163px;
    width: 0px;
    height: 0px;
    border-top: 12px solid transparent;
    border-left: 12px solid #ffffff;
    border-bottom: 12px solid transparent;
  }
  .preview.current-state-box {
    display: inline-block;
    width: 162px;
    height: 78px;
    background: #ffffff 0% 0% no-repeat padding-box;
    padding: 8px;
    border-radius: 4px;
  }
  .preview.current-state {
    background: #375795 0% 0% no-repeat padding-box;
    margin: auto;
    margin-top: 8px;
    width: 70px;
    height: 30px;
    border-radius: 3px;
    opacity: 1;
    padding: 4px;
    color: #ffffff;
  }
  .preview.next-state-box {
    display: inline-block;
    width: 158px;
    height: 78px;
    background: #f2f2f2 0% 0% no-repeat padding-box;
    padding: 8px;
    border-radius: 0px 4px 4px 0px;
  }
  .preview.next-state {
    background: #7c3795 0% 0% no-repeat padding-box;
    margin: auto;
    margin-top: 8px;
    width: 70px;
    height: 30px;
    border-radius: 3px;
    opacity: 1;
    padding: 4px;
    color: #ffffff;
  }
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
  onRadioChange,
}) => {
  const [modifyOpen, setModifyOpen] = useState(false);
  const { selectedId, selectedItem, clickedIndex } = selectedRow;
  const {
    pcs_seq,
    created_date,
    modified_date,
    prev_pcs_state,
    pcs_state,
    description,
    local_index,
  } = formData;

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
          <Form.Field className="process-input-form description">
            <label className="input-form title">미리보기</label>
            <PreviewBox>
              <div className="preview current-state-box">
                현재상태
                <div className="preview current-state">{"0165165"}</div>
              </div>
              <div className="tri-angle" />
              <div className="preview next-state-box">
                변경상태
                <div className="preview next-state">{"0165165"}</div>
              </div>
            </PreviewBox>
          </Form.Field>
          <Form.Field className="process-input-form radio-group">
            <label className="input-form title">공정상태 선택</label>
            <div className="radio-grouper row1">
              <Radio
                label="미착공"
                className="radio-row one"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="발파"
                className="radio-row one"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="강지보"
                className="radio-row one"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="방수시트"
                className="radio-row one"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="장비점검"
                className="radio-row one"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
            </div>
            <div className="radio-grouper row2">
              <Radio
                label="천공"
                className="radio-row two"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="버력처리"
                className="radio-row two"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="격자지보"
                className="radio-row two"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="라이닝"
                className="radio-row two"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="기타"
                className="radio-row two"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
            </div>
            <div className="radio-grouper row3">
              <Radio
                label="장약"
                className="radio-row three"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="숏크리트"
                className="radio-row three"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />

              <Radio
                label="록볼트"
                className="radio-row three"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <Radio
                label="근무교대"
                className="radio-row three"
                name="radioGroup"
                value={0}
                checked={pcs_state && pcs_state === 0}
                onChange={(e, target) => onRadioChange(e, target)}
              />
              <div className="blank-place"> </div>
            </div>
          </Form.Field>
          <Form.Field className="process-input-form description">
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
