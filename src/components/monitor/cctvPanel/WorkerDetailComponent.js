import React, { useEffect } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { API } from '../../../lib/server.config';

const WorkerDetailCompo = styled.div`
    width: 330px;
    height: 156px;
    position: absolute;
    top: 260px;
    left: 0px;
    background-color: #2E2E2E;
    border: 3px solid #000000;
    display: flex;
    .left-worker-area {
        width: 48.2%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .image-box{
            width: 120px;
            height: 120px;
            background-color:#2E2E2E;
            img{
                width: 120px;
                height: 120px;
            }
            .empty-image-box {
                width: 100%;
                height: 100%;
                background: #000000;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
            }
        }
    }
    .right-worker-area{
        width: 51.8%;
        height: 100%;
        display: flex;
        align-items: center;
        /* justify-content: center; */
        .worker-info-box {
           height: 129px;
            div{
                width: 100%;
                font-family:"NotoSansKR-Regular";
                font-size: 14px;
            }
            .worker-title{
                /* text-align: center; */
                span{
                    &:nth-child(1){
                        color:#D8D8D8;
                    }
                    &:nth-child(2){
                        color:#7C7C7C;
                    }
                }
            }
            .worker-info{
                height: 17px;
                label{
                    color:#7C7C7C;
                }
                span{
                    color:#D8D8D8;
                }
                &.nation-info{
                    margin-top: 14px;
                }
                &.residence-time{
                    margin-top: 3px;
                }
            }
        }
    }
`;

const WorkerDetailComponent = ({ selectItem }) => {
    const { type, bcIndex, item } = selectItem;

    useEffect(() => {

    }, [selectItem]);
    const birthCalculator = (birth) => {
        const splitBirth = birth.split(".");
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
    return (
        <WorkerDetailCompo className="worker-detail-component">
            <div className="left-worker-area">
                <div className="image-box">
                    {
                        item.wk_image ?
                            <img src={`${API}/upload/${item.wk_image}`} alt="이미지" />
                            : <div className="empty-image-box">사진없음</div>

                    }
                </div>
            </div>
            <div className="right-worker-area">
                <div className="worker-info-box">
                    <div className="worker-title">
                        <span>{item.wk_name}님의 </span>
                        <span>상세정보</span>
                    </div>
                    <div className="worker-info nation-info">
                        <label>국&nbsp;&nbsp;&nbsp;&nbsp;적: </label>
                        <span>{item.wk_nation}</span>
                    </div>
                    <div className="worker-info">
                        <label>나&nbsp;&nbsp;&nbsp;&nbsp;이: </label>
                        <span>{`${birthCalculator(item.wk_birth)}세`}</span>
                    </div>
                    <div className="worker-info">
                        <label>핸드폰: </label>
                        <span>{item.wk_phone}</span>
                    </div>
                    <div className="worker-info">
                        <label>혈액형: </label>
                        <span>{`${TransBloodType(item.wk_blood_type)} ${item.wk_blood_group === 0 ? 'RH+' : 'RH-'}`}</span>
                    </div>
                    <div className="worker-info residence-time">
                        <span>체류시간:</span>
                        {/* <span>{<Moment fromNow format="HH시간 mm분" durationFromNow >{item.bc_input_time}</Moment>}</span> */}
                        <span><Moment date={item.bc_input_time} format="HH시간mm분" durationFromNow /></span>
                    </div>
                </div>
            </div>
        </WorkerDetailCompo>
    );
};

export default WorkerDetailComponent;