import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AlarmModal from '../../components/monitor/AlarmModal';
import CctvComponent from '../../components/monitor/CctvComponent';
import DrillMapComponent from '../../components/monitor/DrillMapComponent';
import ExpandMapComponent from '../../components/monitor/ExpandMapComponent';
import MapComponent from '../../components/monitor/MapComponent';
import NoticeCompo from '../../components/monitor/Notice';
import StatusInfo from '../../components/monitor/StatusInfo';
import TodayInfoComponent from '../../components/monitor/TodayInfoComponent';
import { getBleBeacon, getMonitor, getScanner, getWeather, receiveMonitor } from '../../modules/monitor';

const MonitorCompo = styled.div`
    width: 100vw;
    height: 100vh;
    min-width: 1920px;
    min-height: 1075px;

`;
const TopCompo = styled.div`
        width: 100vw;
        height: 6.5%;
`
const BodyCompo = styled.div`
    width: 100vw;
    height: 93.5%;
    /* display: inline-flex; */
    background: #5E5E5E;
    min-width: 100%;
    .left-compo {
        width: 53.54%;
        height: 100%;
        float: left;
        padding: 10px;
        .left-top-box{
            width: 100%;
            height: 9.8em;
        }
        .left-center-box{
            width: 100%;
            height: 17.8em;
            margin-top: 10px;
        }
        .left-bottom-box{
            width: 100%;
            height: 41.72em;
            margin-top: 10px;
        }
    }
    .right-compo {
        width: 46.46%;
        height: 100%;   
        float: left;
        padding: 10px 10px 10px 0px;
        .right-left-box{
            height: 100%;
            width: 49.44%;
            float: left;
            margin-right: 9.9px;
        }
        .right-right-box{
            height: 100%;
            width: 49.44%;
            float: left;
        }
        .top-panel{
            width: 100%;
            height: 4.79em;
            /* background: #000000;
            opacity: 0.7; */
            background: rgba(0, 0, 0, 0.7);
            margin-bottom: 10px;
            border-radius: 5px;
        }
        .cctv-panel{
            width: 100%;
            height: 65.2em;
            background: #5E5E5E;
            .top-cctv{
                width: 100%;
                height: 49.4%;
                margin-bottom: 11px;
            }
            .bottom-cctv{
                width: 100%;
                height: 49.4%;
                background-color:#000000;
            }
        }
    }
`;


