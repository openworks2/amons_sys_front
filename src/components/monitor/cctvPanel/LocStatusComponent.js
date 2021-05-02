import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDigging, faUserHardHat, faTruck } from "@fortawesome/pro-duotone-svg-icons"


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
        
    }
`;

const LocStatusComponent = ({ processCode, planLength, digLength }) => {

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
        console.log('processCode-->', processCode);
        setState({
            name: process[processCode].name,
            color: process[processCode].color,
        })
    }, [processCode]);



    return (
        <LocStatusCompo className="location-status-component">
            <div className="state-box process-box">
                <div className="contents-box">
                    <p className="title">공정현황</p>
                    <p className="current-state" style={{ backgroundColor: currentState.color }}>{currentState.name}</p>
                </div>
            </div>
            <div className="state-box worker-box">
                <div className="contents-box">
                    <p className="title-icon worker-icon"><FontAwesomeIcon icon={faUserHardHat} /></p>
                    <p className="current-value worker-value">04</p>
                </div>
            </div>
            <div className="state-box vehicle-box">
                <div className="contents-box">
                    <p className="title-icon vehicle-icon"><FontAwesomeIcon icon={faTruck} /></p>
                    <p className="current-value vehicle-value">04</p>
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
                        }
                    </p>
                    <p className="current-value progress-value">
                        {
                            digLength > 999
                                ? digLength.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                                : digLength
                        }
                    </p>
                </div>
            </div>
        </LocStatusCompo>
    );
};

export default LocStatusComponent;