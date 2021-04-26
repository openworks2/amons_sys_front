import React from 'react';
import styled from 'styled-components';

const VehicleDetailCompo = styled.div`
    width: 330px;
    height: 156px;
    position: absolute;
    top: 263px;
    left: 414px;
    background-color: #2E2E2E;
    border: 3px solid #000000;
    display: flex;
    .left-vehicle-area {
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
    .right-vehicle-area{
        width: 51.8%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .vehicle-info-box {
            height: 120px;
            div{
                width: 100%;
                font-family:"NotoSansKR-Regular";
                font-size: 14px;
            }
            .vehicle-title{
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
            .vehicle-info{
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
                    margin-top: 10px;
                }
            }
        }
    }
`;
const VehicleDetailComponent = () => {
    return (
        <VehicleDetailCompo className="vehicle-detail-component">
            <div className="left-vehicle-area">
                <div className="image-box">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="right-vehicle-area">
                <div className="vehicle-info-box">
                    <div className="vehicle-title">
                        <span>차량(이름)의 </span>
                        <span>상세정보</span>
                    </div>
                    <div className="vehicle-info nation-info">
                        <label>차량종류: </label>
                        <span>백호06W</span>
                    </div>
                    <div className="vehicle-info">
                        <label>차량 번호: </label>
                        <span>경기99 가 8888</span>
                    </div>
                    <div className="vehicle-info">
                        <label>비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고: </label>
                        <span>비고</span>
                    </div>
                    <div className="vehicle-info residence-time">
                        <span>체류시간:06시간 23분</span>
                    </div>
                </div>
            </div>
        </VehicleDetailCompo>
    );
};

export default VehicleDetailComponent;