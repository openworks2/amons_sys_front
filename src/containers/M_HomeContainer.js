import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import styled from 'styled-components'
import Header from '../components/mobile/Header';
import Navigation from '../components/mobile/Navigation';
import storage from '../lib/starage';
import { getAlarmsLimit } from '../modules/alarms';
import { loginCheckAsync, logOutAsync } from '../modules/login';
import AlarmLogContainer from './mobile/AlarmLogContainer';
import BleLogContainer from './mobile/BleLogContainer';
import DrillComponent from './mobile/DrillComponent';
import MonitorContainer from './mobile/MonitorContainer';
import SearchResultContainer from './mobile/SearchResultContainer';

const HomeCompo = styled.div`
    width: 100%;
    height: 100%;
    min-width: 331px;
    .header-component{
        width: 100%;
        height: 8.75%;
        min-height: 50px;
    }
    .contents-component{
        width: 100%;
        height: 82.5%;
        /* height: 83vh; */
    }
    .navigation{
        width: 100%;
        height: 8.75%;
        min-height: 50px;
        z-index: 900;
        position: fixed;
        bottom: 0;
    }
    /* @media screen and (max-width:412px){   
        .header-component{
            position: fixed;
        }    
    } */
`;


const M_HomeContainer = ({ match, history }) => {

    const {
        data: user,
        failMsg,
        validated
    } = useSelector((state) => state.login.login);

    const { data: alarmList } = useSelector(state => state.alarms.alarms);

    const dispatch = useDispatch();

    const [navigation, setNavigation] = useState(null);

    const [curruntPage, setCurrentPage] = useState(null);

    const [toDayAlarm, setToDayAlarmCount] = useState([]);


    const onNavigation = (e, name) => {
        setNavigation(name);
    }


    const initialUserInfo = useCallback(async () => {
        const loginedInfo = storage.get("user"); // 로그인 정보를 로컬스코리지에서 가져오기
        if (!loginedInfo) {
            window.location.href = '/amons/m.signin';
        }; // 로그인 정보가 없다면 멈춤
        // if (!loginedInfo) return <Redirect to="/amons/m.signin" />; // 로그인 정보가 없다면 멈춤
        console.log("user--->", user);
        console.log("failMsg-->", failMsg);
        try {
            await dispatch(loginCheckAsync());
            // dispatch(setLogindInfoAsync(loginedInfo))
            dispatch(getAlarmsLimit())

        } catch (e) {
            storage.remove("user");
        }
    }, []);

    useEffect(() => {
        initialUserInfo();
        if (user) return <Redirect to="/amons/m.home/monitor" />
    }, []);


    useEffect(() => {
        console.log(history.location.pathname)
        const pathName = history.location.pathname;
        const splitPath = pathName.split('/');
        const currentPath = splitPath[splitPath.length - 1];
        setCurrentPage(currentPath);

        if (currentPath === 'ble') {
            setNavigation('bleLog')
        }
        else if (currentPath === 'alarm') {
            setNavigation('alarmLog')

        }
        else if (currentPath === 'drill') {
            setNavigation('drillSettig')

        }
        else if (currentPath === 'result') {
            return;
        }
        else {
            setNavigation('monitor')
        }

    }, [match, history]);

    useEffect(() => {
        if (alarmList) {
            let tempList =[];
            alarmList.map((item) => {
                const _fromDate = moment(item.emg_start_time);
                const _toDate = moment();

                const _days = moment.duration(_toDate.diff(_fromDate)).days();
                if (_days === 0) {
                    tempList.push(item);
                }
                return item;
            });
            setToDayAlarmCount(tempList)
        }

    }, [alarmList]);

    const onLogout = async () => {
        try {
            await dispatch(logOutAsync());
            window.location.href = "/amons/m.signin";

        } catch (error) {

        }
    }

    const onGoBack = () => {
        history.goBack();
    }


    return (
        <HomeCompo className="home-component">
            <div className="header-component">
                <Header
                    onLogout={onLogout}
                    curruntPage={curruntPage}
                    onGoBack={onGoBack}
                />
            </div>
            <div className="contents-component">
                <Route path="/amons/m.home/monitor" component={MonitorContainer} exact />
                <Route path="/amons/m.home/monitor/:index" component={MonitorContainer} />
                <Route path="/amons/m.home/log/ble" component={BleLogContainer} exact />
                <Route path="/amons/m.home/log/ble/:type/result" component={SearchResultContainer} />
                <Route path="/amons/m.home/log/alarm" component={AlarmLogContainer} />
                <Route path="/amons/m.home/setting/drill" component={DrillComponent} />
            </div>
            {
                curruntPage === 'result' ||
                <div className="navigation">
                    <Navigation
                        navigation={navigation}
                        onNavigation={onNavigation}
                        curruntPage={curruntPage}
                        toDayAlarm={toDayAlarm}
                    />
                </div>
            }
        </HomeCompo>
    );
};

export default M_HomeContainer;