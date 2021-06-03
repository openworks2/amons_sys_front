import { faRouter } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';


const LocationInfoCompo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .contents-header {
        width: 100%;
        height: 100%;
        display: flex;
        min-height: 100px;
        .header-left {
            width: 66.2%;
            height: 100%;
            font-family: NotoSansKR-Medium;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 9.45vw;
            p{
                margin: 0;
                &.location-name{
                    font-size: 6.7vw;
                    color: #2E2E2E;
                }
                &.planDrill-text{
                    font-size: 12px;
                    color:#7C7C7C;
                }
            }
        }
        .header-right {
            width: 34.8%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .nms-devcie-list{
                display: flex;
                .nms-status{
                    width: 26px;
                    text-align: center;
                    margin-right: 13px;
                    &.on{
                        color:#036EB8;
                    }
                    &.off{
                        color:#7C7C7C;
                    }
                    p{
                        margin: 0;
                        &.scanner-icon{
                            font-size: 22px;
                        }
                        &.scanner-text{
                            font-family: NanumSquareB;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
    .contents-body {
        
    }

    @media screen and (min-width:600px) {
        p.location-name{
            font-size: 40px !important;
        }
        .contents-title{
            font-size: 25px !important;
        }
        .contents-box{
            justify-content: flex-end !important;
            padding-right: 4%;
        }
        .ble-panel{
            padding-right: 17.3px !important;
            padding-bottom: 17.3px !important;
        }
        .panel-icon{
            font-size: 20px !important;
        }
    }
    @media screen and (min-height:652px) and (max-height:773px) {
        .contents-header{
            height: calc(100% - 353px) !important;
        }

    }
    @media screen and (min-height:774px) {
        .contents-header{
            height: calc(100% - 349px) !important;
        }
    }
`;

const LocationInfoComponent = ({ localData }) => {
    console.log('localData--->', localData);

    const { local_name, plan_length, dig_length, local_process } = localData;

    useEffect(() => {

    }, []);


    // 천단위 콤마
    const numberOfDigitsHandler = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    };

    return (
        <LocationInfoCompo  className="locationInfo-component">
            <div className="contents-header">
                <div className="header-left">
                    <div className="location-info">
                        <p className="location-name">{local_name}</p>
                        <p className="planDrill-text">{`계획연장 ${numberOfDigitsHandler(plan_length)}m`}</p>
                    </div>
                </div>
                <div className="header-right">
                    <div className="nms-devcie-list">
                        <div className="nms-status on">
                            <p className="scanner-icon"><FontAwesomeIcon icon={faRouter} /></p>
                            <p className="scanner-text">ON</p>
                        </div>
                        <div className="nms-status off">
                            <p className="scanner-icon"><FontAwesomeIcon icon={faRouter} /></p>
                            <p className="scanner-text">OFF</p>
                        </div>
                    </div>
                </div>
            </div>
        </LocationInfoCompo>
    );
};

export default React.memo(LocationInfoComponent);