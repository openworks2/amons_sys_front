import React from 'react';
import styled from 'styled-components';
import VehicleDetailComponent from './VehicleDetailComponent';
import WorkerDetailComponent from './WorkerDetailComponent';

const AccessDetailCompo = styled.div`
    width: 834px;
    height: 262px;
    background-color:#000000;
    display:flex;
    position: relative;
    padding-left: 3px;
    padding-top: 3px;
    padding-right: 3px;
    padding-bottom: 3px;
    .left-area{
        width: 49.6%;
        height: 100%;
        margin-right: 2px;
    }
    .right-area{
        width: 50.4%;
        height: 100%;
        background-color: yellow;
    }
    .table-box{
        width: 100%;
        height: 100%;
        border: 1px solid #484848;
        background-color:#333333;
        height: 256px;
        .worker-table-box{
            width: 410px;
        }
        .vehicle-table-box{
            width: 416px;
        }
        .table-top{
            width: 100%;
            height: 14.2%;
            /* background-color: green; */
            font-size: 14px;
            font-family:"NotoSansKR-Medium";
            display:flex;
            align-items: center;
            padding-left: 5.5px;
            .location{
                color:#FFFFFF;
            }   
            .worker-text{
                color:#B97012;
            }
            .vehicle-text{
                color:#3987B5
            }
            .name {
                color: #7C7C7C;
                opacity: 0.4
            }
        }
        .table-bottom{
            width: 100%;
            height: 85.8%;
            /* background-color: red; */
            padding-top: 4px;
            table, th, td {
                border: 1px solid #484848;
                border-collapse: collapse;
            }
            table.table{
                width: 100%;
                height: 100%;
                .table-header-row{
                    background-color:#2B2B2B;
                    /* width: 408px; */
                    height: 41px;
                    font-size: 13px;
                    font-family:"NotoSansKR-Medium";
                    &.worker-header{
                        color:#B97012;
                    }
                    &.vehicle-header{
                        color:#3987B5;
                    }
                    td{
                        padding-left: 6px;
                    }
                }
                .table-item{
                    height:34px;
                    font-family:"NotoSansKR-Regular";
                    font-size: 13px;
                    color: #D8D8D8;
                    td{
                        padding-left: 6px;
                    }
                    &:hover{
                        background-color:#7C7C7C;
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;


const AccessDetailPanel = () => {
    return (
        <AccessDetailCompo className="access-detail-panel">
            <div className="left-area">
                <div className="table-box worker-table-box">
                    <div className="table-top">
                        <span className="location">시점 함양</span>&nbsp;&nbsp;
                        <span className="worker-text">작업자</span>&nbsp;&nbsp;
                        <span className="name">잔류 현황</span>
                    </div>
                    <div className="table-bottom">
                        <table className="table worker-table">
                            <thead>
                                <tr className="table-header-row worker-header">
                                    <td>소속사</td>
                                    <td>이름</td>
                                    <td>직위</td>
                                    <td>진입 일시</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>김공사</td>
                                    <td>점보 운전원</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>김공사</td>
                                    <td>점보 운전원</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>김공사</td>
                                    <td>점보 운전원</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>김공사</td>
                                    <td>점보 운전원</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>김공사</td>
                                    <td>점보 운전원</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="right-area">
                <div className="table-box">
                    <div className="table-top">
                        <span className="location">시점 함양</span>&nbsp;&nbsp;
                        <span className="vehicle-text">차량</span>&nbsp;&nbsp;
                        <span className="name">잔류 현황</span>
                    </div>
                    <div className="table-bottom">
                        <table className="table vehicle-table">
                            <thead>
                                <tr className="table-header-row vehicle-header">
                                    <td>소속사</td>
                                    <td>차량 종류</td>
                                    <td>차량 번호</td>
                                    <td>진입 일시</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>백호 06W</td>
                                    <td>경기99 가 8888</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>백호 06W</td>
                                    <td>경기99 가 8888</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>백호 06W</td>
                                    <td>경기99 가 8888</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>백호 06W</td>
                                    <td>경기99 가 8888</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                                <tr className="table-item">
                                    <td>OO건설</td>
                                    <td>백호 06W</td>
                                    <td>경기99 가 8888</td>
                                    <td>2021-02-19 01:15:00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <WorkerDetailComponent />
            <VehicleDetailComponent />
        </AccessDetailCompo>
    );
};

export default AccessDetailPanel;