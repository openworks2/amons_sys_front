import { faClock } from '@fortawesome/pro-regular-svg-icons';
import { faArrowLeft, faPhone } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import VehicleItemComponent from '../../components/mobile/VehicleItemComponent';
import WorkerItemComponent from '../../components/mobile/WorkerItemComponent';
import { receiveMonitor, socketDisconnet } from '../../modules/monitor';

const AccessCompo = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    .access-header{
        width: 100%;
        height: 8.8%;
        background-color: #2e2e2e;
        color:#FFFFFF;
        font-size: 20px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        font-family: NotoSansKR-Medium;
        .header-icon {
            height: 100%;
            width: 10.6%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .header-title{
            
        }

    }
    .access-body{
        width: 100%;
        height: 91.2%;
        background-color: #D4D7DE;
        padding-top: 10px;
        color: #2E2E2E;
        .location-name {
            font-family: NotoSansKR-Regular;
            font-size: 16px;
            padding-left: 15px;
            width: 100%;
            height: 4%;
            min-height: 26px;
        }
        .location-access-box {
            width: 100%;
            height: 96%;
            padding-top: 10px;
            padding-left: 2.78vw;
            padding-right: 2.78vw;
            overflow-y: scroll;
            ::-webkit-scrollbar { display: none; }

            ul.worker-list {
                padding: 0;
                margin: 0;
                list-style: none;
                /* display: flex;
                justify-content: center;
                align-items: center; */
            }
        }
    }
`;

const AccessContainer = ({ match, history }) => {
    const { monitor, scanner, beacon } = useSelector(state => state.monitor);
    const dispatch = useDispatch();
    const { type, index } = match.params;

    const [bleList, setBleList] = useState([]);

    useEffect(() => {
        console.log('beacon--->', beacon)
        console.log('match--->', match)
        console.log('history--->', history)
        setLocalBleList(index);

    }, [beacon.data]);

    useEffect(() => {
        dispatch(receiveMonitor());
        return () => {
            dispatch(socketDisconnet());
        }
    }, []);

    const onGoBack = () => {
        history.goBack();
    }

    const workerListRender = (items = []) => {
        return items.map(item => <WorkerItemComponent item={item} />)
    }

    const vehicleListRender = (items = []) => {
        return items.map(item => <VehicleItemComponent item={item} />)
    }

    const setLocalBleList = (localIndex) => {
        if (beacon.data) {
            const conditionInt = type === 'worker' ? 1 : 2;
            const filterList = beacon.data.filter(item =>
                item.local_index === localIndex && item.bc_used_type === conditionInt ? item : null
            );
            setBleList(filterList);
            console.log('setLocalBleList-->', filterList)
        }
    }

    return (
        <AccessCompo className="worker-access-component">
            <div className="access-header">
                <div className="header-icon" onClick={onGoBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="header-title">
                    <span>{`${type === 'worker' ? '인원' : '차량'}현황`}</span>
                </div>
            </div>
            <div className="access-body">
                <div className="location-name">{'시점 함양'}</div>
                <div className="location-access-box">
                    <ul className="worker-list">
                        {
                            type === 'worker'
                                ? workerListRender(bleList)
                                : vehicleListRender(bleList)
                        }
                    </ul>
                </div>
            </div>
        </AccessCompo>
    );
};

export default AccessContainer;