import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Image } from "semantic-ui-react";
import styled from "styled-components";
import ReactAudioPlayer from 'react-audio-player';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faVolumeSlash,
  faHomeAlt,
  faDigging,
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faQuestion,
  faSignOutAlt
} from "@fortawesome/pro-solid-svg-icons"
import { useSelector } from "react-redux";

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
  .left-area{
      height: 100%;
      width: 63%;
      display: flex;
      .sidemenu-button-box{
        width: 6.15%;
        height: 100%;
        display: flex;
        justify-content:center;
        align-items: center;
        .sidemenu-button{
          width: 44px;
          height: 44px;   
          background-color:#000000;
          color:#FFFFFF;
          display: flex;
          justify-content:center;
          align-items: center;
          font-size: 15px;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .monitor-title-box{
        width: 93.85%;
        height: 100%;
        padding-left: 16px;
        display: flex;
        align-items: center;
        #site-name{
          color: #FFFFFF;
          font-size: 30px;
          font-family:"NotoSansKR-Regular";
          margin-left: 23px;
          margin-left: 23px;
        }
        #tunnel-name{
          color: #F1592A;
          font-size: 30px;
          font-family:"NotoSansKR-Regular";
          margin-left: 5px;
        }
      }
  }
  .right-area{
    height: 100%;
    width: 37%;
    display:flex;
    justify-content: flex-end;
    .shortcut-button-list{
        height: 100%;
        width: 56%;
        display:flex;
        align-items:center;
        margin-right:20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .shortcut-button-box{
          width: 45px;
          height: 83%;
          &:nth-child(n+2){
            margin-left: 24px;
          }
          .shortcut-button{
            height: 39px;
            width: 39px;
            border-radius: 47%;
            color: #FFFFFF;
            font-size: 17px;
            margin-left: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover{
              cursor: pointer;
              color: #72afd2;
            }
            &.alarm{
              background-color: #C23235;
            }
            &.home{
              background-color: #A73B1F;
            }
            &.drill{
              background-color: #686868;
            }
            &.general-screen{
              background-color: #8FC31F;
              /* opacity: 0.5; */
            }
            &.full-screen{
              background-color: #32B16C;
              /* opacity: 0.5; */
            }
            &.question{
              background-color: #305A70;
            }
          }
        }
        .button-name{
          color: #FFFFFF;
          font-family:"NotoSansKR-Regular";
          font-size:12px;
          text-align: center;
        }
    }
    .logout-button-box{
      height: 100%;
        width:9.95%;
        display:flex;
        justify-content: center;
        align-items: center;
        .logout-button{
          width: 44px;
          height: 44px;
          background-color:#000000;
          font-size: 21px;
          display:flex;
          justify-content: center;
          align-items: center;
          &:hover{
            cursor: pointer;
            color: #72afd2;
          }
          svg{
            color:#FFFFFF;
            opacity: 0.7
          }
        }
    }
  }

`;



const Header = ({
  callSideMenuHandler,
  setRatePanelHandler,
  triggerFull,
  exitFull
}) => {
  const { sosSituation } = useSelector(state => state.monitor);
  const audioTune = new Audio('/sound/싸이렌_16bit_16KHz_-고화질용-2번반복.mp3');
  const [playInLoop, setPlayInLoop] = useState(true);

  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, [])

  // set the loop of audio tune
  useEffect(() => {
    audioTune.loop = playInLoop;
    // audioTune.loop = true;
    playSound();
  }, [sosSituation])

  // play audio sound
  const playSound = () => {
    audioTune.play();
  }

  // pause audio sound
  const pauseSound = () => {
    console.log('asdfasdf')
    setPlayInLoop(false)

    audioTune.pause();
  }

  return (
    <HeaderCompo className="header-component">
      <div className="left-area">
        <div className="sidemenu-button-box">
          <div className="sidemenu-button" onClick={callSideMenuHandler}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
        <div className="monitor-title-box">
          <Image
            src="/header/company-white.png"
            alt="회사명"
            verticalAlign="middle"
            inline="true"
          />
          <span id="site-name">고속국도 제 14호선 함양-울산선(함양-합천) 건설공사(제4공구)</span>
          <span id="tunnel-name">신원3터널</span>
        </div>
      </div>
      <div className="right-area">
        <div className="shortcut-button-list">
          {
            sosSituation &&
            <div className="shortcut-button-box">
              <div className="shortcut-button alarm" onClick={pauseSound}>
                <FontAwesomeIcon icon={faVolumeSlash} />
              </div>
              <div className="button-name">알림음</div>
            </div>
          }
          <div className="shortcut-button-box">
            <div className="shortcut-button home">
              <FontAwesomeIcon icon={faHomeAlt} />
            </div>
            <div className="button-name">HOME</div>
          </div>
          <div className="shortcut-button-box">
            <div className="shortcut-button drill" onClick={setRatePanelHandler}>
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
              <FontAwesomeIcon icon={faQuestion} />
            </div>
            <div className="button-name">도움말</div>
          </div>
        </div>
        <div className="logout-button-box">
          <div className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
        </div>
      </div>
      {/* <ReactAudioPlayer
        src="/sound/싸이렌_16bit_16KHz_-고화질용-2번반복.mp3"
        autoPlay
        controls
      /> */}
    </HeaderCompo>
  );
};

export default Header;
