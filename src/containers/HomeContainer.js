import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Contents from '../components/Home/Contents';
import Header from '../components/Home/Header';
import SideMenu from '../components/Home/SideMenu';
import { getCompanies } from '../modules/companies';

const HomeCompo = styled.div`
    height: 100%;
    min-width: 1645px;
    min-height: 900px;
    .top {
        width: 100%;
        height: 20%;
        background-color: gray;
    }
    .bottom {
        height: 80%;
        display: flex;
        .bottom-left {
            width:20%;
            height: 100%;
            background-color: green;
        }
        .bottom-right {
            width:80%;
            height: 100%;
            background-color: aqua;
        }
    }
`;

const HomeContainer = () => {
    const {data, loading, error } = useSelector(state=>state.compani2.companies)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCompanies())
    },[dispatch]);

    return (
        <HomeCompo className="Home-component">
            <div className="top">
                <Header />
            </div>
            <div className="bottom">
                <div className="bottom-left">
                    <SideMenu />
                </div>
                <div className="bottom-right">
                    <Contents />
                </div>
            </div>
        </HomeCompo>
    );
};

export default HomeContainer;