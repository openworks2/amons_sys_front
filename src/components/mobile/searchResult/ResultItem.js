
import React from 'react';
import styled from 'styled-components';
import { faClock } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Moment from 'react-moment';

const ResultItemCompo = styled.li`
    width: 100%;
    height: 96px;
    background-color: rgba(255,255,255,0.7);
    display: flex;
    font-family: NotoSansKR-Regular;
    margin-bottom: 8px;
    .left-box{
        height: 100%;
        width: 10px;
        background-color: #F1592A;
    }
    .right-box{
        height: 100%;
        width: calc(100% - 10px);
        position: relative;
        padding-left: 23.75px;
        display: flex;
        align-items: center;
        .location-box{
            width: 100%;
            font-size: 18px;
            letter-spacing: -0.18px;
        }
        .type-name-box{
            width: 100%;
            display: flex;
            font-size: #000;
            align-items: center;
            .division-bar{
                height: 15px;
                border-left: 1px solid #D8D8D8;
                margin-right: 5px;
                margin-left: 5px;
            }
        }
        .type-input-date-box,
        .type-out-date-box {
            font-size: 12px;
            color: #2E2E2E;
            opacity: 0.6;
        }
        .type-visit-time{
            position: absolute;
            right: 14px;
            bottom: 12px;
            width: 100px;
            /* height: 26px; */
            background-color: #2E2E2E;
            color: #FFFFFF;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            &.visiting{
                background-color: #F1592A;
            }
            .time-icon {
                height: 100%;
                width: 27%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .visit-time {
                height: 100%;
                width: 74%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-right: 5px;
                margin-bottom: 3px;
                margin-top: 3px;
                text-align: end;
                &.visiting{
                    justify-content: center;
                }
                .diff-time-box{
                    .diff-time {
                        letter-spacing: -0.74px;
                    }
                }
            }
        }
    }
`;
const ResultItem = ({ type, item }) => {

    const getDiffTime = (fromDate, toDate) => {
        const _fromDate = moment(fromDate);
        const _toDate = toDate !== null ? moment(toDate) : moment();

        const _days = moment.duration(_toDate.diff(_fromDate)).days();
        const _hours = moment.duration(_toDate.diff(_fromDate)).hours();
        const _minutes = moment.duration(_toDate.diff(_fromDate)).minutes();

        return <div className="diff-time-box">
            {
                _days > 0 ? <div className="diff-days">{`${_days}일`}</div> : ''
            }
            <div className="diff-time">
                {`${_hours > 0 ? `${_hours}시간` : ''} ${`${_minutes}분`}`}
            </div>
        </div>
    }

    return (
        <ResultItemCompo>
            <div className="left-box"></div>
            <div className="right-box">
                <div className="contents-container">
                    <div className="location-box">{item.local_name}</div>
                    <div className="type-name-box">
                        <span>{item.name}</span>
                        <div className="division-bar"></div>
                        <span>{item.co_name}</span>
                    </div>
                    <div className="type-input-date-box">
                        <span>진입시간: </span>
                        <span>{item.ble_input_time}</span>
                    </div>
                    <div className="type-out-date-box">
                        <span>퇴출시간: </span>
                        <span>{item.ble_out_time ? moment(item.ble_out_time).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>
                    </div>
                    <div className={`type-visit-time ${item.ble_out_time ? '': 'visiting'}`}>
                        <div className="time-icon"><FontAwesomeIcon icon={faClock} /></div>
                        <div className={`visit-time ${item.ble_out_time ? '': 'visiting'}`}>
                            {
                                item.ble_out_time 
                                ? getDiffTime(item.ble_input_time, item.ble_out_time)
                                : '체류중'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ResultItemCompo>
    );
};

export default ResultItem;