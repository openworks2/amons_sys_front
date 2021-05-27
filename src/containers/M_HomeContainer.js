import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import styled from 'styled-components';
import Header from '../components/mobile/Header';
import Navigation from '../components/mobile/Navigation';
import storage from '../lib/starage';
import { loginCheckAsync, logOutAsync } from '../modules/login';
import AlarmLogContainer from './mobile/AlarmLogContainer';
import BleLogContainer from './mobile/BleLogContainer';
import DrillComponent from './mobile/DrillComponent';
import MonitorContainer from './mobile/MonitorContainer';

const HomeCompo = styled.div`
    width: 100%;
    height: 100%;
    .header-component{
        width: 100%;
        height: 8.75%;
        min-height: 50px;
    }
    .contents-component{
        width: 100%;
        /* height: 82.5%; */
        height: 83vh;
        background-color: gray;
    }
    .navigation-component{
        width: 100%;
        height: 8.75%;
        min-height: 50px;
        z-index: 900;
        position: relative;
        bottom: 0;
    }
`;


const M_HomeContainer = () => {

    const {
        data: user,
        failMsg,
        validated
    } = useSelector((state) => state.login.login);

    const dispatch = useDispatch();

    const [navigation, setNavigation] = useState('dashbord');

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
        } catch (e) {
            storage.remove("user");
        }
    }, []);

    useEffect(() => {
        console.log('login--->>', user)
        initialUserInfo();
        if (user) return <Redirect to="/amons/m.home" />

    }, []);

    const onLogout = async () => {
        try {
            await dispatch(logOutAsync());
            window.location.href = "/amons/m.signin";

        } catch (error) {

        }
    }


    return (
        <HomeCompo className="home-component">
            <div className="header-component">
                <Header onLogout={onLogout} />
            </div>
            <div className="contents-component">
                <Route path="/amons/m.home" component={MonitorContainer} exact />
                <Route path="/amons/m.home/blelog" component={BleLogContainer} />
                <Route path="/amons/m.home/alarmlog" component={AlarmLogContainer} />
                <Route path="/amons/m.home/drill" component={DrillComponent} />
            </div>
            <div className="navigation-component">
                <Navigation navigation={navigation} onNavigation={onNavigation} />
            </div>
        </HomeCompo>
    );
};

export default M_HomeContainer;