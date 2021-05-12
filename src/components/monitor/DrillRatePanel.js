import React from 'react';
import styled from 'styled-components';

const RateCompo = styled.div`
    width: 100%;
    height: 100%;
    background: #2E2E2E 0% 0% no-repeat padding-box;
    border: 1px solid #000000;
    position:absolute;
    top: 0px;
    padding-left: 8px;
    padding-top: 7px;
    .contents-container {
        width: 991px;
        height: 235px;
        /* border: 1px solid #7C7C7C; */
        .contents-table{
            width: 100%;
            height: 100%;
            border-collapse: collapse;
            td{
                text-align: center;
                border: 1px solid #7C7C7C;
                font-size: 13px;

            }
            td.row-title{
                font-family:"NotoSansKR-Regular";
                color: #7C7C7C;
            }
            .location-value{
                font-family:"NotoSansKR-Medium";
                color:#7C7C7C;
            }
            .location-name{
                font-family:"NotoSansKR-Medium";
                color: #D8D8D8;
                margin-right:3px;
                font-weight:100;
            }
            .item-value{
                font-family:"NotoSansKR-Medium";
                color: #D8D8D8;
                margin-right:3px;
                font-weight:100;
            }
            .location-total-row{
                .item-value{
                    color: #CE3F3E;
                }
            }
        }
    }
`;


const DrillRatePanel = ({ data }) => {
    console.log('DrillRatePanel-->',data);
    return (
        <RateCompo className="rate-component">
            <div className="contents-container">
                <table className="contents-table">
                    <thead>
                        <tr>
                            <td rowSpan="2" className="row-title">구분</td>
                            <td colSpan="3" className="colunm-title">
                                <span className="location-name">함양</span>
                                <span className="location-value">L=3,359m (개착 24m, NATM 3,335m)</span>
                            </td>
                            <td colSpan="3" className="colunm-title">
                                <span className="location-name">울산</span>
                                <span className="location-value">L=3,379m (개착 24m, NATM 3,335m)</span>
                            </td>
                            <td className="colunm-title">
                                <span className="location-name">신원터널</span>
                                <span className="location-value">L=6,738m</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="location-name">시점 함양</td>
                            <td className="location-name">종점 함양</td>
                            <td className="location-name">함양 합계</td>
                            <td className="location-name">시점 울산</td>
                            <td className="location-name">종점 울산</td>
                            <td className="location-name">울산 합계</td>
                            <td className="location-name">전체 합계</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td className="row-title">총 계획 연장</td>
                            <td className="item-value">2,542m</td>
                            <td className="item-value">817m</td>
                            <td className="item-value">3,359m</td>
                            <td className="item-value">2,562m</td>
                            <td className="item-value">2817m</td>
                            <td className="item-value">3,378m</td>
                            <td className="item-value">6,738m</td>
                        </tr>
                        <tr>
                            <td className="row-title">누적 굴진량(거리)</td>
                            <td className="item-value">2,542m</td>
                            <td className="item-value">817m</td>
                            <td className="item-value">3,359m</td>
                            <td className="item-value">2,562m</td>
                            <td className="item-value">2817m</td>
                            <td className="item-value">3,378m</td>
                            <td className="item-value">6,738m</td>
                        </tr>
                        <tr className="location-total-row">
                            <td className="row-title">누전 굴진율</td>
                            <td className="item-value">40.1%</td>
                            <td className="item-value">26%</td>
                            <td className="item-value">36.7%</td>
                            <td className="item-value">0</td>
                            <td className="item-value">0</td>
                            <td className="item-value">0</td>
                            <td className="item-value">18%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </RateCompo>
    );
};

export default DrillRatePanel;