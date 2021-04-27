import React, { useState } from 'react';
import styled from 'styled-components';
import DrillRatePanel from './DrillRatePanel';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DrillMapCompo = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
    background-image: url('../../progress/dig_bg_1.png');
    background-repeat:no-repeat;
    position: relative;
    .location-top{
        width: 100%;
        height: 50%;
        position: relative;
        .progress-left{
            top: 78px;
            left: 34px;
        }
        .progress-right{
            right: 23px;
            top: 78px;
            width: 231px;
            height: 6px;
        }
    }
    .location-bottom{
        width: 100%;
        height: 50%;
        position: relative;
        .progress-left{
            top: 82px;
            left: 34px;
        }
        .progress-right{
            top: 82px;
            right: 23px;
            width: 229px;
            height: 6px;
        }
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
    .progress-left {
            width: 718px;
            height: 20px;
            position: absolute;
            height: 6px;
        }
    .progress-right{
        position: absolute;
        transform: rotate(180deg);
    }
    .progress{
        height: 100%;
        background-color: #171717;
        border-radius: 0px;
    }
    .progress-bar{
        background-color: #971717;
    }
    .progress-bar-striped {
        background-image: url(../../image/ar_L.png) !important;    
        /* background-image: url(../../progress/bar-f.png) !important;     */
        animation: progress-bar-stripes 2s linear infinite;
        animation-direction: reverse;
        background-size: 20px 6px!important;
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
                <div className="progress-left">
                    <ProgressBar now={60} animated />;
                </div>
                <div className="progress-right">
                    <ProgressBar now={60} animated />;
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
                <div className="progress-left">
                    <ProgressBar now={60} animated />;
                </div>
                <div className="progress-right">
                    <ProgressBar now={60} animated />;
                </div>
            </div>
            {
                ratePanelOpen &&
                <DrillRatePanel />
            }
            {/* <div classNam="progress-demo">
                <ProgressBar now={60} animated />;
            </div> */}

        </DrillMapCompo>
    );
};

export default DrillMapComponent;