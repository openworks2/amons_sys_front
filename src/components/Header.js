import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Image } from "semantic-ui-react";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faVolumeSlash,
  faHomeAlt,
  faDigging,
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faQuestion,
  faSignOutAlt,
} from "@fortawesome/pro-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setInitSOSSituation } from "../modules/monitor";
import { CLIENT } from "../lib/server.config";

const HeaderCompo = styled.div`
  position: fixed !important;
  z-index: 1;
  margin-bottom: 70px;
  min-width: 1920px;
  min-height: 70px;
  width: 100%;
  height: 70px;
  background: #2e2e2e;
  opacity: 1;
  display: flex;
  z-index: 1001;
  .left-area {
    height: 100%;
    width: 63%;
    display: flex;
    .sidemenu-button-box {
      width: 6.15%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .sidemenu-button {
        width: 44px;
        height: 44px;
        background-color: #000000;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        #sidemenu-disabled {
          color: #2e2e2e;
        }
        &:hover {
          cursor: pointer;
          color: #f1592a;
        }
      }
    }
    .monitor-title-box {
      width: 93.85%;
      height: 100%;
      padding-left: 16px;
      display: flex;
      align-items: center;
      #site-name {
        color: #ffffff;
        font-size: 30px;
        font-family: "NotoSansKR-Regular";
        margin-left: 23px;
        margin-left: 23px;
      }
      #tunnel-name {
        color: #f1592a;
        font-size: 30px;
        font-family: "NotoSansKR-Regular";
        margin-left: 5px;
      }
    }
  }
  .right-area {
    height: 100%;
    width: 37%;
    display: flex;
    justify-content: flex-end;
    .shortcut-button-list {
      height: 100%;
      width: 56%;
      display: flex;
      align-items: center;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .shortcut-button-box {
        width: 45px;
        height: 83%;
        &:nth-child(n + 2) {
          margin-left: 24px;
        }
        .shortcut-button {
          height: 39px;
          width: 39px;
          border-radius: 47%;
          color: #ffffff;
          font-size: 17px;
          margin-left: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            cursor: pointer;
            color: #72afd2;
            /* color: #f1592a; */
          }
          &.alarm {
            background-color: #c23235;
          }
          &.home {
            background-color: #a73b1f;
          }
          &.drill {
            background-color: #686868;
          }
          &.general-screen {
            background-color: #8fc31f;
            /* opacity: 0.5; */
          }
          &.full-screen {
            background-color: #32b16c;
            /* opacity: 0.5; */
          }
          &.question {
            background-color: #305a70;
          }
        }
      }
      .button-name {
        color: #ffffff;
        font-family: "NotoSansKR-Regular";
        font-size: 12px;
        text-align: center;
      }
    }
    .logout-button-box {
      height: 100%;
      width: 9.95%;
      display: flex;
      justify-content: center;
      align-items: center;
      .logout-button {
        width: 44px;
        height: 44px;
        background-color: #000000;
        font-size: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          cursor: pointer;
          color: #72afd2;
        }
        svg {
          color: #ffffff;
          opacity: 0.7;
          &:hover {
            color: #f1592a;
          }
        }
      }
    }
  }
  a {
    color: #fff;
    &:hover {
      cursor: pointer;
      color: #72afd2;
    }
  }
`;

const Header = ({
  callSideMenuHandler,
  setRatePanelHandler,
  triggerFull,
  exitFull,
  onLogout,
  currentUrl,
}) => {
  const { sosSituation } = useSelector((state) => state.monitor);

  const dispatch = useDispatch();

  // load audio file on component load
  useEffect(() => { }, []);

  // set the loop of audio tune
  useEffect(() => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    if (sosSituation) {
      // playSound();
      setTimeout(() => {
        audioEl.loop = true;
        audioEl.play();
      }, 2000);
    } else {
      // pauseSound();
      audioEl.pause();
    }
  }, [sosSituation]);

  const sosAlarmOffHandler = () => {
    dispatch(setInitSOSSituation());
  };

  return (
    <HeaderCompo className="header-component">
      <div className="left-area">
        <div className="sidemenu-button-box">
          <div className="sidemenu-button" onClick={callSideMenuHandler}>
            {currentUrl !== "home" && currentUrl !== "monitor" ? (
              <FontAwesomeIcon icon={faBars} id="sidemenu-disabled" />
            ) : (
              <FontAwesomeIcon icon={faBars} id="sidemenu-abled" />
            )}
          </div>
        </div>
        <div className="monitor-title-box">
          <Image
            src="/header/company-white.png"
            alt="회사명"
            verticalAlign="middle"
            inline="true"
          />
          <span id="site-name">
            고속국도 제 14호선 함양-울산선(함양-합천) 건설공사(제4공구)
          </span>
          <span id="tunnel-name">신원3터널</span>
        </div>
      </div>
      <div className="right-area">
        <div className="shortcut-button-list">
          {sosSituation && (
            <div className="shortcut-button-box">
              <div
                className="shortcut-button alarm"
                onClick={sosAlarmOffHandler}
              >
                <FontAwesomeIcon icon={faVolumeSlash} />
              </div>
              <div className="button-name">알림음</div>
            </div>
          )}
          <div className="shortcut-button-box">
            <Link to="/amons/home">
              <div className="shortcut-button home">
                <FontAwesomeIcon icon={faHomeAlt} />
              </div>
            </Link>

            <div className="button-name">HOME</div>
          </div>
          <div className="shortcut-button-box">
            <div
              className="shortcut-button drill"
              onClick={setRatePanelHandler}
            >
              <FontAwesomeIcon icon={faDigging} />
            </div>
            <div className="button-name">굴진율</div>
          </div>
          <div className="shortcut-button-box">
            <div className="shortcut-button general-screen" onClick={exitFull}>
              <FontAwesomeIcon icon={faCompressArrowsAlt} />
            </div>
            <div className="button-name">일반화면</div>
          </div>
          <div className="shortcut-button-box">
            <div className="shortcut-button full-screen" onClick={triggerFull}>
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </div>
            <div className="button-name">전체화면</div>
          </div>
          <div className="shortcut-button-box question">
            <div className="shortcut-button question">
              <a href={`${CLIENT}/함양-합천 4공구 신원3터널_매뉴얼.pdf`} download> <FontAwesomeIcon icon={faQuestion} /></a>
            </div>
            <div className="button-name">도움말</div>
          </div>
        </div>
        <div className="logout-button-box">
          <Link to="/amons/signin">
            <div className="logout-button" onClick={onLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
          </Link>
        </div>
      </div>

      <audio className="audio-element">
        <source src="/sound/siren_repeat_2.mp3"></source>
      </audio>
    </HeaderCompo>
  );
};

export default Header;
