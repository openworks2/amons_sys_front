import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CctvCompo from '../../components/monitor/CctvComponent';
import DrillMapComponent from '../../components/monitor/DrillMapComponent';
import MapComponent from '../../components/monitor/MapComponent';
import NoticeCompo from '../../components/monitor/Notice';
import StatusInfo from '../../components/monitor/StatusInfo';
import TodayInfoComponent from '../../components/monitor/TodayInfoComponent';

const MonitorCompo = styled.div`
    width: 100vw;
    height: 100vh;
    min-width: 1920px;
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
            background: #000000;
            opacity:0.7;
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





const MonitorContainer = ({ ratePanelOpen }) => {
    const [ctrlPanel, setOpenCtrlPanel] = useState(null);
    const [accessPanel, setOpenAccessPanel] = useState(null);

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
    useEffect(() => {


    }, []);

    return (
        <MonitorCompo className="monitor-component">
            <TopCompo className="top-component" />
            <BodyCompo className="body-component">
                <div className="left-compo">
                    <div className="left-top-box info-box">
                        <StatusInfo />
                    </div>
                    <div className="left-center-box drill-map-box">
                        <DrillMapComponent ratePanelOpen={ratePanelOpen} />
                    </div>
                    <div className="left-bottom-box map-box">
                        <MapComponent />
                    </div>
                </div>
                <div className="right-compo">
                    <div className="right-left-box">
                        <div className="top-panel">
                            {/* <NoticeCompo /> */}
                        </div>
                        <div className="cctv-panel">
                            <div className="top-cctv">
                                <CctvCompo
                                    way="right"
                                    id="loc001"
                                    ctrlPanel={ctrlPanel}
                                    openCtrlPanel={openCtrlPanel}
                                    accessPanel={accessPanel}
                                    openAccessPanel={openAccessPanel}
                                />
                            </div>
                            <div className="bottom-cctv">
                                <CctvCompo
                                    way="right"
                                    id="loc002"
                                    ctrlPanel={ctrlPanel}
                                    openCtrlPanel={openCtrlPanel}
                                    accessPanel={accessPanel}
                                    openAccessPanel={openAccessPanel}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="right-right-box">
                        <div className="top-panel">
                           <TodayInfoComponent />
                        </div>
                        <div className="cctv-panel">
                            <div className="top-cctv">
                                <CctvCompo
                                    way="left"
                                    id="loc003"
                                    ctrlPanel={ctrlPanel}
                                    openCtrlPanel={openCtrlPanel}
                                    accessPanel={accessPanel}
                                    openAccessPanel={openAccessPanel}
                                />
                            </div>
                            <div className="bottom-cctv">
                                <CctvCompo
                                    way="left"
                                    id="loc004"
                                    ctrlPanel={ctrlPanel}
                                    openCtrlPanel={openCtrlPanel}
                                    accessPanel={accessPanel}
                                    openAccessPanel={openAccessPanel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </BodyCompo>
        </MonitorCompo>
    );
};

export default MonitorContainer;