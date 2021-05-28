import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Form, Button, Radio, Input, Modal } from "semantic-ui-react";
import DaumPostcode from "react-daum-postcode";

const InputCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;

  .ui.form input,
  .ui.form .field .ui.input input {
    font-family: "NotoSansKR-Regular";
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
      @media screen and (max-height: 970px) {
        height: 68vh;
      }
      &::-webkit-scrollbar {
        display: none;
      }
      overflow: auto;
      @media screen and (max-height: 970px) {
        height: 67.5vh;
      }
      .form-title.time {
        margin: 8px;
      }
      .input-form.time {
        width: 160px !important;
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
        &.address {
          cursor: default;
        }
      }
      .role-area {
        height: 50px;
        margin-bottom: 10px;
        .radio-row {
          margin: 10px;
          margin-left: 5px;
          &.two {
            margin-left: 15px;
          }
        }
      }
    }
  }

  .ui.form textarea {
    &:focus {
      border-color: #f1592a !important;
      color: black;
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
    color: black !important;
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
    @media screen and (max-height: 970px) {
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
    @media screen and (max-height: 970px) {
      top: 68vh;
    }
    &:focus {
      background-color: #f1592f;
      color: #ffffff;
    }
  }
  .ui.form .field .prompt.label {
    //에러 색상
    display: none;
  }
  .address-search-button {
    position: absolute;
    top: 24px;
    right: 0px;
    height: 39px;
    width: 100px;
    border: 1px solid;
    border-radius: 0px 6px 6px 0px;
    vertical-align: middle;
    text-align: center;
    padding: 8px;
    background-color: #f1592f;
    color: #ffffff;
    cursor: pointer;
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
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
const TimeError = styled.div`
  margin-bottom: -4px;
  margin-top: 0px;
  font-family: "NotoSansKR-Regular";
  font-size: 13px;
  text-align: left;
  letter-spacing: 0.65px;
  color: #ff0000;
  opacity: 1;
`;

const SettingsInput = ({
  onChange,
  onRadioChange,
  onChangeAddress,
  formData,
  updateHandler,
  saveMessage,
  addressError,
  sliderTimeError,
}) => {
  const {
    env_index,
    announce_rolling,
    process_disabled,
    kma_sido,
    kma_gun,
    kma_dong,
  } = formData;

  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onChangeAddress(data.sido, data.sigungu.replace(/ /gi, ""), data.bname);

    setIsZoneCode(data);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
  };

  const onClickAddressSearch = (e) => {
    e.stopPropagation();
    setIsPostOpen(true);
  };

  const postCodeStyle = {
    display: "block",
    border: "solid 2px",
    width: "560px",
    paddingTop: "7px",
    paddingBottom: "7px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  };

  return (
    <InputCompo className="input-compo">
      <p className="subtitle">환경설정</p>
      <Form className="input-form-body">
        <div className="resizable-area">
          <Form.Input
            label="주소등록(날씨조회)"
            className="input-form address"
            id="address"
            name="address"
            placeholder="주소를 검색해주세요."
            value={
              (kma_sido && kma_sido) +
              " " +
              (kma_gun && kma_gun) +
              " " +
              (kma_dong && kma_dong)
            }
            readOnly
          />
          {addressError && <InputError>{addressError}</InputError>}
          <div className="address-search-button" onClick={onClickAddressSearch}>
            주소검색
          </div>
          <div className="role-area">
            <div className="form-title role">작업공정 표시</div>
            <Radio
              label="사용"
              className="radio-row one"
              id="process-abled"
              name="radioGroup"
              value={"1"}
              checked={process_disabled && process_disabled === "1"}
              onChange={(e, target) => onRadioChange(e, target)}
            />
            <Radio
              label="미사용"
              className="radio-row two"
              id="process-disabled"
              name="radioGroup"
              value={"0"}
              checked={process_disabled && process_disabled === "0"}
              onChange={(e, target) => onRadioChange(e, target)}
            />
          </div>
          <div className="time-area">
            <div className="form-title time">공지사항 (Slider Time)</div>
            <Input
              label={{ basic: true, content: "초" }}
              labelPosition="right"
              className="input-form time"
              id="announce_rolling"
              name="announce_rolling"
              placeholder="슬라이더 시간"
              required
              value={announce_rolling && announce_rolling}
              onChange={onChange}
            />
            {sliderTimeError && <TimeError>{sliderTimeError}</TimeError>}
          </div>
        </div>
        {saveMessage ? (
          <Button
            className="modify-button check"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {saveMessage}
          </Button>
        ) : (
          <Button
            className="modify-button"
            onClick={(e) => {
              e.stopPropagation();
              updateHandler();
            }}
          >
            저장
          </Button>
        )}
      </Form>
      <Modal
        className="address-modal"
        onClose={() => setIsPostOpen(false)}
        onOpen={() => setIsPostOpen(true)}
        open={isPostOpen}
      >
        <Modal.Header className="confirm-modal header">주소 검색</Modal.Header>
        <Modal.Content className="confirm-modal content">
          <Modal.Description className="confirm-modal description">
            <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className="confirm-modal actions">
          <Button
            className="confirm-modal button cancel"
            color="black"
            onClick={() => {
              setIsPostOpen(false);
            }}
          >
            입력 취소
          </Button>
        </Modal.Actions>
      </Modal>
    </InputCompo>
  );
};

export default SettingsInput;