const MonitorContainer = () => {

    const { monitor, scanner, weather, beacon, ratePanel } = useSelector(state => {
        return state.monitor
    });


    const dispatch = useDispatch();

    // 컨트롤 패널 OPEN
    const [ctrlPanel, setOpenCtrlPanel] = useState(null);
    // 출입 관리 패너 open
    const [accessPanel, setOpenAccessPanel] = useState(null);
    // SOS 알람 
    const [alarmPanel, setOpenAlarmPanel] = useState(false);
    // 맵 확대
    const [expandMap, setOpenExpandMap] = useState(false);

    const [location, setLocation] = useState({
        loc001: undefined,
        loc002: undefined,
        loc003: undefined,
        loc004: undefined
    })

    const openCtrlPanel = (id) => {
        if (ctrlPanel === id) {
            setOpenCtrlPanel(null);
        } else {
            console.log(id)
            setOpenCtrlPanel(id);
            setOpenAccessPanel(null);
        }
    }

    const openAccessPanel = (id) => {
        console.log(id)
        if (accessPanel === id) {
            setOpenAccessPanel(null)
        } else {
            setOpenAccessPanel(id)
            setOpenCtrlPanel(null);
        }
    }

    const setOpenAlarmModal = () => {
        setOpenAlarmPanel(!alarmPanel);
    }

    const setOpenExpandMapHandler = () => {
        setOpenExpandMap(!expandMap)
    }
    // dispatch(getMonitor());

    const getDispatch = async () => {
        dispatch(getMonitor());
        dispatch(getScanner());
        dispatch(receiveMonitor());
        dispatch(getWeather());
        dispatch(getBleBeacon());
    }
    const localScanner = (localIndex) => {
        const data = scanner.data;
        const filterScanners = data.filter((item) => item.local_index === localIndex);
        return filterScanners;
    }
    const localBeacon = (localIndex) => {
        const data = beacon.data;
        const filterBeacons = data.filter((item) => item.local_index === localIndex);
        return filterBeacons;
    }


    useEffect(() => {
        getDispatch();
        // socket.emit("roomjoin", 'dong');  // been이라는 방 만들기
        // dispatch(receiveMonitor());
    }, [dispatch]);

    return (
        <MonitorCompo className="monitor-component">
            <TopCompo className="top-component" />
            <BodyCompo className="body-component">
                <div className="left-compo">
                    <div className="left-top-box info-box">
                        {monitor.data && beacon.data &&
                            <StatusInfo localInfo={monitor.data} bleData={beacon.data && beacon.data} />
                        }
                    </div>
                    <div className="left-center-box drill-map-box">
                        {monitor.data &&
                            <DrillMapComponent
                                ratePanelOpen={ratePanel}
                                data={monitor.data && monitor.data}
                            />
                        }
                    </div>
                    <div className="left-bottom-box map-box">
                        {
                            monitor.data &&
                            <MapComponent setOpenExpandMapHandler={setOpenExpandMapHandler} data={monitor.data && monitor.data} bleData={beacon.data && beacon.data} />
                        }
                    </div>
                </div>
                <div className="right-compo">
                    <div className="right-left-box">
                        <div className="top-panel">
                            <NoticeCompo />
                        </div>
                        <div className="cctv-panel">
                            <div className="top-cctv">
                                {monitor.data && beacon.data &&
                                    <CctvComponent
                                        way="right"
                                        id="loc001"
                                        ctrlPanel={ctrlPanel}
                                        openCtrlPanel={openCtrlPanel}
                                        accessPanel={accessPanel}
                                        openAccessPanel={openAccessPanel}
                                        alarmPanel={alarmPanel}
                                        expandMap={expandMap}
                                        data={monitor.data && monitor.data[0]}
                                        scanner={scanner.data && localScanner(monitor.data[0].local_index)}
                                        bleData={beacon.data && localBeacon(monitor.data[0].local_index)}
                                    />
                                }
                            </div>
                            <div className="bottom-cctv">
                                {monitor.data && beacon.data &&
                                    <CctvComponent
                                        way="right"
                                        id="loc002"
                                        ctrlPanel={ctrlPanel}
                                        openCtrlPanel={openCtrlPanel}
                                        accessPanel={accessPanel}
                                        openAccessPanel={openAccessPanel}
                                        alarmPanel={alarmPanel}
                                        expandMap={expandMap}
                                        data={monitor.data && monitor.data[2]}
                                        scanner={scanner.data && localScanner(monitor.data[2].local_index)}
                                        bleData={beacon.data && localBeacon(monitor.data[2].local_index)}

                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="right-right-box">
                        <div className="top-panel">
                            {
                                weather.data &&
                                <TodayInfoComponent weather={weather} />
                            }
                        </div>
                        <div className="cctv-panel">
                            <div className="top-cctv">
                                {monitor.data && beacon.data &&
                                    <CctvComponent
                                        way="left"
                                        id="loc003"
                                        ctrlPanel={ctrlPanel}
                                        openCtrlPanel={openCtrlPanel}
                                        accessPanel={accessPanel}
                                        openAccessPanel={openAccessPanel}
                                        alarmPanel={alarmPanel}
                                        expandMap={expandMap}
                                        data={monitor.data && monitor.data[1]}
                                        scanner={scanner.data && localScanner(monitor.data[1].local_index)}
                                        bleData={beacon.data && localBeacon(monitor.data[1].local_index)}

                                    />
                                }
                            </div>
                            <div className="bottom-cctv">
                                {monitor.data && beacon.data &&
                                    <CctvComponent
                                        way="left"
                                        id="loc004"
                                        ctrlPanel={ctrlPanel}
                                        openCtrlPanel={openCtrlPanel}
                                        accessPanel={accessPanel}
                                        openAccessPanel={openAccessPanel}
                                        alarmPanel={alarmPanel}
                                        expandMap={expandMap}
                                        data={monitor.data && monitor.data[3]}
                                        scanner={scanner.data && localScanner(monitor.data[3].local_index)}
                                        bleData={beacon.data && localBeacon(monitor.data[3].local_index)}

                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    expandMap && <ExpandMapComponent setOpenExpandMapHandler={setOpenExpandMapHandler} data={monitor.data && monitor.data} bleData={beacon.data && beacon.data} />
                }
            </BodyCompo>
            {
                alarmPanel && <AlarmModal setOpenAlarmModal={setOpenAlarmModal} />
            }
        </MonitorCompo>
    );
};

export default MonitorContainer;