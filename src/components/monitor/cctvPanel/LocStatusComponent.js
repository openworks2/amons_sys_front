import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDigging, faUserHardHat, faTruck, faRouter } from "@fortawesome/pro-duotone-svg-icons"


const LocStatusCompo = styled.div`
    width: 100%;
    height: 100%;
    /* background-color:aliceblue; */
    display: flex;
    justify-content: center;
    align-items: center;
    div.state-box{
        width: 99px;
        height: 99px;
        border: 1px solid #000000;
        display: flex;
        justify-content:center;
        align-items: center;
        &:nth-child(n+2){
            margin-left:7px;
        }
        .contents-box{
            width: 75%;
            text-align: center;
            p{
                margin-bottom:0px;
            }
            .title-icon{
                font-size: 21px;
                &.worker-icon{
                color: #B97012;
                }
                &.vehicle-icon{
                    color: #3C8DBC;
                }
                &.progress-icon{
                    color: #CE3F3F;
                    height: 25px;
                }
            }
            .current-value{
                font-size: 26px;
                font-family:"NotoSansKR-Regular";
                color:#FFFFFF;
            }
            .value-unit{
                font-size: 15px;
                font-family:"NotoSansKR-Regular";
                color:#FFFFFF;
            }
        }
        &.process-box{
            font-family:"NotoSansKR-Regular";
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            .contents-box {
                width: 70px;
                text-align: center;
                p.title{
                    color: #ABABAB;
                    font-size:15px;
                    margin-bottom: 0px;
                    margin-bottom: 8px;
                }
                p.current-state{
                    width:70px;
                    height: 30px;
                    border-radius: 3px;
                    background-color:#375795;
                    font-size: 13px;
                    margin-bottom: 0px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #FFFFFF;
                    font-weight: 100;
                }
            }
        }
        &.progress-box{
            p.total-progress-value {
                font-family:"NotoSansKR-Regular";
                font-size: 12px;
                color: #7C7C7C;
                height: 10px;
            }
        }
        &.nms-box{
            p.nms-title{
                font-family:"NotoSansKR-Regular";
                color: #ABABAB;
                font-size:15px;
            }
            .nms-status-box {
                display: flex;
                div{
                    width: 50%;
                }
                .nms-status{
                    &.on{
                        color:#036EB8;
                    }
                    &.off{
                        color:#7C7C7C;
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
        }
        
    }
`;

const LocStatusComponent = ({ processCode, planLength, digLength, bleData, scanner, processDisabled }) => {

    const [bleCount, setCount] = useState({
        worker: 0,
        vehicle: 0
    });

    const setBleCountBinding = () => {
        let wkCount = 0;
        let vhCount = 0;
        bleData.map(item => {
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
            name: process[processCode].name,
            color: process[processCode].color,
        });
        if (bleData) {
            setBleCountBinding();
        }
    }, [processCode, bleData]);

    const scannerListRender = (items = []) => {
        const _Component = items.map((item) => {
            return <div key={item.scn_id}>
                <div className={item.scn_result === 'open' ? "nms-status on" : "nms-status off"}>
                    <p className="scanner-icon"><FontAwesomeIcon icon={faRouter} /></p>
                    <p className="scanner-text">{item.scn_result === 'open' ? 'ON' : 'OFF'}</p>
                </div>
            </div>
        })
        return _Component
    }

    useEffect(() => {
    }, [scanner]);


    return (
        <LocStatusCompo className="location-status-component">
            {
                processDisabled === 1 &&
                <div className="state-box process-box">
                    <div className="contents-box">
                        <p className="title">공정현황</p>
                        <p className="current-state" style={{ backgroundColor: currentState.color }}>{currentState.name}</p>
                    </div>
                </div>
            }
            <div className="state-box worker-box">
                <div className="contents-box">
                    <p className="title-icon worker-icon"><FontAwesomeIcon icon={faUserHardHat} /></p>
                    <span className="current-value worker-value">{bleCount.worker < 10 ? `0${bleCount.worker}` : bleCount.worker}</span>
                    &nbsp;
                    <span className="value-unit">명</span>
                </div>
            </div>
            <div className="state-box vehicle-box">
                <div className="contents-box">
                    <p className="title-icon vehicle-icon"><FontAwesomeIcon icon={faTruck} /></p>
                    <span className="current-value vehicle-value">{bleCount.vehicle < 10 ? `0${bleCount.vehicle}` : bleCount.vehicle}</span>
                    &nbsp;
                    <span className="value-unit">대</span>
                </div>
            </div>
            <div className="state-box progress-box">
                <div className="contents-box">
                    <p className="title-icon progress-icon"><FontAwesomeIcon icon={faDigging} /></p>
                    <p className="total-progress-value">
                        {
                            planLength > 999
                                ? planLength.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                                : planLength
                        }m
                    </p>
                    <span className="current-value progress-value">
                        {
                            digLength > 999
                                ? digLength.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                                : digLength
                        }
                    </span>
                    &nbsp;
                    <span className="value-unit">m</span>
                </div>
            </div>
            {
                processDisabled === 0 &&
                <div className="state-box nms-box">
                    <div className="contents-box">
                        <p className="title-icon nms-title">막장 스캐너</p>
                        <div className="nms-status-box">
                            {
                                scanner && scannerListRender(scanner)
                            }
                        </div>
                    </div>
                </div>
            }
        </LocStatusCompo>
    );
};

export default LocStatusComponent;