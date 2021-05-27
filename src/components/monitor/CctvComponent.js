import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import InfoComponent from "./cctvPanel/InfoComponent";
import LocStatusComponent from "./cctvPanel/LocStatusComponent";
import CameraLocation001 from "./cctvPanel/CameraLocation001";
import CameraLocation002 from "./cctvPanel/CameraLocation002";
import CameraLocation003 from "./cctvPanel/CameraLocation003";
import CameraLocation004 from "./cctvPanel/CameraLocation004";
import AccessDetailPanel from "./cctvPanel/AccessDetailPanel";

const CctvCompo = styled.div`
  width: 100%;
  height: 100%;
  .info-box {
    height: 15.55%;
  }
  .status-box {
    height: 30.6%;
    background-color: #2e2e2e;
  }
  .cctv-box {
    height: 54%;
    background-color: beige;
    background-color: #2e2e2e;
    .access-detail-panel {
      left: -845px;
      top: -450px;
    }
  }
  .controll-box {
    width: 136px;
    height: 190px;
    background: #151515;
    border: 1px solid #5d5d5d;
    border-radius: 4px;
    position: relative;
    left: -146px;
    top: -452px;
    z-index: 900;
    .ptz-mode {
      width: 100%;
      height: 33px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      #zoom-label {
        margin-right: 10px;
      }
      input {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .ptz-zoom {
      width: 100%;
      height: 27px;
      display: flex;
      justify-content: center;
      align-items: center;
      .ctrlBtn-plus,
      .ctrlBtn-minus {
        width: 50px;
        height: 24px;
        background-color: #686868;
        border-radius: 4px;
        &:hover {
          background-color: #3c8dbc;
          cursor: pointer;
        }
      }
      .ctrlBtn-plus {
        background-image: url("../../../images/ptz_plus.png");
        background-repeat: no-repeat;
        margin-right: 10px;
      }
      .ctrlBtn-minus {
        background-image: url("../../../images/ptz_minus.png");
        background-repeat: no-repeat;
      }
    }
    .ptz-controll {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 128px;
      .button-panel {
        width: 79%;
        height: 82%;
        background-image: url("../../../images/cont-btn-bg.png");
        background-repeat: no-repeat;
        .ptz-header {
          width: 100%;
          height: 33.3%;
          display: flex;
          color: #686868;

          .upperLeft,
          .upper,
          .upperRight {
            height: 100%;
            width: 34%;
            font-size: 17px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              color: #3c8dbc;
              cursor: pointer;
            }
          }
          .upperLeft {
            padding-top: 17px;
            padding-left: 17px;
            span {
              transform: rotate(-45deg);
            }
          }
          .upper {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .upperRight {
            padding-top: 17px;
            padding-right: 17px;
            span {
              transform: rotate(45deg);
            }
          }
        }
        .ptz-center {
          width: 100%;
          height: 33.3%;
          display: flex;
          color: #686868;
          .left,
          .locate,
          .right {
            height: 100%;
            width: 35%;
            font-size: 17px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              color: #3c8dbc;
              cursor: pointer;
            }
          }
          .locate {
            color: #ffffff;
            border-radius: 50%;
            &.enable-location {
              color: #ffffff;
              border-radius: 50%;
              background-color: #3c8dbc;
            }
          }
        }
        .ptz-footer {
          width: 100%;
          height: 33.3%;
          display: flex;
          color: #686868;
          .lowerLeft,
          .lower,
          .lowerRight {
            height: 100%;
            width: 34%;
            font-size: 17px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              color: #3c8dbc;
              cursor: pointer;
            }
          }
          .lowerLeft {
            padding-bottom: 17px;
            padding-left: 17px;
            span {
              transform: rotate(45deg);
            }
          }
          .lowerRight {
            padding-bottom: 17px;
            padding-right: 17px;
            span {
              transform: rotate(-45deg);
            }
          }
        }
      }
    }
  }
`;

const CctvComponent = ({
  way,
  id,
  ctrlPanel,
  openCtrlPanel,
  accessPanel,
  openAccessPanel,
  alarmPanel,
  expandMap,
  data,
  scanner,
  bleData,
  processDisabled,
  repositionAct,
  scrollAct,
}) => {
  const [ctrlTarget, setTarget] = useState({
    id: null,
  });
  const [cctvShow, setShow] = useState({
    loc001: true,
    loc002: true,
    loc003: true,
    loc004: true,
  });

  useEffect(() => {}, [
    accessPanel,
    ctrlPanel,
    alarmPanel,
    expandMap,
    data,
    bleData,
  ]);

  return (
    <CctvCompo className="cctv-component">
      <div className="info-box">
        <InfoComponent
          way={way}
          id={id}
          ctrlPanel={ctrlPanel}
          openCtrlPanel={openCtrlPanel}
          accessPanel={accessPanel}
          openAccessPanel={openAccessPanel}
          localName={data && data.local_name}
          scanner={scanner}
          processDisabled={processDisabled}
        />
      </div>
      <div className="status-box">
        {data && (
          <LocStatusComponent
            processCode={data && data.local_process}
            planLength={data && data.plan_length}
            digLength={data && data.dig_length}
            bleData={bleData}
            scanner={scanner}
            processDisabled={processDisabled}
          />
        )}
      </div>
      <div className="cctv-box">
        {data && cctvShow["loc001"] && id === "loc001" && data.cctv_id && (
          <CameraLocation001
            id={id}
            ctrlPanel={ctrlPanel}
            accessPanel={accessPanel}
            alarmPanel={alarmPanel}
            expandMap={expandMap}
            data={data && data}
            repositionAct={repositionAct}
            scrollAct={scrollAct}
          />
        )}
        {data && cctvShow["loc002"] && id === "loc002" && data.cctv_id && (
          <CameraLocation002
            id={id}
            ctrlPanel={ctrlPanel}
            accessPanel={accessPanel}
            alarmPanel={alarmPanel}
            expandMap={expandMap}
            data={data && data}
            repositionAct={repositionAct}
            scrollAct={scrollAct}
          />
        )}
        {data && cctvShow["loc003"] && id === "loc003" && data.cctv_id && (
          <CameraLocation003
            id={id}
            ctrlPanel={ctrlPanel}
            accessPanel={accessPanel}
            alarmPanel={alarmPanel}
            expandMap={expandMap}
            data={data && data}
            repositionAct={repositionAct}
            scrollAct={scrollAct}
          />
        )}
        {data && cctvShow["loc004"] && id === "loc004" && data.cctv_id && (
          <CameraLocation004
            id={id}
            ctrlPanel={ctrlPanel}
            accessPanel={accessPanel}
            alarmPanel={alarmPanel}
            expandMap={expandMap}
            data={data && data}
            repositionAct={repositionAct}
            scrollAct={scrollAct}
          />
        )}
      </div>
      {accessPanel === id && bleData && (
        <AccessDetailPanel
          bleData={bleData}
          localName={data && data.local_name}
        />
      )}
    </CctvCompo>
  );
};

export default React.memo(CctvComponent);
