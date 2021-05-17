import React, { useCallback, useEffect } from 'react';
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


const DrillRatePanel = ({ data, numberOfDigitsHandler }) => {

    const percentCalc = useCallback((dig, plan) => {
        const percent = (dig / plan) * 100;
        const diviPercent = Math.round(percent * 10) / 10;
        return diviPercent;
    }, []);

    useEffect(() => {

    }, [data]);


    return (
        <RateCompo className="rate-component">
            <div className="contents-container">
                <table className="contents-table">
                    <thead>
                        <tr>
                            <td rowSpan="2" className="row-title">구분</td>
                            <td colSpan="3" className="colunm-title">
                                <span className="location-name">함양</span>
                                <span className="location-value">{`L=${numberOfDigitsHandler(data[0].plan_length + data[1].plan_length)}m (개착 24m, NATM 3,335m)`}</span>
                            </td>
                            <td colSpan="3" className="colunm-title">
                                <span className="location-name">울산</span>
                                <span className="location-value">{`L=${numberOfDigitsHandler(data[2].plan_length + data[3].plan_length)}m (개착 24m, NATM 3,355m)`}</span>
                            </td>
                            <td className="colunm-title">
                                <span className="location-name">신원터널</span>
                                <span className="location-value">{`L=${numberOfDigitsHandler(data[0].plan_length + data[1].plan_length + data[2].plan_length + data[3].plan_length)}m`}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="location-name">{data[0].local_name}</td>
                            <td className="location-name">{data[1].local_name}</td>
                            <td className="location-name">함양 합계</td>
                            <td className="location-name">{data[2].local_name}</td>
                            <td className="location-name">{data[3].local_name}</td>
                            <td className="location-name">울산 합계</td>
                            <td className="location-name">전체 합계</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td className="row-title">총 계획 연장</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[0].plan_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[1].plan_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[0].plan_length + data[1].plan_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[2].plan_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[3].plan_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[2].plan_length + data[3].plan_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[0].plan_length + data[1].plan_length + data[2].plan_length + data[3].plan_length)}m`}</td>
                        </tr>
                        <tr>
                            <td className="row-title">누적 굴진량(거리)</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[0].dig_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[1].dig_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[0].dig_length + data[1].dig_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[2].dig_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[3].dig_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[2].dig_length + data[3].dig_length)}m`}</td>
                            <td className="item-value">{`${numberOfDigitsHandler(data[0].dig_length + data[1].dig_length + data[2].dig_length + data[3].dig_length)}m`}</td>
                        </tr>
                        <tr className="location-total-row">
                            <td className="row-title">누전 굴진율</td>
                            <td className="item-value">{`${percentCalc(data[0].dig_length, data[0].plan_length)}%`}</td>
                            <td className="item-value">{`${percentCalc(data[1].dig_length, data[1].plan_length)}%`}</td>
                            <td className="item-value">{`${percentCalc((data[0].dig_length + data[1].dig_length), (data[0].plan_length + data[1].plan_length))}%`}</td>
                            <td className="item-value">{`${percentCalc(data[2].dig_length, data[2].plan_length)}%`}</td>
                            <td className="item-value">{`${percentCalc(data[3].dig_length, data[3].plan_length)}%`}</td>
                            <td className="item-value">{`${percentCalc((data[2].dig_length + data[3].dig_length), (data[2].plan_length + data[3].plan_length))}%`}</td>
                            <td className="item-value">{`${percentCalc((data[0].dig_length + data[1].dig_length + data[2].dig_length + data[3].dig_length), (data[0].plan_length + data[1].plan_length + data[2].plan_length + data[3].plan_length))}%`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </RateCompo>
    );
};

export default React.memo(DrillRatePanel);