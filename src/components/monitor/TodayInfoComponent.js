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
        display:flex;
        .weather-info-box{
            height: 100%;
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
            width: 33.33%;
            background-color:yellow;
        }
        .wind-info-box{
            height: 100%;
            width: 33.33%;
            /* background-color:gray; */
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
                <div className="temperature-info-box"></div>
                <div className="wind-info-box"></div>
            </div>
        </TodayInfoCompo>
    );
};

export default TodayInfoComponent;