import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LocationInfoComponent from '../../components/mobile/LocationInfoComponent';
import LocationStateComponent from '../../components/mobile/LocationStateComponent';
import WorkerAccessComponent from './AccessContainer';
import { getMonitor, receiveMonitor, socketDisconnet } from '../../modules/monitor';
import { getAlarmsLimit } from '../../modules/alarms';

const MonitorCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: #D4D7DE;
    .list-container{
        width: 100%;
        height: 7%;
        min-height: 48px;
        ul.location-list{
            margin: 0;
            padding: 0;
            display: flex;
            list-style: none;
            width: 100%;
            height: 100%;
            background-color: #2E2E2E;
            li.loaction-item{
                width: 25%;
                color: rgba(255, 255, 255, 0.3);
                a {
                    color: inherit;
                    text-decoration: none;
                }
                &.active{
                    color: rgba(255, 255, 255, 1);
                    .bar{
                        background-color: #F1592A;
                    }
            }
            .location-name{
                width: 100%;
                height: 91%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                font-family: NotoSansKR-Medium;
                    .name-text{
                        width: 5em;
                        text-align: center;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
                .bar{
                    width: 100%;
                    height: 9%;
                }
            }
        }
    }
    .contents-container{
        width: 100%;
        height: 91%;
        .location-header {
            width: 100%;
            height: calc(100% - 362px);
        }
        .location-body {
            width: 100%;
            height: 75.3%;
        }
    }

`;

const MonitorContainer = ({ match }) => {
    const { monitor, scanner, beacon } = useSelector(state => state.monitor);
    const dispatch = useDispatch();

    const [locationAct, setLocationAct] = useState({
        index: null,
        item: null
    });

    const [location, setLoctaion] = useState([]);

    const [bleList, setBleList] = useState([]);
    const [locBleList, setLocBleList] = useState([]);

    const [LocScannerList, setLocScannerList] = useState([]);

    const getDispatch = useCallback(async () => {
        dispatch(receiveMonitor());
        dispatch(getMonitor());

    }, [dispatch]);

    useEffect(() => {
        getDispatch();
        return () => {
            dispatch(socketDisconnet());
        }
    }, [getDispatch]);

    useEffect(() => {
        if (beacon.data) {
            setBleList(beacon.data)
            setLocalBleList(locationAct.index);
            setScannerList(locationAct.index)
        }
    }, [beacon.data]);

    useEffect(() => {
        if (monitor.data) {
            setLoctaion(monitor.data);

            if (match.params.index) {
                const { index } = match.params;
                setLocationAct({
                    index: index,
                    item: monitor.data.find(item => item.local_index === index ? item : null)
                });
                setLocalBleList(index);
                setScannerList(index)
            } else {
                setLocationAct({
                    index: monitor.data[0].local_index,
                    item: monitor.data[0]
                });
            }
        }
        
    }, [monitor.data, match]);



    const onChangeLocation = (e, index) => {

        const findItem = location.find(item => item.local_index === index ? item : null);
        setLocationAct({
            index,
            item: findItem
        })
        setLocalBleList(index);

    }
    
    const setLocalBleList = (localIndex) => {
        if (beacon.data) {
            const localBleList = beacon.data.filter(item => item.local_index === localIndex ? item : null);
            setLocBleList(localBleList);
        }
    }
    const setScannerList = (localIndex) =>{
        if(scanner.data){
            console.log('00.setScannerList--->',localIndex);
            console.log('11.setScannerList--->',scanner.data);

            const localScannerList = scanner.data.filter(item => item.local_index === localIndex ? item : null);
            console.log('setScannerList--->',localScannerList);
            setLocScannerList(localScannerList);
        }
    }


    const renderList = useCallback((items = []) => {
        if (items.length === 0) return;
        return items.map((item, index) => {
            return (
                <li
                    key={index}
                    className={locationAct.index === item.local_index ? "loaction-item active" : "loaction-item"}
                // onClick={(e) => onChangeLocation(e, item.local_index)}
                >
                    <Link to={`/amons/m.home/monitor/${item.local_index}`}>
                        <div className="location-name">
                            <div className="name-text">{item.local_name}</div>
                        </div>
                        <div className="bar"></div>
                    </Link>
                </li>
            )

        });
    }, [locationAct.index]);



    return (
        <>
            <MonitorCompo>
                <div className="list-container">
                    <ul className="location-list">
                        {
                            monitor.data && renderList(monitor.data)
                        }
                    </ul>
                </div>
                <div className="contents-container">
                    <div className="location-header">
                        {
                            locationAct.item &&
                            <LocationInfoComponent
                                localData={locationAct.item}
                                LocScannerList={LocScannerList}
                            />
                        }
                    </div>
                    <div className="location-body">
                        {
                            locationAct.item &&
                            <LocationStateComponent
                                localData={locationAct.item}
                                locationAct={locationAct}
                                locBleList={locBleList}
                            />
                        }
                    </div>
                </div>
            </MonitorCompo>
        </>
    );
};

export default MonitorContainer;