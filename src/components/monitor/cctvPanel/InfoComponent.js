import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRouter, faList, faArrows } from "@fortawesome/pro-duotone-svg-icons";

const InfoCompo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color:#000000;
    .left-box {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 22px;
        img {
            margin-right: 13px;
        }
        span{
            font-family: "NanumSquareR";
            font-size: 22px;
            color: #ffffff;
        }
    }
    .right-box{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        .nms-box {
            height: 100%;
            width: 45%;
            display: flex;
            justify-content: flex-end;
            padding-top: 14px;
            margin-right: 12px;
            div.nms-status{
                &.on{
                    color:#036EB8;
                }
                &.off{
                    color:#2E2E2E;
                }
                p.scanner-icon{
                    font-size: 22px;
                    margin-bottom: 0px;
                    margin-left: 7px;
                }
                p.scanner-text{
                    font-family: "NanumSquareB";
                    font-size: 12px;
                    margin-bottom: 0px;
                    margin-left: 10px;
                }
            }
        }
        .optional-box {
            width: 52%;
            display:flex;
            padding-right: 11px;
            padding-top: 0px;
            margin-top: 13px; 
            div.detail-panel-button,
            div.ptz-control-button{
                width:44px;
                height:44px;
                color: #ABABAB;
                border-radius: 4px;
                background-color:#2E2E2E;
                text-align:center;
                padding-top: 5px;
                margin-left: 6px;
                .optional-icon{
                    font-size: 18px;
                }
                .optional-name{
                    font-family:"NotoSansKR-Regular";
                    font-size: 12px;
                    letter-spacing: 0.3px;
                    font-weight: 100;
                }
                &:hover{
                    cursor: pointer;
                    color:#036EB8;
                    background-color:#1e1e1e;
                }
            }
        }
    }
`;
const InfoComponent = ({ way, id, openCtrlPanel }) => {
    return (
        <InfoCompo className="info-component">
            <div className="left-box">
                <img src={`../../../image/${way === 'left' ? 'arrow_left.png' : 'arrow-right.png'}`} alt="이미지"></img>
                <span>시점 함양</span>
            </div>
            <div className="right-box">
                <div className="nms-box">
                    <div className="nms-status on">
                        <p className="scanner-icon"><FontAwesomeIcon icon={faRouter} /></p>
                        <p className="scanner-text">ON</p>
                    </div>
                    <div className="nms-status off">
                        <p className="scanner-icon"><FontAwesomeIcon icon={faRouter} /></p>
                        <p className="scanner-text">OFF</p>
                    </div>
                </div>
                <div className="optional-box">
                    <div className="detail-panel-button">
                        <div className="optional-icon"><FontAwesomeIcon icon={faList} /></div>
                        <div className="optional-name">LIST</div>
                    </div>
                    <div className="ptz-control-button" onClick={()=>openCtrlPanel(id)}>
                        <div className="optional-icon"><FontAwesomeIcon icon={faArrows} /></div>
                        <div className="optional-name">CCTV</div>
                    </div>
                </div>
            </div>
        </InfoCompo>
    );
};

export default InfoComponent;