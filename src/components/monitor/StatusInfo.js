import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDigging, faUserHardHat, faTruck } from "@fortawesome/pro-duotone-svg-icons"

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
            padding-left: 22px;
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
            color: #FFFFFF;
            /* padding-right: 28px; */
            /* text-align: end; */
            display: flex;
            .bottom-left {
                width: 50%;
                height: 100%;
                padding-left: 29px;
            }
            .bottom-right {
                width: 50%;
                height: 100%;
                font-size: 60px;
                display: flex;
                justify-content: flex-end;
                padding-right: 22px;
                &.progress-bottom-right{
                    display:block;
                    /* padding-bottom: 9.5px; */
                }
            }
            p{
                height: 100%;
                display: flex;
                align-items: center;
                /* padding-right: 0px; */
                padding-bottom: 31px;
                &.icon{
                    font-size: 35px;
                    padding-bottom: 20px;
                    &.worker-icon{
                        color: #B97012;
                    }
                    &.vehicle-icon{
                        color: #3C8DBC;
                    }
                    &.progress-icon{
                        color: #CE3F3F;
                    }
                }
            }
            .value {
                font-family:"NanumSquareEB";
                font-size: 60px;
                color: #FFFFFF;
            }
            .unit {
                font-family:"NanumSquareR";
                font-size: 24px;
                color:#FFFFFF;
                margin-top: 20px;
                margin-left: 3px;
            }

            &.progress-bottom{
                .progress-unit{
                    font-family:"NanumSquareR";
                    font-size:24px;
                }
                p{
                    &.progress-info-top {
                        margin-bottom: 0px;
                        height: 78%;
                        display: flex;
                        justify-content: flex-end;
                        padding-bottom: 15px;
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

const StatusInfo = ({ localInfo, bleData }) => {

    const [drillStatus, setDrillStatus] = useState({
        total: 0,
        drill: 0,
    });

    const [bleCount, setCount] = useState({
        worker: 0,
        vehicle: 0
    });


    // 천단위 콤마
    const numberOfDigitsHandler = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }

    const binding = () => {
        let _total = 0;
        let _drill = 0;
        localInfo.map(item => {
            _total += item.plan_length;
            _drill += item.dig_length;
            return item
        });
        const _percent = (_drill / _total) * 100;
        setDrillStatus({
            total: numberOfDigitsHandler(_total),
            drill: numberOfDigitsHandler(_drill),
            percent: Math.round(_percent * 10) / 10.0
        });
    }

    const setBleCountBinding = () => {
        console.log('setBleCountBinding->', bleData);
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

    useEffect(() => {
        binding();
        if (bleData) {
            setBleCountBinding();
        }
    }, [localInfo, bleData]);

    return (
        <StatusInfoCompo className="statusInfo-component">
            <i className="fas fa-hard-hat"></i>
            <div className="status-box">
                <div className="top-contents worker-count-top">
                    <span className="box-title">총 막장인원</span>
                </div>
                <div className="bottom-contents">
                    <div className="bottom-left">
                        <p className="icon worker-icon"><FontAwesomeIcon icon={faUserHardHat} /></p>
                    </div>
                    <div className="bottom-right">
                        <p className="count-box worker-count">
                            <span className="value" id="worker-value">{bleCount.worker < 10 ? `0${bleCount.worker}` : bleCount.worker}</span>
                            <span className="unit" id="worker-unit">명</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="status-box">
                <div className="top-contents vehicle-count-top">
                    <span className="box-title">총 막장차량</span>
                </div>
                <div className="bottom-contents">
                    <div className="bottom-left">
                        <p className="icon vehicle-icon"><FontAwesomeIcon icon={faTruck} /></p>
                    </div>
                    <div className="bottom-right">
                        <p className="count-box vehicle-count">
                            <span className="value" id="vehicle-value">{bleCount.vehicle < 10 ? `0${bleCount.vehicle}` : bleCount.vehicle}</span>
                            <span className="unit" id="vehicle-unit">대</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="status-box">
                <div className="top-contents progress-status-top">
                    <span className="box-title">총 굴진현황</span>
                </div>
                <div className="bottom-contents progress-bottom">
                    <div className="bottom-left">
                        <p className="icon progress-icon"><FontAwesomeIcon icon={faDigging} /></p>
                    </div>
                    <div className="bottom-right progress-bottom-right">
                        <p className="count-box progress-info-top">
                            <span className="progress-value">{drillStatus.percent}</span>
                            <span className="unit" id="progress-unit">%</span>
                        </p>
                        <p className="progress-info-bottom">
                            <span className="progress-current-value">{drillStatus.drill}</span>/
                        <span className="progress-total-vlaue">{`${drillStatus.total}m`}</span>
                        </p>
                    </div>
                </div>
            </div>
        </StatusInfoCompo>
    );
};

export default StatusInfo;