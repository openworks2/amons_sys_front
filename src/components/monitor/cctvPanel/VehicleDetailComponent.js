import React, { useEffect } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { API } from '../../../lib/server.config';

const VehicleDetailCompo = styled.div`
    width: 330px;
    height: 156px;
    position: absolute;
    top: 260px;
    left: 414px;
    background-color: #2E2E2E;
    border: 3px solid #000000;
    display: flex;
    .left-vehicle-area {
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
    .right-vehicle-area{
        width: 51.8%;
        height: 100%;
        display: flex;
        align-items: center;
        /* justify-content: center; */
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
                height: 18px;
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
const VehicleDetailComponent = ({ selectItem }) => {
    const { type, bcIndex, item } = selectItem;

    useEffect(() => {

    }, [selectItem]);

    return (
        <VehicleDetailCompo className="vehicle-detail-component">
            <div className="left-vehicle-area">
                <div className="image-box">
                    {
                        item.vh_image ?
                            <img src={`${API}/upload/${item.vh_image}`} alt="이미지" />
                            : <div className="empty-image-box">사진없음</div>

                    }
                </div>
            </div>
            <div className="right-vehicle-area">
                <div className="vehicle-info-box">
                    <div className="vehicle-title">
                        <span>{item.vh_name}의 </span>
                        <span>상세정보</span>
                    </div>
                    <div className="vehicle-info nation-info">
                        <label>차량종류: </label>
                        <span>{item.vh_name}</span>
                    </div>
                    <div className="vehicle-info">
                        <label>차량 번호: </label>
                        <span>{item.vh_number}</span>
                    </div>
                    <div className="vehicle-info">
                        <label>비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고: </label>
                        <span>{item.description}</span>
                    </div>
                    <div className="vehicle-info residence-time">
                        <span>체류시간:</span>
                        {/* <span>{<Moment fromNow format="HH시간 mm분" durationFromNow>{item.bc_input_time}</Moment>}</span> */}
                        <span><Moment date={item.bc_input_time} format="hh시간mm분" durationFromNow /></span>

                    </div>
                </div>
            </div>
        </VehicleDetailCompo>
    );
};

export default VehicleDetailComponent;