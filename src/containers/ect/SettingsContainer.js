import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SettingsInput from "../../components/ect/SettingsInput";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, putSettings } from "../../modules/settings";

const ContentsCompo = styled.div`
  min-width: 1680px !important;
  min-height: 756px;
  height: 84%;
  padding-left: 280px !important;
  padding-right: 130px;
  position: relative;
`;

const ContentsBodyCompo = styled.div`
  min-width: 1630px !important;
  min-height: 720px !important;
  width: 100%;
  overflow: auto;
  margin: 0px;
  padding: 0px;
  position: relative;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    margin: 0px;
    display: none;
  }

  .input-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 368px;
    height: 82.5vh;
    min-height: 683px;
    padding-top: 22px;
    display: inline-block;
    vertical-align: top;
  }
  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 1236px;
    height: 82.5vh;
    min-height: 683px;
    margin-left: 20px;
    padding-top: 10px;
    display: inline-block;
    vertical-align: top;
  }
`;

const ErrMsg = styled.div`
  text-align: center;
  color: green;
  vertical-align: middle;
  font-size: 24px;
  margin-top: 40vh;
`;
// ***********************************Logic Area*****************************************

const SettingsContatiner = () => {
  const { data, loading, error } = useSelector(
    (state) => state.settings.settings
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    env_index: "HH2106001",
    announce_rolling: 0,
    process_disabled: "0",
    kma_sido: "",
    kma_gun: "",
    kma_dong: "",
  });

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      let newFormData = {
        env_index: data[0].env_index,
        announce_rolling: data[0].announce_rolling / 1000,
        process_disabled: data[0].process_disabled.toString(),
        kma_sido: data[0].kma_sido,
        kma_gun: data[0].kma_gun,
        kma_dong: data[0].kma_dong,
      };
      setFormData(newFormData);
    }
  }, [data]);

  const today = new Date();

  // form onChange Event
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // 입력값 state 에 저장
    if (name === "announce_rolling") {
      let _announce_rolling = value.replace(/[^0-9]*$/g, "");
      setFormData({
        ...formData,
        announce_rolling: _announce_rolling,
      });
    }
  };

  const sidoParser = (sido) => {
    let str = "";
    switch (sido) {
      case "충남":
        str = "충청남도";
        break;
      case "충북":
        str = "충청북도";
        break;
      case "전북":
        str = "전라북도";
        break;
      case "전남":
        str = "전라남도";
        break;
      case "경북":
        str = "경상북도";
        break;
      case "경남":
        str = "경상남도";
        break;
      default:
        str = sido;
    }
    return str;
  };

  const onChangeAddress = (sido, gun, dong) => {
    const newAddressFormData = {
      ...formData,
      kma_sido: sidoParser(sido),
      kma_gun: gun,
      kma_dong: dong,
    };
    setFormData(newAddressFormData);
  };

  const onRadioChange = (e, target) => {
    let _process_disabled = target.value;

    setFormData({
      ...formData,
      process_disabled: _process_disabled,
    });
  };

  const [saveMessage, setSaveMessage] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [sliderTimeError, setSliderTimeError] = useState(null);

  // UPDATE
  const updateHandler = (e) => {
    if (!formData.kma_dong) {
      setAddressError("*주소를 검색해 주세요.");
      setTimeout(() => {
        setAddressError(undefined);
      }, 1350);
    } else if (
      formData.announce_rolling < 1 ||
      formData.announce_rolling > 10
    ) {
      setSliderTimeError("*1초에서 10초 사이의 값을 입력해주세요.");
      setTimeout(() => {
        setSliderTimeError(undefined);
      }, 1350);
    } else {
      let newSettings = {
        ...formData,
        announce_rolling: formData.announce_rolling * 1000,
      };
      dispatch(putSettings("HH2106001", newSettings));
      setSaveMessage("저장되었습니다.");
      setTimeout(() => {
        setSaveMessage(undefined);
      }, 1350);
    }
  };

  if (error) {
    return (
      <ErrMsg className="err-msg">
        통신 에러가 발생했습니다. 새로고침 버튼을 눌러보세요.
      </ErrMsg>
    );
  }

  return (
    <ContentsCompo className="contents-compo">
      <ContentsBodyCompo className="contents-body-compo">
        <div className="input-box">
          <SettingsInput
            className="settings-input-box"
            onChange={onChange}
            onRadioChange={onRadioChange}
            onChangeAddress={onChangeAddress}
            formData={formData}
            updateHandler={updateHandler}
            saveMessage={saveMessage}
            addressError={addressError}
            sliderTimeError={sliderTimeError}
          />
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default SettingsContatiner;
