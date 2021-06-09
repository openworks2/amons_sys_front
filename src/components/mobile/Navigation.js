import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';
import { faDesktop, faHistory, faPen } from '@fortawesome/pro-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavigationCompo = styled.div`
    width: 100%;
    height: 100%;
    ul.navigation-container{
        width: 100%;
        height: 100%;
        list-style: none;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        overflow: auto;
        margin: 0;
        padding: 0;
        li.navi-list {
            width: 25%;
            height: 100%;
            background: #2E2E2E;
            display: flex;
            justify-content: center;
            align-items: center;
            color:#FFFFFF;
            /* position: relative; */
            a {
                color: inherit;
                text-decoration: none;
            }
            &.active{
                color: #F1592A;
                /* background-color: #4a4a4a; */
            }
            .contents-box{
                width: 64px;
                height: 82%;
                font-family: NotoSansKR-Regular;
                text-align: center;
                position: relative;
                .contents-icon{
                    font-size: 18px;
                }
                .contents-name{
                    font-size: 12px;

                }
                
            }
            .tag{
                width: 16px;
                height: 16px;
                background-color: #FF2929;
                position: absolute;
                border-radius: 50%;
                color:#FFFFFF;
                font-size: 12px;
                font-family: NotoSansKR-Medium;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0px;
                left: 37px;
            }
        }
    }
`;

const Navigation = ({ navigation, onNavigation, toDayAlarm }) => {

    useEffect(() => {
        console.log('Navigation--->>>',toDayAlarm)
    }, [toDayAlarm]);

    return (
        <NavigationCompo className="navigation-component">
            <ul className="navigation-container">
                <li
                    className={navigation === "monitor" ? "navi-list active" : "navi-list"}
                    id="navi-dashbord"
                    onClick={(e) => onNavigation(e, 'dashbord')}
                >
                    <Link to="/amons/m.home/monitor">
                        <div className="contents-box">
                            <div className="contents-icon">
                                <FontAwesomeIcon icon={faDesktop} />
                            </div>
                            <div className="contents-name">대시보드</div>
                            {/* <div className="tag">3</div> */}
                        </div>
                    </Link>
                </li>
                <li
                    className={navigation === "bleLog" ? "navi-list active" : "navi-list"}
                    id="navi-bleLog"
                    onClick={(e) => onNavigation(e, 'bleLog')}
                >
                    <Link to="/amons/m.home/log/ble">
                        <div className="contents-box">
                            <div className="contents-icon">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                            <div className="contents-name">잔류이력</div>
                            {/* <div className="tag">88</div> */}
                        </div>
                    </Link>
                </li>
                <li
                    className={navigation === "alarmLog" ? "navi-list active" : "navi-list"}
                    id="navi-alarmLog"
                    onClick={(e) => onNavigation(e, 'alarmLog')}
                >
                    <Link to="/amons/m.home/log/alarm">
                        <div className="contents-box">
                            <div className="contents-icon">
                                <FontAwesomeIcon icon={faHistory} />
                            </div>
                            <div className="contents-name">알람내역</div>
                            {
                                toDayAlarm.length > 0 &&
                                <div className="tag">{toDayAlarm.length}</div>
                            }
                        </div>
                    </Link>
                </li>
                <li
                    className={navigation === "drillSettig" ? "navi-list active" : "navi-list"}
                    id="navi-drillSettig"
                    onClick={(e) => onNavigation(e, 'drillSettig')}
                >
                    <Link to="/amons/m.home/setting/drill">
                        <div className="contents-box">
                            <div className="contents-icon">
                                <FontAwesomeIcon icon={faPen} />
                            </div>
                            <div className="contents-name">공정/굴진</div>
                            {/* <div className="tag">3</div> */}
                        </div>
                    </Link>
                </li>
            </ul>
        </NavigationCompo>
    );
};

export default Navigation;