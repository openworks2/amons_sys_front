import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const ALarmItemCompo = styled.li`
    width: 100%;
    height: 100px;
    border: 1px solid #DBDBDB;
    background: #fff;
    box-shadow: 0px 2px 3px #0000001A;
    border: 1px solid #DBDBDB;
    border-radius: 4px;
    margin-bottom: 16px;
    display: flex;
    .left-panel {
        width: 34%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .left-contents{
            width: 56px;
            height: 70px;
            .emoticon-box {
                width: 100%;
                height: 50px;
                .emoticon {
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 0, 0, 0.3);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .circle {
                        width: 68%;
                        height: 68%;
                        background-color: #ff0000;
                        border-radius: inherit;
                        display: inherit;
                        justify-content: inherit;
                        align-items: inherit;
                        color: #FFFFFF;
                        padding-bottom: 2px;
                        font-size: 17px;
                    }
                }
            }
            .location-box{
                color: #2E2E2E;
                font-size: 14px;
                font-family: NotoSansKR-Medium;
            }
        }
    }
    .right-panel{
        width: 66%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        .right-contents{
            font-size: 14px;
            font-family: NotoSansKR-Regular;
            color: #7C7C7C;
            div{
                height: 18px;
            }
            .occure-time-box{
                font-family: NotoSansKR-Medium;
                color: #000;
            }
            .worker-info-box{
                display: flex;
                align-items: center;
                .division-bar{
                    width: 1px;
                    height: 10px;
                    border-left: 1px solid #7C7C7C;
                    margin-left: 5px;
                    margin-right: 5px;
                }
            }
            .days{
                position: absolute;
                font-size: 12px;
                right: 9px;
                top: 3px;
            }
        }
    }
`;

const AlarmItem = ({ item }) => {

    const { emg_seq, emg_start_time, wk_name, wk_co_name, wk_phone, wk_birth, local_name } = item;

    useEffect(() => {
        console.log('item--->>', item);
    }, [item]);

    const birthCalculator = (birth) => {
        const splitBirth = birth.split("-");
        const Years =
            Number(splitBirth[0]) >= 30 ? splitBirth[0] : "20" + splitBirth[0];
        const Months = splitBirth[1];
        const Days = splitBirth[2];
        const today = new Date();
        const birthDate = new Date(Years, Months, Days); // 2000년 8월 10일

        let age = today.getFullYear() - birthDate.getFullYear() + 1;

        return age;
    };
    const TransBloodType = (bloodType) => {
        switch (bloodType) {
            case 0:
                return "A";
            case 1:
                return "B";
            case 2:
                return "O";
            case 3:
                return "AB";
            default:
                return null;
        }
    };

    const getDiffTime = (fromDate) => {
        const _fromDate = moment(fromDate);
        const _toDate = moment();

        const _days = moment.duration(_toDate.diff(_fromDate)).days();
        console.log('_day-->>>',_days)
        const str = _days === 0 ? '오늘' : `${_days}일 전`
        return str
    }

    return (
        <ALarmItemCompo key={emg_seq}>
            <div className="left-panel">
                <div className="left-contents">
                    <div className="emoticon-box">
                        <div className="emoticon">
                            <div className="circle">
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                            </div>
                        </div>
                    </div>
                    <div className="location-box">{local_name}</div>
                </div>
            </div>
            <div className="right-panel">
                <div className="right-contents">
                    <div className="occure-time-box">
                        <span>{moment(emg_start_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                        {/* <span>{emg_start_time}</span> */}
                    </div>
                    <div className="worker-info-box">
                        <span>{wk_name}</span>
                        <div className="division-bar"></div>
                        <span>{`${birthCalculator(wk_birth)}세`}</span>
                        <div className="division-bar"></div>
                        <span>{`${TransBloodType(item.wk_blood_type)} ${item.wk_blood_group === 0 ? 'RH+' : 'RH-'}`}</span>
                    </div>
                    <div className="company-info-box">
                        <span>한국도로공사</span>
                    </div>
                    <div className="number-info-box">
                        <span>010-1111-0000</span>
                    </div>
                    <div className="days">{getDiffTime(emg_start_time)}</div>
                </div>
            </div>
        </ALarmItemCompo>
    );
};

export default AlarmItem;