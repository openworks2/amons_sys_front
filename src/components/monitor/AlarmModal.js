import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const AlarmModalCompo = styled.div`
    width: 100%;
    height: 93.6%;
    position: absolute;
    background-color: rgba(255,0,0,0.7);
    top: 69px;
    z-index: 998;
    display: flex;
    justify-content:center;
    align-items: center;
    @media screen and (max-height: 937px) {
        height: 72rem;
    }
    .alarm-modal{
        width:752px;
        height: 537px;
        background-color:#2E2E2E;
        border: 1px solid #646464;
        .header{
            height: 159px;
            display:flex;
            justify-content: center;
            align-items: center;
            .title-box{
                width: 105px;
                height:110px;
                .warning-icon{
                    width: 99px;
                    height: 79px;
                    background-image: url(../../images/emergancy/warning.png);
                    margin-left: 3px;
                }
                .warning-title{
                    font-family:"NanumSquareB";
                    font-size: 22px;
                    color:#F8B62B;
                }
            }
        }
        .body{
            height: 295px;
            width: 100%;
            table.sos-table {
                width: 100%;
                height: 100%;
                /* display: block;
                overflow: auto; */
                border-bottom: 1px solid #7C7C7C;
            }
            table, th, td {
                border-collapse: collapse;
            }
            thead {
                tr.row{
                    border-top: 1px solid #7C7C7C;
                } 
            }
            tbody{
                overflow-y: auto;
                overflow-x: hidden;
                float: left;
                width: 750px;
                height: 252px;
                /* border-bottom: 1px solid #7C7C7C; */

            }
            tr.row{
                border-bottom: 1px solid #7C7C7C;
                margin-right: 0px;
                margin-left: 0px;
                height: 42px;
                &.empty{
                    border-bottom: 0;
                }
                td, th{
                    color: #D8D8D8;
                    font-family:"NotoSansKR-Regular";
                    font-size: 14px;
                    border-left: 1px solid #7C7C7C;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .record-time {
                    width: 11em;
                    justify-content: left;
                    padding-left: 2%;
                }
                .location{
                    width:89px;
                }
                .company{
                    width:114px;
                    justify-content: left;
                    padding-left: 11.5px;
                }
                .name{
                    width:114px;
                    justify-content: left;
                    padding-left: 10.5px;
                }
                .age{
                    width:58px;
                }
                .blood{
                    width:78px;
                }
                .phone{
                    width:129px;
                }
            }
        }
        .footer{
            height: 81px;
            background-color:#434343;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            .close-btn{
                width: 324px;
                height: 50px;    
                font-size: 18px;   
                font-family:"NotoSansKR-Medium";
                font-weight: 100;
            }
        }
    }
`;

const AlarmModal = ({ setOpenAlarmModal }) => {
    return (
        <AlarmModalCompo className="emergency-component">
            <div className="alarm-modal">
                <div className="header">
                    <div className="title-box">
                        <div className="warning-icon"></div>
                        <div className="warning-title">
                            <span>작업자 SOS</span>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <table className="sos-table">
                        <thead>
                            <tr className="row header-row">
                                <th className="record-time">발생일시</th>
                                <th className="location">노선</th>
                                <th className="company">소속사</th>
                                <th className="name">이름</th>
                                <th className="age">나이</th>
                                <th className="blood">혈액형</th>
                                <th className="phone">핸드폰</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row item">
                                <td className="record-time">2021-03-30 01:32:00</td>
                                <td className="location">시점 함양</td>
                                <td className="company">ㅇㅇ건설</td>
                                <td className="name">김공사</td>
                                <td className="age">45</td>
                                <td className="blood">AB Rh-</td>
                                <td className="phone">010-1234-9999</td>
                            </tr>
                            <tr className="row item">
                                <td className="record-time">2021-03-30 01:32:00</td>
                                <td className="location">시점 함양</td>
                                <td className="company">ㅇㅇ건설</td>
                                <td className="name">김공사</td>
                                <td className="age">45</td>
                                <td className="blood">AB Rh-</td>
                                <td className="phone">010-1234-9999</td>
                            </tr>
                            <tr className="row item">
                                <td className="record-time">2021-03-30 01:32:00</td>
                                <td className="location">시점 함양</td>
                                <td className="company">ㅇㅇ건설</td>
                                <td className="name">김공사</td>
                                <td className="age">45</td>
                                <td className="blood">AB Rh-</td>
                                <td className="phone">010-1234-9999</td>
                            </tr>
                            <tr className="row empty">
                                <td className="record-time"></td>
                                <td className="location"></td>
                                <td className="company"></td>
                                <td className="name"></td>
                                <td className="age"></td>
                                <td className="blood"></td>
                                <td className="phone"></td>
                            </tr>
                            <tr className="row empty">
                                <td className="record-time"></td>
                                <td className="location"></td>
                                <td className="company"></td>
                                <td className="name"></td>
                                <td className="age"></td>
                                <td className="blood"></td>
                                <td className="phone"></td>
                            </tr>
                            <tr className="row empty">
                                <td className="record-time"></td>
                                <td className="location"></td>
                                <td className="company"></td>
                                <td className="name"></td>
                                <td className="age"></td>
                                <td className="blood"></td>
                                <td className="phone"></td>
                            </tr>
                            {/* <tr className="row">
                                    <td className="record-time">2021-03-30 01:32:00</td>
                                    <td className="location">시점 함양</td>
                                    <td className="company">ㅇㅇ건설</td>
                                    <td className="name">김공사</td>
                                    <td className="age">45</td>
                                    <td className="blood">AB Rh-</td>
                                    <td className="phone">010-1234-9999</td>
                                </tr> */}
                        </tbody>
                    </table>
                </div>
                <div className="footer">
                    <Button
                        className="close-btn"
                        content='닫기'
                        primary
                        onClick={setOpenAlarmModal}
                    />
                </div>
            </div>
        </AlarmModalCompo>
    );
};

export default AlarmModal;