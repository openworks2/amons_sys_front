import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VehicleDetailComponent from "./VehicleDetailComponent";
import WorkerDetailComponent from "./WorkerDetailComponent";
import Moment from "react-moment";

const AccessDetailCompo = styled.div`
  width: 850px;
  height: 262px;
  background-color: #000000;
  display: flex;
  position: relative;
  padding-left: 3px;
  padding-top: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  z-index: 101;
  top: -451px;
  right: 850px;

  .left-area {
    width: 50%;
    height: 100%;
    margin-right: 2px;
  }
  .right-area {
    width: 50%;
    height: 100%;
    background-color: yellow;
  }
  .table-box {
    width: 100%;
    height: 100%;
    border: 1px solid #484848;
    background-color: #333333;
    height: 256px;
    .worker-table-box {
      width: 410px;
    }
    .vehicle-table-box {
      width: 416px;
    }
    .table-top {
      width: 100%;
      height: 14.2%;
      /* background-color: green; */
      font-size: 14px;
      font-family: "NotoSansKR-Medium";
      display: flex;
      align-items: center;
      padding-left: 5.5px;
      .location {
        color: #ffffff;
      }
      .worker-text {
        color: #b97012;
      }
      .vehicle-text {
        color: #3987b5;
      }
      .name {
        color: #7c7c7c;
        opacity: 0.4;
      }
    }
    .table-bottom {
      width: 100%;
      height: 85.8%;
      /* background-color: red; */
      padding-top: 4px;
      table,
      th,
      td {
        border: 1px solid #484848;
        border-collapse: collapse;
      }
      table.table {
        width: 100%;
        height: 100%;
        display: block;
        .table-header-row {
          background-color: #2b2b2b;
          /* width: 408px; */
          height: 41px;
          font-size: 13px;
          font-family: "NotoSansKR-Medium";
          &.worker-header {
            color: #b97012;
          }
          &.vehicle-header {
            color: #3987b5;
          }
          td {
            padding-left: 6px;
            &:nth-child(n-1) {
                width: 93px;
            }
            &:last-child{
              width: 136px;
            }
          }
        }
        .table-tbody {
          display: block;
          height: 12.2em;
          overflow: auto;
          &::-webkit-scrollbar{
            width: 4px;
          }
        }
        .table-item {
          height: 34px;
          font-family: "NotoSansKR-Regular";
          font-size: 13px;
          color: #d8d8d8;
          td {
            padding-left: 6px;
            padding-top: 6px;
            padding-bottom: 0px;
            padding-right: 6px;
            &:nth-child(n-1){
              width: 93px;
            }
            &:last-child{
              width: 138px;
            }
            .contents-value {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 74px;
            }
          }
          &:hover {
            background-color: #7c7c7c;
            cursor: pointer;
          }
          &.active {
            background-color: #7c7c7c;
          }
        }
      }
    }
  }
`;

const AccessDetailPanel = ({ bleData, localName }) => {
  const [bleList, setList] = useState({
    list: [],
    worker: [],
    vehicle: [],
  });

  const [selectItem, setItem] = useState({
    type: null, //type:worker/vehicle
    bcIndex: undefined,
    item: undefined,
  });

  useEffect(() => {
    if (bleData) {
      let _workerList = [];
      let _vehicleList = [];
      bleData.map((item) => {
        item.wk_id ? _workerList.push(item) : _vehicleList.push(item);
        return item;
      });
      setList({
        list: bleData,
        worker: _workerList,
        vehicle: _vehicleList,
      });
    }
  }, [bleData]);

  const selectRowHandler = (e, index) => {
    const findItem = bleList.list.find(
      (item) => item.bc_index === index && item
    );
    setItem({
      type: findItem.wk_id ? "worker" : "vehicle",
      bcIndex: index,
      item: findItem,
    });
  };

  const tableRender = (items = []) => {
    const itemsLeng = items.length;
    const tempItems =
      itemsLeng < 5 ? [...items, ...Array(5 - items.length)] : items;

    return tempItems.map((item, index) => (
      <>
        {
          <tr
            className={
              item
                ? selectItem.bcIndex === item.bc_index
                  ? "table-item active"
                  : "table-item"
                : "table-item"
            }
            key={item !== undefined ? item.bc_index : index}
            onClick={item && ((e) => selectRowHandler(e, item.bc_index))}
          >
            {item ? (
              item.wk_id ? (
                <>
                  <td><div className="contents-value">{item && item.wk_co_name}</div></td>
                  <td><div className="contents-value">{item && item.wk_name}</div></td>
                  <td><div className="contents-value">{item && item.wk_position}</div></td>
                  <td>
                    {item && (
                      <Moment format="YYYY-MM-DD HH:mm:ss">
                        {item.bc_input_time}
                      </Moment>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td>{item && item.vh_co_name}</td>
                  <td>{item && item.vh_name}</td>
                  <td>{item && item.vh_number}</td>
                  <td>
                    {item && (
                      <Moment format="YYYY-MM-DD HH:mm:ss">
                        {item.bc_input_time}
                      </Moment>
                    )}
                  </td>
                </>
              )
            ) : (
              <>
                <td><div className="contents-value"></div></td>
                <td><div className="contents-value"></div></td>
                <td><div className="contents-value"></div></td>
                <td></td>
              </>
            )}
          </tr>
        }
      </>
    ));
  };

  return (
    <AccessDetailCompo className="access-detail-panel">
      <div className="left-area">
        <div className="table-box worker-table-box">
          <div className="table-top">
            <span className="location">{localName}</span>&nbsp;&nbsp;
            <span className="worker-text">작업자</span>&nbsp;&nbsp;
            <span className="name">잔류 현황</span>
          </div>
          <div className="table-bottom">
            <table className="table worker-table">
              <thead>
                <tr className="table-header-row worker-header">
                  <td>소속사</td>
                  <td>이름</td>
                  <td>직위</td>
                  <td>진입 일시</td>
                </tr>
              </thead>
              <tbody className="table-tbody">{tableRender(bleList.worker)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="right-area">
        <div className="table-box">
          <div className="table-top">
            <span className="location">{localName}</span>&nbsp;&nbsp;
            <span className="vehicle-text">차량</span>&nbsp;&nbsp;
            <span className="name">잔류 현황</span>
          </div>
          <div className="table-bottom">
            <table className="table vehicle-table">
              <thead>
                <tr className="table-header-row vehicle-header">
                  <td>소속사</td>
                  <td>차량 종류</td>
                  <td>차량 번호</td>
                  <td>진입 일시</td>
                </tr>
              </thead>
              <tbody className="table-tbody">{tableRender(bleList.vehicle)}</tbody>
            </table>
          </div>
        </div>
      </div>
      {selectItem.type &&
        (selectItem.type === "worker" ? (
          <WorkerDetailComponent selectItem={selectItem} />
        ) : (
          <VehicleDetailComponent selectItem={selectItem} />
        ))}
    </AccessDetailCompo>
  );
};

export default AccessDetailPanel;
