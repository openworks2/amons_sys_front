import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRouter, faList, faArrows } from "@fortawesome/pro-duotone-svg-icons";

const InfoCompo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #000000;
  .left-box {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 22px;
    img {
      margin-right: 13px;
    }
    span {
      font-family: "NanumSquareR";
      font-size: 22px;
      color: #ffffff;
    }
  }
  .right-box {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    .nms-box {
      height: 100%;
      width: 45%;
      display: flex;
      justify-content: flex-end;
      padding-top: 14px;
      margin-right: 12px;
      div.nms-status {
        &.on {
          color: #036eb8;
        }
        &.off {
          color: #2e2e2e;
        }
        p.scanner-icon {
          font-size: 22px;
          margin-bottom: 0px;
          margin-left: 7px;
        }
        p.scanner-text {
          font-family: "NanumSquareB";
          font-size: 12px;
          margin-bottom: 0px;
          margin-left: 10px;
        }
      }
    }
    .optional-box {
      width: 52%;
      display: flex;
      padding-right: 11px;
      padding-top: 0px;
      margin-top: 13px;
      div.detail-panel-button,
      div.ptz-control-button {
        width: 44px;
        height: 44px;
        color: #ababab;
        border-radius: 4px;
        background-color: #2e2e2e;
        text-align: center;
        /* padding-top: 5px; */
        margin-left: 6px;
        .optional-icon {
          font-size: 18px;
        }
        .optional-name {
          font-family: "NotoSansKR-Regular";
          font-size: 12px;
          letter-spacing: 0.3px;
          font-weight: 100;
        }
        &:hover {
          cursor: pointer;
          color: #036eb8;
          background-color: #1e1e1e;
        }
        &.active {
          color: #036eb8;
        }
      }
    }
  }
`;
const InfoComponent = ({
  way,
  id,
  ctrlPanel,
  openCtrlPanel,
  accessPanel,
  openAccessPanel,
  localName,
  scanner,
  processDisabled,
}) => {
  const scannerListRender = (items = []) => {
    const _Component = items.map((item) => {
      return (
        <div key={item.scn_id}>
          <div
            className={
              item.scn_result === "open" ? "nms-status on" : "nms-status off"
            }
          >
            <p className="scanner-icon">
              <FontAwesomeIcon icon={faRouter} />
            </p>
            <p className="scanner-text">
              {item.scn_result === "open" ? "ON" : "OFF"}
            </p>
          </div>
        </div>
      );
    });
    return _Component;
  };
  useEffect(() => {}, [scanner]);

  return (
    <InfoCompo className="info-component">
      <div className="left-box">
        <img
          src={`../../../images/${
            way === "left" ? "arrow_left.png" : "arrow-right.png"
          }`}
          alt="이미지"
        ></img>
        <span>{localName}</span>
      </div>
      <div className="right-box">
        <div className="nms-box">
          {processDisabled === 1 && scanner && scannerListRender(scanner)}
        </div>
        <div className="optional-box">
          <div
            className={
              accessPanel === id
                ? "detail-panel-button active"
                : "detail-panel-button"
            }
            onClick={() => openAccessPanel(id)}
          >
            <div className="optional-icon">
              <FontAwesomeIcon icon={faList} />
            </div>
            <div className="optional-name">LIST</div>
          </div>
          <div
            className={
              ctrlPanel === id
                ? "ptz-control-button active"
                : "ptz-control-button"
            }
            onClick={() => openCtrlPanel(id)}
          >
            <div className="optional-icon">
              <FontAwesomeIcon icon={faArrows} />
            </div>
            <div className="optional-name">CCTV</div>
          </div>
        </div>
      </div>
    </InfoCompo>
  );
};

export default InfoComponent;
