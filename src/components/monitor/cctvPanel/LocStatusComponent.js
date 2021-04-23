import React from 'react';
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
const LocStatusComponent = () => {
    return (
        <LocStatusCompo className="location-status-component">
        <div className="state-box process-box">
            <div className="contents-box">
                <p className="title">공정현황</p>
                <p className="current-state">버력처리</p>
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
                <p className="total-progress-value">2,542</p>
                <p className="current-value progress-value">1,020</p>
            </div>
        </div>
    </LocStatusCompo>
    );
};

export default LocStatusComponent;