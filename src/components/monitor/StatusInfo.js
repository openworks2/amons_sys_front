import React from 'react';
import styled from 'styled-components';
import { faHardHat, faTruck, faChartArea } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StatusInfoCompo = styled.div`
    width: 100%;
    height: 100%;
    /* display: inline-flex; */
    .status-box{
        width: 32.66%;
        height: 100%;
        background:#000000;
        /* margin-right: 10px; */
        float: left;
        &:nth-child(2),
        &:nth-child(3) {
            margin-right: 10px;
        }
        .top-contents {
            width: 100%;
            height: 31%;
            font-family:"NanumSquareR";
            padding-top: 12px;
            padding-bottom: 12px;
            padding-left: 13px;
            .icon{
                font-size:18px;
                margin-right: 10px;
            }
            .box-title{
                font-size: 20px;
            }
            &.worker-count-top{
                color: #B97012;
            }
            &.vehicle-count-top{
                color: #3C8DBC;
            }
            &.progress-status-top{
                color: #CE3F3F;
            }
        }
        .bottom-contents{
            width: 100%;
            height: 69%;
            font-family:"NanumSquareEB";
            font-size: 60px;
            color: #FFFFFF;
            padding-right: 28px;
            text-align: end;
            &.progress-bottom{
                .progress-unit{
                    font-family:"NanumSquareR";
                    font-size:24px;
                }
                p{
                    &.progress-info-top {
                        margin-bottom: 0px;
                        height: 78%;
                    }
                    &.progress-info-bottom {
                        font-family:"NanumSquareR";
                        height: 20%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        font-size:18px;
                        .progress-total-vlaue{
                            color:#7D7D7D;
                        }
                    }
                }
            }
        }
    }
`;

const StatusInfo = () => {
    return (
        <StatusInfoCompo className="statusInfo-component">
            <i class="fas fa-hard-hat"></i>
            <div className="status-box">
                <div className="top-contents worker-count-top">
                    <span className="icon"><FontAwesomeIcon icon={faHardHat} /></span>
                    <span className="box-title">총 잔류인원</span>
                </div>
                <div className="bottom-contents">
                    <p className="worker-count">12</p>
                </div>
            </div>
            <div className="status-box">
                <div className="top-contents vehicle-count-top">
                    <span className="icon"><FontAwesomeIcon icon={faTruck} /></span>
                    <span className="box-title">총 잔류차량</span>
                </div>
                <div className="bottom-contents">
                    <p className="vehicle-count">12</p>
                </div>
            </div>
            <div className="status-box">
                <div className="top-contents progress-status-top">
                    <span className="icon"><FontAwesomeIcon icon={faChartArea} /></span>
                    <span className="box-title">총 굴진현황</span>
                </div>
                <div className="bottom-contents progress-bottom">
                    <p className="progress-info-top">
                        <span className="progress-value">18</span>
                        <span className="progress-unit">%</span>
                    </p>
                    <p className="progress-info-bottom">
                        <span className="progress-current-value">1,233</span>/
                        <span className="progress-total-vlaue">6,738m</span>
                    </p>
                </div>
            </div>
        </StatusInfoCompo>
    );
};

export default StatusInfo;