import React from 'react';
import styled from 'styled-components';
import { faClock } from '@fortawesome/pro-regular-svg-icons';
import { faArrowLeft, faPhone } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../../lib/server.config';
import Moment from 'react-moment';
import { faUserHardHat } from '@fortawesome/pro-duotone-svg-icons';

const WorkerItemCompo = styled.div`
    li.worker-item {
        width: 100%;
        height: 70px;
        background: rgba(255, 255, 255, 0.7);
        margin-bottom: 8px;
        display: flex;
        border-radius: 4px;
        max-width: 995px;
        .item-left {
            width: 20.6%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .image-box{
                width: 58px;
                height: 58px;
                border-radius: 7px;
                background-color: #2E2E2E;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                }
                .empty-image-box{
                    width: 100%;
                    height: 100%;
                    color: #D8D8D8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 40px;
                }
            }
        }
        .item-right {
            width: 79.4%;
            height: 100%;
            display: flex;
            padding-left: 8px;
            padding-top: 5px;
            .worker-info{
                width: 60%;
                height: 100%;
                .info-top{
                    font-family: NotoSansKR-Medium;
                    color: #2E2E2E;
                    height: 20px;
                    .worker-name{
                        font-size: 16px;
                        margin-right: 9px;
                    }
                    .worker-blood{
                        font-size: 14px;
                    }
                }
                .info-center{
                    display: flex;
                    align-items: center;
                    font-family: NotoSansKR-Regular;
                    color: #2E2E2E;
                    font-size: 14px;
                    height: 20px;
                    div{
                        border-left: 1px solid #D8D8D8;
                        margin-left: 5px;
                        margin-right: 5px;
                        height: 15px;
                    }
                    .worker-name{
                        font-size: 16px;
                    }
                    .worker-blood{
                        font-size: 14px;
                    }
                }
                .info-bottom{
                    font-size: 12px;
                    letter-spacing: -0.12px;
                    color: #444444;
                    opacity: 0.6;
                }
            }
            .worker-desc{
                width:40%;
                height: 100%;
                font-family: NotoSansKR-Regular;
                font-size: 14px;
                color: #454545;
                display: flex;
                justify-content: flex-end;
                padding-right: 10px;
                position: relative;
                a.phone-icon {
                    color:inherit;
                    text-decoration: none;
                    position: absolute;
                    top: 33px;
                }
            }
        }
    }
`;

const WorkerItemComponent = ({ item }) => {

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
        <WorkerItemCompo>
            <li className="worker-item">
                <div className="item-left">
                    <div className="image-box">
                        {
                            item.wk_image ?
                                <img src={`${API}/upload/${item.wk_image}`} alt="이미지" />
                                : <div className="empty-image-box"><FontAwesomeIcon icon={faUserHardHat}/></div>

                        }
                    </div>
                </div>
                <div className="item-right">
                    <div className="worker-info">
                        <div className="info-top">
                            <span className="worker-name">{`${item.wk_name}`}</span>
                            <span className="worker-blood">{`${TransBloodType(item.wk_blood_type)} ${item.wk_blood_group === 0 ? 'RH+' : 'RH-'}`}</span>
                        </div>
                        <div className="info-center">
                            <span className="company-name">{`${item.wk_co_name}`}</span>
                            <div></div>
                            <span className="worker-positon">{`${item.wk_position}`}</span>
                        </div>
                        <div className="info-bottom">
                            <span className="input-date">{`진입일시:${item.bc_input_time}`}</span>
                        </div>
                    </div>
                    <div className="worker-desc">
                        <span className="clock-icon"><FontAwesomeIcon icon={faClock} /></span>
                        &nbsp;
                        <span className="input-delay-time"><Moment date={item.bc_input_time} format="HH시간mm분" durationFromNow /></span>
                        <a className="phone-icon" href='tel:010-0000-0000'>
                            <FontAwesomeIcon icon={faPhone} />
                        </a>
                    </div>
                </div>
            </li>
        </WorkerItemCompo>
    );
};

export default WorkerItemComponent;