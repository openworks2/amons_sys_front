import { faRouter } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { faDigging, faUserHardHat, faTruck } from "@fortawesome/pro-duotone-svg-icons";

const LocationInfoCompo = styled.div`
    width: 100%;
    height: 100%;
    .contents-header {
        width: 100%;
        height: calc(100% - 362px);
        display: flex;
        min-height: 100px;
        .header-left {
            width: 66.2%;
            height: 100%;
            font-family: NotoSansKR-Medium;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 9.45vw;
            p{
                margin: 0;
                &.location-name{
                    font-size: 6.7vw;
                    color: #2E2E2E;
                }
                &.planDrill-text{
                    font-size: 12px;
                    color:#7C7C7C;
                }
            }
        }
        .header-right {
            width: 34.8%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .nms-devcie-list{
                display: flex;
                .nms-status{
                    width: 26px;
                    text-align: center;
                    margin-right: 13px;
                    &.on{
                        color:#036EB8;
                    }
                    &.off{
                        color:#7C7C7C;
                    }
                    p{
                        margin: 0;
                        &.scanner-icon{
                            font-size: 22px;
                        }
                        &.scanner-text{
                            font-family: NanumSquareB;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
    .contents-body {
        width: 100%;
        height: 362px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
        .contents-component{
            width: 100%;
            height: 100%;
            /* background-color: gray; */

            .contents-top{
                height: 14.3%;
                display: flex;
                border-radius: 4px;
                font-family: NotoSansKR-Regular;
                background-color: #2E2E2E;
                margin-bottom: 10px;
            
                .contents-title{
                    width: 69.3%;
                    height: 100%;
                    /* background-color:yellow; */
                    border-radius: inherit;
                    font-size: 4.2vw;
                    color: #D8D8D8;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding-left: 4.7%;
                }
                .contents-box{
                    width: 30.7%;
                    height: 100%;
                    /* background-color: aliceblue; */
                    border-radius: inherit;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .process-value{
                        width: 71%;
                        height: 30px;
                        min-width: 70px;
                        max-width: 90px;
                        background-color: #375795;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 3px;
                        font-size: 13px;
                        color: #FFFFFF;
                    }
                }
            }
            .contents-center {
                width: 100%;
                height: 100px;
                display: flex;
                margin-bottom: 10px;
                .ble-panel{
                    height:100%;
                    width: 50%;
                    background-color: #2E2E2E;
                    border-radius: 4px;
                    position: relative;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    padding-right: 3.1%;
                    padding-bottom: 3.1%;
                    font-family: NotoSansKR-Regular;
                    &.worker{
                        margin-right: 10px;
                        color: #A9660F;
                    }
                    &.vehicle{
                        color: #3987B4;
                    }
                    .panel-icon{
                        font-size: 17px;
                        position: absolute;
                        left: 12px;
                        top: 10px;
                    }
                    .panel-value-box {
                        width: 70px;
                        height: 63px;
                        text-align: center;
                        .ble-value{
                            font-size: 28px;
                            color: #FFFFFF;
                        }
                        .ble-name{
                            font-size: 15px;
                            color: #ABABAB;
                        }
                    }
                }
            }
            .contents-bottom{
                width: 100%;
                height: 182px;
                border-radius: 4px;
                background-color: #2E2E2E;
                position: relative;
                .panel-icon{
                    font-size: 17px;
                    position: absolute;
                    left: 12px;
                    top: 10px;
                    color: #CE3F3F;
                }
            }
        }
    }

    @media screen and (min-width:600px) {
        p.location-name{
            font-size: 40px !important;
        }
        .contents-title{
            font-size: 25px !important;
        }
        .contents-box{
            justify-content: flex-end !important;
            padding-right: 4%;
        }
        .ble-panel{
            padding-right: 17.3px !important;
            padding-bottom: 17.3px !important;
        }
        .panel-icon{
            font-size: 20px !important;
        }
    }
    @media screen and (min-height:652px) and (max-height:773px) {
        .contents-header{
            height: calc(100% - 353px) !important;
        }

    }
    @media screen and (min-height:774px) {
        .contents-header{
            height: calc(100% - 349px) !important;
        }
    }
`;

const LocationInfo = () => {
    return (
        <LocationInfoCompo>
            <div className="contents-header">
                <div className="header-left">
                    <div className="location-info">
                        <p className="location-name">시점 함양</p>
                        <p className="planDrill-text">{`계획연장 2,542m`}</p>
                    </div>
                </div>
                <div className="header-right">
                    <div className="nms-devcie-list">
                        <div className="nms-status on">
                            <p className="scanner-icon"><FontAwesomeIcon icon={faRouter} /></p>
                            <p className="scanner-text">ON</p>
                        </div>
                        <div className="nms-status off">
                            <p className="scanner-icon"><FontAwesomeIcon icon={faRouter} /></p>
                            <p className="scanner-text">OFF</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contents-body">
                <div className="contents-component">
                    <div className="contents-top">
                        <div className="contents-title">공정현황</div>
                        <div className="contents-box">
                            <div className="process-value">버력처리</div>
                        </div>
                    </div>
                    <div className="contents-center">
                        <div className="ble-panel worker">
                            <span className="panel-icon"><FontAwesomeIcon icon={faUserHardHat} /></span>
                            <div className="panel-value-box">
                                <div className="ble-value">{`04명`}</div>
                                <div className="ble-name">막장인원</div>
                            </div>
                        </div>
                        <div className="ble-panel vehicle">
                            <span className="panel-icon"><FontAwesomeIcon icon={faTruck} /></span>
                            <div className="panel-value-box">
                                <div className="ble-value">{`04대`}</div>
                                <div className="ble-name">막장차량</div>
                            </div>
                        </div>
                    </div>
                    <div className="contents-bottom">
                        <span className="panel-icon"><FontAwesomeIcon icon={faDigging} /></span>

                    </div>
                </div>
            </div>
        </LocationInfoCompo>
    );
};

export default LocationInfo;