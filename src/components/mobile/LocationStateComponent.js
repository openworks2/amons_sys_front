import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { faDigging, faUserHardHat, faTruck } from "@fortawesome/pro-duotone-svg-icons";
import CircularProgressBar from './CircularProgressBar';
import { Link } from 'react-router-dom';
const LocationStateCompo = styled.div`
    width: 100%;
    height: 100%;
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
                a{
                    width: 48.5%;
                    &:nth-child(2){
                        margin-left: 10px;
                    }
                }
                .ble-panel{
                    height:100%;
                    width: 100%;
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
`;

const LocationStateComponent = ({ localData, locationAct, locBleList }) => {

    const { local_index, local_name, plan_length, dig_length, local_process } = localData;

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

    const [bleCount, setCount] = useState({
        worker: 0,
        vehicle: 0
    });

    useEffect(() => {
        setState({
            name: process[local_process].name,
            color: process[local_process].color,
        });
    }, []);

    useEffect(() => {
        setBleCountBinding();
        console.log('ble-->', locBleList)
    }, [locBleList]);

    // 천단위 콤마
    const numberOfDigitsHandler = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    };

    const percentCalc = (dig, plan) => {
        const percent = (dig / plan) * 100;
        const diviPercent = Math.round(percent * 10) / 10;
        return diviPercent;
    };


    const setBleCountBinding = () => {
        let wkCount = 0;
        let vhCount = 0;
        locBleList.map(item => {
            if (item.wk_id) {
                wkCount += 1;
            }
            else if (item.vh_id) {
                vhCount += 1;
            }
            return item;
        });
        setCount({
            worker: wkCount,
            vehicle: vhCount
        })

    }

    return (
        <LocationStateCompo className="location-state-component">
            <div className="contents-component">
                <div className="contents-top">
                    <div className="contents-title">공정현황</div>
                    <div className="contents-box">
                        <div className="process-value" style={{ backgroundColor: currentState.color }}>{currentState.name}</div>
                    </div>
                </div>
                <div className="contents-center">
                    <Link to={`/amons/access/worker/${local_index}`}>
                        <div className="ble-panel worker">
                            <span className="panel-icon"><FontAwesomeIcon icon={faUserHardHat} /></span>
                            <div className="panel-value-box">
                                <div className="ble-value">{`${bleCount.worker < 10 ? `0${bleCount.worker}` : bleCount.worker}명`}</div>
                                <div className="ble-name">막장인원</div>
                            </div>
                        </div>
                    </Link>
                    <Link to={`/amons/access/vehicle/${local_index}`}>
                        <div className="ble-panel vehicle">
                            <span className="panel-icon"><FontAwesomeIcon icon={faTruck} /></span>
                            <div className="panel-value-box">
                                <div className="ble-value">{`${bleCount.vehicle < 10 ? `0${bleCount.vehicle}` : bleCount.vehicle}대`}</div>
                                <div className="ble-name">막장차량</div>
                            </div>
                        </div>
                    </Link>
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
        </LocationStateCompo>
    );
};

export default React.memo(LocationStateComponent);