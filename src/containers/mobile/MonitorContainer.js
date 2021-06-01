import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LocationInfo from '../../components/mobile/LocationInfo';
import { getMonitor, receiveMonitor } from '../../modules/monitor';

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

    }

`;

const MonitorContainer = () => {

    const { monitor, scanner, beacon } = useSelector(state => state.monitor);

    const [locationAct, setLocationAct] = useState({
        index: null,
        item: null
    });

    const [location, setLoctaion] = useState([]);

    const dispatch = useDispatch();
    const getDispatch = useCallback(async () => {
        dispatch(receiveMonitor());
        dispatch(getMonitor());
    }, [dispatch]);

    useEffect(() => {
        getDispatch();

    }, [getDispatch]);

    useEffect(() => {
        if (monitor.data) {
            console.log('-->', monitor.data)
            setLoctaion(monitor.data);
            setLocationAct({
                index: monitor.data[0].local_index,
                item: monitor.data[0]
            });
        }
    }, [monitor.data]);

    const onChangeLocation = (e, index) => {

        const findItem = location.find(item => item.local_index === index ? item : null);
        console.log('findItemp-->', findItem)
        setLocationAct({
            index,
            item: findItem
        })
    }

    const renderList = useCallback((items = []) => {
        if (items.length === 0) return;
        return items.map((item, index) => {
            return <li
                key={index}
                className={locationAct.index === item.local_index ? "loaction-item active" : "loaction-item"}
                onClick={(e) => onChangeLocation(e, item.local_index)}
            >
                <div className="location-name">
                    <div className="name-text">{item.local_name}</div>
                </div>
                <div className="bar"></div>
            </li>
        });
    }, [locationAct.index]);

    return (
        <MonitorCompo>
            <div className="list-container">
                <ul className="location-list">
                    {
                        monitor.data && renderList(monitor.data)
                    }
                </ul>
            </div>
            <div className="contents-container">
                {
                    locationAct.item &&
                    <LocationInfo
                        localData={locationAct.item}
                        scanner={scanner}
                        beacon={beacon}
                    />
                }
            </div>
        </MonitorCompo>
    );
};

export default MonitorContainer;