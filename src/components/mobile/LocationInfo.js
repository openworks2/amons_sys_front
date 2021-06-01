import { faRouter } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { faDigging, faUserHardHat, faTruck } from "@fortawesome/pro-duotone-svg-icons";
import CircularProgressBar from './CircularProgressBar';
import { Link } from 'react-router-dom';

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
                        /* background-color: #375795; */
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
                        font-size: 19px;
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
                display: flex;
                .panel-icon{
                    font-size: 20px;
                    position: absolute;
                    left: 12px;
                    top: 10px;
                    color: #CE3F3F;
                }
                .left-area {
                    width: 62.5%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .right-area {
                    width: 37.5%;
                    height: 100%;
                    font-family: NotoSansKR-Regular;
                    .title-box {
                        width: 100%;
                        height: 22%;
                        color: #ABABAB;
                        font-size: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding-right: 14px;
                        font-weight: 100;
                    }
                    .contents-box {
                        width: 100%;
                        height: 78%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        .value-box{
                            text-align: end;
                            padding-right: 14px;
                            p.plan-langth-value{
                                font-size: 16px;
                                color: #7C7C7C;
                                margin-bottom: 0px;
                                height: 20px;
                            }
                            p.dig-langth-value{
                                font-size: 28px;
                                color: #FFFFFF;
                                height: 33px;
                            }
                        }
                    }
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

const LocationInfo = ({ localData, scanner, beacon }) => {
    console.log('localData--->', localData);
    console.log('scanner--->', scanner);
    console.log('data--->', beacon);
    const { local_name, plan_length, dig_length, local_process } = localData;
    const { data:scannerData } = scanner;
    const { data:beaconData } = beacon;


    const [process, setProcess] = useState({
        1: { name: '미착공', color: '#286e41' },
        2: { name: '천공', color: '#7c3795' },
        3: { name: '장약', color: '#636363' },
        4: { name: '발파', color: '#971717' },
        5: { name: '버력처리', color: '#375795' },
        6: { name: '숏크리트', color: '#7c4c17' },
        7: { name: '강지보', color: '#707017' },
        8: { name: '격자지보', color: '#a1922b' },
        9: { name: '록볼트', color: '#175c59' },
        10: { name: '방수시트', color: '#1b2f54' },
        11: { name: '라이닝', color: '#3c3a3a' },
        12: { name: '근무교대', color: '#407d23' },
        13: { name: '장비점검', color: '#4c7e7c' },
        14: { name: '기타', color: '#351c3e' }
    })

    const [currentState, setState] = useState({
        name: '',
        color: '',
    })

    useEffect(() => {
        setState({
            name: process[local_process].name,
            color: process[local_process].color,
        });
    }, [localData]);

    // 천단위 콤마
    const numberOfDigitsHandler = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }

    const percentCalc = (dig, plan) => {
        const percent = (dig / plan) * 100;
        const diviPercent = Math.round(percent * 10) / 10;
        return diviPercent;
    };



    return (
        <LocationInfoCompo>
            <div className="contents-header">
                <div className="header-left">
                    <div className="location-info">
                        <p className="location-name">{local_name}</p>
                        <p className="planDrill-text">{`계획연장 ${numberOfDigitsHandler(plan_length)}m`}</p>
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
                            <div className="process-value" style={{ backgroundColor: currentState.color }}>{currentState.name}</div>
                        </div>
                    </div>
                    <div className="contents-center">
                        <div className="ble-panel worker">
                            <span className="panel-icon"><FontAwesomeIcon icon={faUserHardHat} /></span>
                            <Link to="/amons/m.home/worker">
                                <div className="panel-value-box">
                                    <div className="ble-value">{`04명`}</div>
                                    <div className="ble-name">막장인원</div>
                                </div>
                            </Link>
                        </div>
                        <div className="ble-panel vehicle">
                            <span className="panel-icon"><FontAwesomeIcon icon={faTruck} /></span>
                            <Link to="/amons/m.home/vehicle">
                                <div className="panel-value-box">
                                    <div className="ble-value">{`04대`}</div>
                                    <div className="ble-name">막장차량</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="contents-bottom">
                        <span className="panel-icon"><FontAwesomeIcon icon={faDigging} /></span>
                        <div className="left-area">
                            <CircularProgressBar
                                sqSize={128}
                                percentage={percentCalc(dig_length, plan_length)}
                                strokeWidth={8}
                            />
                        </div>
                        <div className="right-area">
                            <div className="title-box">굴진현황</div>
                            <div className="contents-box">
                                <div className="value-box">
                                    <p className="plan-langth-value">{`${numberOfDigitsHandler(plan_length)}m`}</p>
                                    <p className="dig-langth-value">{`${numberOfDigitsHandler(dig_length)}m`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LocationInfoCompo>
    );
};

export default LocationInfo;