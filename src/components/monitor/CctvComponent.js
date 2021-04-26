import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoComponent from './cctvPanel/InfoComponent';
import LocStatusComponent from './cctvPanel/LocStatusComponent';
import CameraLocation001 from './cctvPanel/CameraLocation001';
import CameraLocation002 from './cctvPanel/CameraLocation002';
import CameraLocation003 from './cctvPanel/CameraLocation003';
import CameraLocation004 from './cctvPanel/CameraLocation004';


const CctvCompo = styled.div`
    width: 100%;
    height: 100%;
    .info-box{
        height: 15.55%;
    }
    .status-box{
        height: 30.6%;
        background-color:#2E2E2E;
    }
    .cctv-box{
        height: 54%;
        background-color:beige;
        background-color:#2E2E2E;
        .access-detail-panel{
            left: -845px;
            top: -450px;
        }
    }   
    .controll-box{
        width: 136px;
        height: 190px;
        background: #151515;
        border: 1px solid #5d5d5d;
        border-radius: 4px; 
        position: relative;
        left: -146px;
        top: -452px;
        .ptz-mode{
            width: 100%;
            height: 33px;
            display:flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            #zoom-label{
                margin-right: 10px;
            }
            input{
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .ptz-zoom{
            width: 100%;
            height: 27px;
            display: flex;
            justify-content: center;
            align-items: center;
            .ctrlBtn-plus,
            .ctrlBtn-minus {
                width: 50px;
                height: 24px;
                background-color:#686868;
                border-radius: 4px;
                &:hover{
                    background-color:#3C8DBC;
                    cursor: pointer;
                }
            }
            .ctrlBtn-plus{
                background-image: url('../../../image/ptz_plus.png');
                background-repeat:no-repeat;
                margin-right: 10px;
            }
            .ctrlBtn-minus{
                background-image: url('../../../image/ptz_minus.png');
                background-repeat:no-repeat;
            }
        }
        .ptz-controll{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 128px;
            .button-panel {
                width: 79%;
                height: 82%;
                background-image: url('../../../image/cont-btn-bg.png');
                background-repeat:no-repeat;
                .ptz-header{
                    width:100%;
                    height:33.3%;
                    display: flex;
                    color: #686868;

                    .upperLeft,
                    .upper,
                    .upperRight{
                        height:100%;
                        width: 34%;
                        font-size: 17px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:hover{
                            color:#3C8DBC;
                            cursor: pointer;
                        }
                    }
                    .upperLeft{
                        padding-top: 17px;
                        padding-left: 17px;
                        span{
                            transform: rotate( -45deg );
                        }
                    }
                    .upper{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .upperRight{
                        padding-top: 17px;
                        padding-right: 17px;
                        span{
                            transform: rotate( 45deg );
                        }
                    }
                }
                .ptz-center{
                    width:100%;
                    height:33.3%;
                    display: flex;
                    color: #686868;
                    .left,
                    .locate,
                    .right{
                        height:100%;
                        width: 35%;
                        font-size: 17px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:hover{
                            color:#3C8DBC;
                            cursor: pointer;
                        }
                    }
                    .locate{
                        color: #ffffff;
                        border-radius:50%;
                        &.enable-location{
                            color:#ffffff;
                            border-radius: 50%;
                            background-color: #3C8DBC;
                        }
                    }
                }
                .ptz-footer{
                    width:100%;
                    height:33.3%;
                    display: flex;
                    color: #686868;
                    .lowerLeft,
                    .lower,
                    .lowerRight{
                        height:100%;
                        width: 34%;
                        font-size: 17px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:hover{
                            color:#3C8DBC;
                            cursor: pointer;
                        }
                    }
                    .lowerLeft{
                        padding-bottom: 17px;
                        padding-left: 17px;
                        span{
                            transform: rotate( 45deg );
                        }
                    }
                    .lowerRight{
                        padding-bottom: 17px;
                        padding-right: 17px;
                        span{
                            transform: rotate( -45deg );
                        }
                    }
                }
            }
        }
    }
`;

const CctvComponent = ({ way, id, ctrlPanel, openCtrlPanel, accessPanel, openAccessPanel }) => {

    const [ctrlTarget, setTarget] = useState({
        id: null
    });
    const [cctvShow, setShow] = useState({
        loc001: true,
        loc002: true,
        loc003: true,
        loc004: true
    });


    useEffect(() => {
        // setTimeout(()=>{
        //     setShow({
        //         ...cctvShow,
        //         loc002: true
        //     })
        //     // setTimeout(()=>{
        //     //   setAdd2(true)
        //     //   // setTimeout(()=>{
        //     //   //   setAdd3(true)
        //     //   // },1500);
        //     // },1500);
        //   },1500);
    }, []);

    return (
        <CctvCompo className="cctv-component">
            <div className="info-box" >
                <InfoComponent
                    way={way}
                    id={id}
                    ctrlPanel={ctrlPanel} 
                    openCtrlPanel={openCtrlPanel}
                    accessPanel={accessPanel}
                    openAccessPanel={openAccessPanel}
                />
            </div>
            <div className="status-box">
                <LocStatusComponent />
            </div>
            <div className="cctv-box">
                {
                    cctvShow['loc001'] && id === 'loc001' && <CameraLocation001 id={id} ctrlPanel={ctrlPanel} accessPanel={accessPanel} />
                }
                {
                    cctvShow['loc002'] && id === 'loc002' && <CameraLocation002 id={id} ctrlPanel={ctrlPanel} accessPanel={accessPanel} />
                }
                {
                    cctvShow['loc003'] && id === 'loc003' && <CameraLocation003 id={id} ctrlPanel={ctrlPanel} accessPanel={accessPanel} />
                }
                {
                    cctvShow['loc004'] && id === 'loc004' && <CameraLocation004 id={id} ctrlPanel={ctrlPanel} accessPanel={accessPanel} />
                }
            </div>
        </CctvCompo>
    );
};

export default CctvComponent;