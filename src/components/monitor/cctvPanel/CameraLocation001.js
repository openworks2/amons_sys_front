import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Dahua from "../../../lib/cctv/location001/Dahua";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faSearch,
} from "@fortawesome/pro-solid-svg-icons";

const CameraCompo = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-left: 10px;
  .plugin-panel {
    .plugin {
      width: 416px;
      height: 233px;
    }
  }
`;

const CameraLocation001 = ({
  id,
  ctrlPanel,
  accessPanel,
  alarmPanel,
  expandMap,
  data,
  repositionAct,
  scrollAct,
}) => {
  // const [form, setForm] = useState({
  //     ip: 'openworks2.iptime.org',
  //     port: '1234',
  //     username: 'admin',
  //     password: 'work1801!@',
  //     rtspPort: 80,
  //     protocol: 0,
  //     timeout: 5,
  //     streamType: 1,
  //     channel: 1
  // });

  const [form, setForm] = useState({
    ip: data.cctv_ip,
    port: data.cctv_port,
    username: data.cctv_user_id,
    password: data.cctv_pw,
    rtspPort: 80,
    protocol: 0,
    timeout: 5,
    streamType: 1,
    channel: 1,
  });

  const [Camera, setCamera] = useState(null);

  const [radio, setRadio] = useState("zoom");

  const [Locate, setLocate] = useState(false);
  const [PTZ, setPTZ] = useState("zoom");

  const onRadioChange = (e) => {
    const { name } = e.target;
    setRadio(name);
    setPTZ(name);
  };
  /**
   * @description ptz locate operation control
   * @description State-Locate UPDATE
   */
  const ptzLocationHandler = () => {
    if (Locate) {
      Camera.closePtzLocate();
    } else {
      Camera.openPtzLocate();
    }
    setLocate(!Locate);
  };
  /**
   * @param{string} key 컨트롤 인덱스
   * @param{boolean} flag 진위값
   * @description 영상 이동 조작
   */
  const onPTZController = (key, flag) => {
    switch (key) {
      case "upperLeft":
        Camera.mouseUPLeftPTZControl(flag);
        break;
      case "upper":
        Camera.mouseUpPTZControl(flag);
        break;
      case "upperRight":
        Camera.mouseUPRightPTZControl(flag);
        break;
      case "left":
        Camera.mouseLefPTZControl(flag);
        break;
      case "right":
        Camera.mouseRightPTZControl(flag);
        break;
      case "lowerLeft":
        Camera.mouseDownLeftPTZControl(flag);
        break;
      case "lower":
        Camera.mouseDownPTZControl(flag);
        break;
      case "lowerRight":
        Camera.mouseDownRightPTZControl(flag);
        break;
      default:
        break;
    }
  };
  /**
   * @param{boolean} true- 실행 false-중지
   * @description zoomIN / focusIn / irisIN 실행
   */
  const onPlusAction = (flag) => {
    const _PTZ = PTZ;
    switch (_PTZ) {
      case "zoom":
        Camera.PTZZoomIn(flag);
        break;
      case "focus":
        Camera.PTZFocusIn(flag);
        break;
      case "aperture":
        Camera.PTZIrisIn(flag);
        break;
      default:
        break;
    }
  };
  /**
   * @param{boolean} true- 실행 false-중지
   * @description zoomOUT / focusOUT / irisOUT 실행
   */
  const onMinusAction = (flag) => {
    const _PTZ = PTZ;
    switch (_PTZ) {
      case "zoom":
        Camera.PTZZoomout(flag);
        break;
      case "focus":
        Camera.PTZFoucusOut(flag);
        break;
      case "aperture":
        Camera.PTZIrisOut(flag);
        break;
      default:
        break;
    }
  };

  const connCCTV = async () => {
    try {
      let cctv;
      window.cctv = cctv = await new Dahua(`divPlugin-${id}`);
      cctv.init(form);
      setCamera(cctv);
    } catch (error) {}
  };

  const resizeVideo = useCallback(() => {
    if (accessPanel !== null && accessPanel === "loc003") {
      Camera.hiddenScreen();
    } else if (accessPanel === null || accessPanel !== "loc003") {
      Camera.showScreen();
    }
  }, [Camera, accessPanel]);

  useEffect(() => {
    if (!Camera) {
      connCCTV();
    }
    if (Camera) {
      if (expandMap) {
        Camera.hiddenScreen();
      } else {
        if (alarmPanel) {
          Camera.hiddenScreen();
        } else {
          resizeVideo();
          // if (ctrlPanel !== id || ctrlPanel === null) {
          //     if (Locate) {
          //         ptzLocationHandler();
          //     }
          // }
        }
      }
    }
  }, [alarmPanel, expandMap]);

  useEffect(() => {
    if (Camera) {
      if (ctrlPanel !== id || ctrlPanel === null) {
        if (Locate) {
          ptzLocationHandler();
        }
        resizeVideo();
      }
    } else {
      return;
    }
  }, [accessPanel, ctrlPanel]);

  useEffect(() => {
    if (Camera && repositionAct) {
      Camera.setReposition();
    }
  }, [repositionAct]);

  useEffect(() => {
    if (Camera && scrollAct) {
      if (expandMap || alarmPanel) {
        Camera.hiddenScreen();
      } else {
        Camera.onScrollHandler();
      }
    }
  }, [scrollAct]);

  const resizeHandler = () => {
    if (Camera) {
      if (expandMap || alarmPanel) {
        Camera.hiddenScreen();
      }
    }
  };

  const scrollHandler = () => {
    if (Camera) {
      if (expandMap || alarmPanel) {
        Camera.hiddenScreen();
      } else {
        Camera.onScrollHandler();
      }
    }
  };
  window.addEventListener("resize", resizeHandler);

  return (
    <CameraCompo>
      <div className="plugin-panel">
        <div id={`divPlugin-${id}`} className="plugin"></div>
      </div>
      {ctrlPanel === id && (
        <div className="controll-box">
          <div className="ptz-mode">
            <input
              type="radio"
              id="zoom-btn"
              name="zoom"
              value="zoom"
              checked={radio === "zoom"}
              onChange={onRadioChange}
            />
            <label id="zoom-label">Zoom</label>
            <input
              type="radio"
              id="focus-btn"
              name="focus"
              value="focus"
              checked={radio === "focus"}
              onChange={onRadioChange}
            />
            <label>Focus</label>
          </div>
          <div className="ptz-zoom">
            <div
              className="ctrlBtn-plus"
              onMouseDown={() => onPlusAction(true)}
              onMouseUp={() => onPlusAction(false)}
            ></div>
            <div
              className="ctrlBtn-minus"
              onMouseDown={() => onMinusAction(true)}
              onMouseUp={() => onMinusAction(false)}
            ></div>
          </div>

          <div className="ptz-controll">
            <div className="button-panel">
              <div className="ptz-header">
                <div
                  className="upperLeft"
                  onMouseDown={() => onPTZController("upperLeft", true)}
                  onMouseUp={() => onPTZController("upperLeft", false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCaretUp} />
                  </span>
                </div>
                <div
                  className="upper"
                  onMouseDown={() => onPTZController("upper", true)}
                  onMouseUp={() => onPTZController("upper", false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCaretUp} />
                  </span>
                </div>
                <div
                  className="upperRight"
                  onMouseDown={() => onPTZController("upperRight", true)}
                  onMouseUp={() => onPTZController("upperRight", false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCaretUp} />
                  </span>
                </div>
              </div>
              <div className="ptz-center">
                <div
                  className="left"
                  onMouseDown={() => onPTZController("left", true)}
                  onMouseUp={() => onPTZController("left", false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCaretLeft} />
                  </span>
                </div>
                <div
                  className={
                    Locate
                      ? "locate enable-location"
                      : "locate disable-location"
                  }
                  onClick={ptzLocationHandler}
                >
                  <span>
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </div>
                <div
                  className="right"
                  onMouseDown={() => onPTZController("right", true)}
                  onMouseUp={() => onPTZController("right", false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCaretRight} />
                  </span>
                </div>
              </div>
              <div className="ptz-footer">
                <div
                  className="lowerLeft"
                  onMouseDown={() => onPTZController("lowerLeft", true)}
                  onMouseUp={() => onPTZController("lowerLeft", false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                </div>
                <div
                  className="lower"
                  onMouseDown={() => onPTZController("lower", true)}
                  onMouseUp={() => onPTZController("lower", false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                </div>
                <div
                  className="lowerRight"
                  onMouseDown={() => onPTZController("lowerRight", true)}
                  onMouseUp={() => onPTZController("lowerRight", false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {
                accessPanel === id && <AccessDetailPanel />
            } */}
    </CameraCompo>
  );
};

export default React.memo(CameraLocation001);
