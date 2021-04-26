import React, { useState } from 'react';
import styled from 'styled-components';
import DrillRatePanel from './DrillRatePanel';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DrillMapCompo = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
    background-image: url('../../image/dig_bg.png');
    background-repeat:no-repeat;
    position: relative;
    .location-top{
        width: 100%;
        height: 50%;
        position: relative;
    }
    .location-bottom{
        width: 100%;
        height: 50%;
        position: relative;
    }
    /* display: flex; */
    .text-box {
        width: 142px;
        height: 26px;
        display: flex;
        position:absolute;
        div{
            height:100%;
            width:50%;
            display:flex;
            justify-content: center;
            align-items: center;
        }
        &.left-top-text{
            left: 48px;
            top: 21px;
        }
        &.right-top-text{
            left: 828px;
            top: 21px;
        }
        &.left-bottom-text{
            left: 48px;
            top: 26px;
        }
        &.right-bottom-text{
            left: 828px;
            top: 26px;
        }
        .location-title{
            font-family:"NanumSquareL";
            color: #FFFFFF;
            font-size: 12px;
        }
        .location-dig {
            font-family:"NanumSquareR";
            color: #FFFFFF;
            font-size: 14px;
        }
    }
    .location-distance{
        width:130px;
        height:24px;
        font-family:"NanumSquareR";
        color: #D8D8D8;
        font-size:14px;
        position: absolute;
        left: 391px;
        top: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.top-distance{
            left: 439px; 
            top: 23px;
        }
        &.bottom-distance{
            left: 444px; 
            top: 28px;
        }
    }
    .progress-demo{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color:gray;
    }
    .progress-bar{
        background-color: #971717;
    }
    .progress-bar-striped {
        background-image: url(../../image/ar_L.png) !important;    
        animation-direction: reverse;
    }
`;

const DrillMapComponent = ({ ratePanelOpen }) => {
    console.log('monitor-->', ratePanelOpen)

    return (
        <DrillMapCompo>
            <div className="location-top">
                <div className="text-box left-top-text">
                    <div className="location-title">시점 함양</div>
                    <div className="location-dig">1,020m</div>

                </div>
                <div className="location-distance top-distance">함양 L=3,359m</div>
                <div className="text-box right-top-text">
                    <div className="location-dig">1,020m</div>
                    <div className="location-title">시점 함양</div>
                </div>
            </div>
            <div className="location-bottom">
                <div className="text-box left-bottom-text">
                    <div className="location-title">시점 울산</div>
                    <div className="location-dig">0m</div>
                </div>
                <div className="location-distance bottom-distance">울산 L=3,379m</div>
                <div className="text-box right-bottom-text">
                    <div className="location-dig">0m</div>
                    <div className="location-title">시점 울산</div>
                </div>
            </div>
            {
                ratePanelOpen &&
                <DrillRatePanel />
            }
            <div classNam="progress-demo">
                <ProgressBar now={60} animated />;
            </div>

        </DrillMapCompo>
    );
};

export default DrillMapComponent;