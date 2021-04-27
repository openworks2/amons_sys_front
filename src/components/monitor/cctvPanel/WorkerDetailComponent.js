import React from 'react';
import styled from 'styled-components';

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
        background: aliceblue;
        display: flex;
        justify-content: center;
        align-items: center;
        .image-box{
            width: 120px;
            height: 120px;
            background-color:#2E2E2E;
        }
    }
    .right-worker-area{
        width: 51.8%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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

const WorkerDetailComponent = () => {
    return (
        <WorkerDetailCompo className="worker-detail-component">
            <div className="left-worker-area">
                <div className="image-box">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="right-worker-area">
                <div className="worker-info-box">
                    <div className="worker-title">
                        <span>작업자(이름)님의 </span>
                        <span>상세정보</span>
                    </div>
                    <div className="worker-info nation-info">
                        <label>국&nbsp;&nbsp;&nbsp;&nbsp;적: </label>
                        <span>인도네시아</span>
                    </div>
                    <div className="worker-info">
                        <label>나&nbsp;&nbsp;&nbsp;&nbsp;이: </label>
                        <span>29세</span>
                    </div>
                    <div className="worker-info">
                        <label>핸드폰: </label>
                        <span>010-9999-8888</span>
                    </div>
                    <div className="worker-info">
                        <label>혈액형: </label>
                        <span>AB Rh-</span>
                    </div>
                    <div className="worker-info residence-time">
                        <span>체류시간:06시간 23분</span>
                    </div>
                </div>
            </div>
        </WorkerDetailCompo>
    );
};

export default WorkerDetailComponent;