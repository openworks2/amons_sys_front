import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import analog from '../../lib/clock/analog';
import digital from '../../lib/clock/digital';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloudSun, faCloud, faCloudShowers, faCloudSleet } from "@fortawesome/pro-duotone-svg-icons";

const TodayInfoCompo = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: aquamarine; */
    border-radius: 4px;
    display: flex;
    align-items: center;
    .left-area{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        #analogClock{
            margin-top: 4px;
            margin-left: 15px;
        }
        
        div#digitalClock {
            height: 100%;
            width: 72%;
            margin-left: 9px;
            /* background: aliceblue; */
            p{
                font-family:"DS-Digital";
                color: #ffffff;
                &#calendar-box{
                    font-size:24.25px;
                    margin-bottom: 0px;
                    height: 21px;
                    padding-left: 2px;
                }
                &#time-box{
                    opacity: 0.5;
                    font-size: 37.24px;
                    height: 38px;
                    letter-spacing: 1px;
                }
            }
            
            
        }
    }
    .divide{
        border-left: 1px solid #ffffff;
        height: 67%;
        opacity: 0.1;
    }
    .right-area{
        width: 50%;
        width: 50%;
        height: 100%;
        /* background-color: aqua; */
        display: flex;
        align-items: center;
        .weather-info-box{
            height: 89%;
            width: 33.33%;
            /* background-color:red; */
            display:flex;
            justify-content: center;
            align-items:center;
            .contents{
                font-family:"NanumSquareL";
                font-size: 12px;
                color:#FFFFFF;
                text-align: center;
                .icon {
                    font-size: 30px;
                }
            }
        }
        .temperature-info-box{
            height: 100%;
            width: 43%;
            .temp-area{
                width: 100%;
                height: 40px;
                display: flex;
                .temp-icon{
                    width: 18%;
                    height: 100%;
                    padding-top: 13px;
                    margin-right: 3px;
                }
                .temp-value{
                    width: 62%;
                    height: 100%;
                    font-family:"NanumSquareB";
                    font-size: 36px;
                    color:#FFFFFF;
                }
                .temp-unit{
                    width: 25%;
                    height: 100%;
                    color:#ACACAC;
                    font-family:"NanumSquareR";
                    font-size: 21.72px;
                    padding-top: 7px;
                }
            }
            .humi-area{
                width: 100%;
                height: 39%;
                display: flex;
                .humi-icon {
                    width: 18%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        height: 13px;
                    }
                }
                .humi-contents{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .name{
                        color: #ACACAC;
                        font-size:12px;
                        font-family: "NanumSquareL";
                        margin-left: 6.5px;
                    }
                    .value{
                        font-family:"NanumSquareR";
                        font-size: 14px;
                        color:#FFFFFF;
                        margin-left: 10px;
                    }
                    .unit{
                        font-family:"NanumSquareR";
                        font-size: 12px;
                        color:#ACACAC;
                    }
                }
            }
        }
        .wind-info-box{
            height: 100%;
            width: 33.33%;
            display:flex;
            justify-content: center;
            align-items:center;
            .wind-contents{
                width:38px;
                height: 43px;
                span.wind-direction {
                    font-size: 14px;
                    font-family: 'NanumSquareR';
                    color: #00AEEF;
                }
                span.wind-value {
                    font-size: 14px;
                    font-family: 'NanumSquareR';
                    color: #FFFFFF;
                }
                span.wind-unit {
                    font-size: 14px;
                    font-family: 'NanumSquareR';
                    color: #ACACAC;
                }
            }


        }
    }
`;

const TodayInfoComponent = () => {

    const [weather, setWeather] = useState({
        icon: faSun,
        name: '맑음'
    });

    useEffect(() => {
        analog.init('canvas_clock')
        digital.init('digitalClock')

    }, []);

    return (
        <TodayInfoCompo className="todayinfo-component">
            <div className="left-area">
                <div id="analogClock">
                    <canvas id="canvas_clock" width="58px" height="58px"></canvas>
                </div>
                <div id="digitalClock">
                    {/* <p id="calendar-box">2021-03-26</p>
                        <p id="time-box">19:20:16</p> */}
                </div>
            </div>
            <div className="divide"></div>
            <div className="right-area">
                <div className="weather-info-box">
                    <div className="contents">
                        <div className="icon"><FontAwesomeIcon icon={weather.icon} /></div>
                        <div className="text">{weather.name}</div>
                    </div>
                </div>
                <div className="temperature-info-box">
                    <div className="temp-area">
                        <div className="temp-icon">
                            <img src="../../images/todayInfo/icon-temp.png" alt="temp" />
                        </div>
                        <div className="temp-value">25</div>
                        <div className="temp-unit">℃</div>
                        <div></div>
                    </div>
                    <div className="humi-area">
                        <div className="humi-icon">
                            <img src="../../images/todayInfo/icon-hum.png" alt="temp" />
                        </div>
                        <div className="humi-contents">
                            <span className="name">습도</span>
                            <span className="value">30</span>
                            <span className="unit">%</span>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="wind-info-box">
                    <div className="wind-contents">
                        <span className="wind-direction">북서풍</span><br />
                        <span className="wind-value">7</span>
                        <span className="wind-unit">m/s</span>
                    </div>
                </div>
            </div>
        </TodayInfoCompo>
    );
};

export default TodayInfoComponent;