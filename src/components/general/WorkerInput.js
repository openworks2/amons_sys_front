import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import NumberFormat from "react-number-format";
import {
  Form,
  Button,
  Select,
  Checkbox,
  Modal,
  Dropdown,
  Input,
} from "semantic-ui-react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaImage, FaRegCalendarAlt, FaBackspace } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "../../react-datepicker.css";
import ko from "date-fns/locale/ko";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
registerLocale("ko", ko);
const _ = require("lodash");

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
        color: #929292;
        opacity: 1;
        &.title {
          color: #2e2e2e;
        }
        &.phone-sms-area {
          height: 65px;
          width: 322px;
          display: inline-block;
          .sms-area {
            display: inline-block;
            margin-left: 40px;
            vertical-align: top;
          }
          .sms-checkbox {
            vertical-align: middle;
            margin-top: 16px;
            margin-left: 35px;
          }
          .phone-area {
            display: inline-block;
            .phone {
              color: black;
              width: 180px !important;
              &:focus {
                border-color: #f1592a !important;
              }
            }
          }
        }
        &.birth-area {
          height: 70px;
          width: 322px;
          margin-top: 5px;
          .birth-box {
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
              .birth {
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
        &.blood-area {
          width: 332px;
          height: 60px;
          margin-bottom: 10px;
          .bloodtype {
            margin-top: 5px;
            width: 170px;
            display: inline-block;
          }
          .bloodgroup {
            margin-left: 32px;
            display: inline-block;
            width: 120px;
          }
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
        opacity: 1;
        &.yes {
          color: #2e2e2e;
        }
        &.no {
          color: #929292;
        }
      }
    }
  }

  #delete-icon {
    float: right;
    margin-top: -35px;
    margin-right: 10px;
    font-size: 25px !important;
    cursor: pointer;
    &:hover {
      color: red;
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
    &.sms {
      margin-left: 0px;
    }
    &.phone {
      margin-bottom: 5px;
    }
  }

  .form-title.photo {
    margin-top: -3px;
    margin-bottom: 3px;
  }

  .photo-box {
    margin-left: -1px !important;
  }

  .input#file-upload-button {
    width: 0px !important;
    height: 0px !important;
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

const WorkerInput = ({
  onChange,
  onSelectChange,
  onChangeDate,
  createHandler,
  updateHandler,
  handleFileInputChange,
  formData,
  selectedRow,
  initFormData,
  initActiveRow,
  companyList,
  unUsedBeaconList,
  companyError,
  fileName,
  imageDeleteHandler,
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
    wk_sms_yn,
    wk_image,
    co_index,
    bc_index,
    co_name,
    bc_address,
  } = formData;

  const bloodType = [
    { key: "a", text: "A", value: "0" },
    { key: "b", text: "B", value: "1" },
    { key: "o", text: "O", value: "2" },
    { key: "ab", text: "AB", value: "3" },
  ];

  const bloodGroup = [
    { key: "+", text: "Rh+", value: "0" },
    { key: "-", text: "Rh-", value: "1" },
  ];

  const years = _.range(1945, getYear(new Date()) + 1, 1); // 수정
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
    <InputCompo className="input-compo" selectedState={wk_id}>
      <p className="subtitle">작업자 등록</p>
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
            value={formData.co_index}
            error={companyError}
            required
          />
          {companyError && <InputError>{companyError}</InputError>}
          <Form.Input
            label="직위"
            className="input-form position"
            id="wk_position"
            name="wk_position"
            placeholder="직위를 입력해주세요."
            required
            value={wk_position.replace(
              /[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g,
              ""
            )}
            onChange={onChange}
          />
          <Form.Input
            className="input-form"
            label="이름"
            className="input-form name"
            id="wk_name"
            name="wk_name"
            placeholder="이름을 입력해주세요."
            required
            value={wk_name.replace(/[^a-z|^A-Z|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g, "")}
            onChange={onChange}
          />
          <div className="input-form phone-sms-area">
            <div className="phone-area">
              <div className="form-title phone">핸드폰</div>
              <NumberFormat
                format="###-####-####"
                className="input-form phone"
                id="wk_phone"
                name="wk_phone"
                placeholder="번호를 입력해 주세요."
                required
                value={wk_phone && wk_phone}
                onChange={onChange}
              />
            </div>
            <div className="sms-area">
              <div className="form-title sms">비상알람 SMS</div>
              <Checkbox
                className="sms-checkbox"
                id="wk_sms_yn"
                name="wk_sms_yn"
                checked={wk_sms_yn}
                value={wk_sms_yn && wk_sms_yn}
                onChange={(e, value) => onSelectChange(e, value)}
              />
            </div>
          </div>
          <div className="input-form birth-area">
            <div className="form-title">생년월일</div>
            <div className="birth-box">
              <FaRegCalendarAlt className="cal-icon" />
              <div className="date-picker-box">
                <DatePicker
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="decrease-button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {"<"}
                      </div>
                      <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div
                        className="increase-button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {">"}
                      </div>
                    </div>
                  )}
                  className="input-form birth"
                  locale={ko}
                  dateFormat="yyyy.MM.dd"
                  name="wk_birth"
                  shouldCloseOnSelect
                  useWeekdaysShort
                  maxDate={new Date()}
                  selected={wk_birth ? new Date(wk_birth) : new Date()}
                  placeholder="생년월일을 입력해주세요."
                  onChange={(date) => onChangeDate(date)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="input-form blood-area">
            <div className="form-title">혈액형</div>
            <Dropdown
              fluid
              selection
              className="input-form bloodtype"
              control={Select}
              label="혈액형"
              id="wk_blood_type"
              name="wk_blood_type"
              options={bloodType}
              placeholder={"A"}
              value={formData.wk_blood_type}
              onChange={(e, value) => onSelectChange(e, value)}
              required
            />
            <Dropdown
              fluid
              selection
              className="input-form bloodgroup"
              id="wk_blood_group"
              name="wk_blood_group"
              control={Select}
              options={bloodGroup}
              placeholder={"Rh+"}
              value={formData.wk_blood_group}
              onChange={(e, value) => onSelectChange(e, value)}
              required
            />
          </div>
          <Form.Input
            label="국적"
            className="input-form nation"
            id="wk_nation"
            name="wk_nation"
            placeholder="국적을 입력해주세요."
            required
            value={wk_nation.replace(/[^a-z|^A-Z|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]*$/g, "")}
            onChange={onChange}
          />
          <Form.Field
            className="input-form beacon"
            control={Select}
            label="비콘 사용 정보"
            options={unUsedBeaconList}
            placeholder={
              formData.wk_id
                ? !formData.bc_index && "할당없음"
                : "할당할 비콘을 선택해 주세요."
            }
            name="bc_index"
            onChange={(e, value) => onSelectChange(e, value)}
            value={formData.bc_index}
            required
          />
          <Form.Field
            className="input-form photo"
            method="post"
            enctype="multipart/form-data"
          >
            <div className="form-title photo" id="photo-title-unique">
              사진
            </div>
            <label for="input-image-file" className="photo-box">
              <div className="icon-box">
                <FaImage className="photo-icon" />
              </div>
              {fileName ? (
                <div className="photo-description yes">{fileName}</div>
              ) : (
                <div className="photo-description no">
                  사진을 등록해 주세요.(jpg, png, gif)
                </div>
              )}
            </label>
            {fileName && (
              <FaBackspace id="delete-icon" onClick={imageDeleteHandler} />
            )}
            <Input
              type="file"
              id="input-image-file"
              name="file"
              className="photo-box"
              accept="image/jpg,jpge,png,gif"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
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

export default WorkerInput;
