import React from "react";
import { Button } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
import Moment from "react-moment";
import "moment-timezone";

const AlarmModalCompo = styled.div`
  width: 100%;
  height: 93.6%;
  position: absolute;
  /* background-color: rgba(255,0,0,0.7); */
  top: 69px;
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-height: 937px) {
    height: 72rem;
  }

  /* -webkit-animation:blink 1.5s ease-in-out infinite alternate; 
    -moz-animation:blink 1.5s ease-in-out infinite alternate;*/

  .alarm-modal {
    width: 752px;
    height: 537px;
    background-color: #2e2e2e;
    border: 1px solid #646464;
    z-index: 998;
    .header {
      height: 159px;
      display: flex;
      justify-content: center;
      align-items: center;
      .title-box {
        width: 105px;
        height: 110px;
        .warning-icon {
          width: 99px;
          height: 79px;
          background-image: url(../../images/emergancy/warning.png);
          margin-left: 3px;
        }
        .warning-title {
          font-family: "NanumSquareB";
          font-size: 22px;
          color: #f8b62b;
        }
      }
    }
    .body {
      height: 295px;
      width: 100%;
      table.sos-table {
        width: 100%;
        height: 100%;
        /* display: block;
                overflow: auto; */
        border-bottom: 1px solid #7c7c7c;
      }
      table,
      th,
      td {
        border-collapse: collapse;
      }
      thead {
        tr.row {
          border-top: 1px solid #7c7c7c;
        }
      }
      tbody {
        overflow-y: auto;
        overflow-x: hidden;
        float: left;
        width: 750px;
        height: 252px;
        /* border-bottom: 1px solid #7C7C7C; */
      }
      tr.row {
        border-bottom: 1px solid #7c7c7c;
        margin-right: 0px;
        margin-left: 0px;
        height: 42px;
        &.empty {
          border-bottom: 0;
        }
        td,
        th {
          color: #d8d8d8;
          font-family: "NotoSansKR-Regular";
          font-size: 14px;
          border-left: 1px solid #7c7c7c;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .record-time {
          width: 11em;
          justify-content: left;
          padding-left: 2%;
        }
        .location {
          width: 89px;
        }
        .company {
          width: 114px;
          justify-content: left;
          padding-left: 11.5px;
        }
        .name {
          width: 114px;
          justify-content: left;
          padding-left: 10.5px;
        }
        .age {
          width: 58px;
        }
        .blood {
          width: 78px;
        }
        .phone {
          width: 129px;
        }
      }
    }
    .footer {
      height: 81px;
      background-color: #434343;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .close-btn {
        width: 324px;
        height: 50px;
        font-size: 18px;
        font-family: "NotoSansKR-Medium";
        font-weight: 100;
      }
    }
  }
`;

const BgModal = styled.div`
  background-color: rgba(255, 0, 0, 0.7);
  z-index: 997;
  position: absolute;
  /* width: 100rem; */
  /* height: 123rem; */
  width: 100%;
  height: 100%;
  z-index: 997;
  @media screen and (max-height: 937px) {
    height: 72rem;
  }
`;

const AlarmModal = ({ setOpenAlarmModal, bleAlarmList }) => {
  const birthCalculator = (birth) => {
    const splitBirth = birth.split("-");
    const Years =
      Number(splitBirth[0]) >= 30 ? splitBirth[0] : "20" + splitBirth[0];
    const Months = splitBirth[1];
    const Days = splitBirth[2];
    const today = new Date();
    const birthDate = new Date(Years, Months, Days); // 2000년 8월 10일

    let age = today.getFullYear() - birthDate.getFullYear() + 1;

    return age;
  };
  const TransBloodType = (bloodType) => {
    switch (bloodType) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "O";
      case 3:
        return "AB";
      default:
        return null;
    }
  };
  const tableRender = (items = []) => {
    return items.map((item) => (
      <>
        {item.wk_id && (
          <tr className="row item" key={item.bc_id}>
            <td className="record-time">
              <Moment format="YYYY-MM-DD HH:mm:ss">
                {item.bc_receive_time}
              </Moment>
            </td>
            <td className="location">{item.local_name}</td>
            <td className="company">{item.wk_co_name}</td>
            <td className="name">{item.wk_name}</td>
            <td className="age">{`${birthCalculator(item.wk_birth)}세`}</td>
            <td className="blood">{`${TransBloodType(item.wk_blood_type)} ${
              item.wk_blood_group === 0 ? "RH+" : "RH-"
            }`}</td>
            <td className="phone">{item.wk_phone}</td>
          </tr>
        )}
      </>
    ));
  };

  return (
    <AlarmModalCompo className="emergency-component">
      <div className="alarm-modal">
        <div className="header">
          <div className="title-box">
            <div className="warning-icon"></div>
            <div className="warning-title">
              <span>작업자 SOS</span>
            </div>
          </div>
        </div>
        <div className="body">
          <table className="sos-table">
            <thead>
              <tr className="row header-row">
                <th className="record-time">발생일시</th>
                <th className="location">노선</th>
                <th className="company">소속사</th>
                <th className="name">이름</th>
                <th className="age">나이</th>
                <th className="blood">혈액형</th>
                <th className="phone">핸드폰</th>
              </tr>
            </thead>
            <tbody>
              {tableRender(bleAlarmList)}

              {/* <tr className="row">
                                    <td className="record-time">2021-03-30 01:32:00</td>
                                    <td className="location">시점 함양</td>
                                    <td className="company">ㅇㅇ건설</td>
                                    <td className="name">김공사</td>
                                    <td className="age">45</td>
                                    <td className="blood">AB Rh-</td>
                                    <td className="phone">010-1234-9999</td>
                                </tr> */}
            </tbody>
          </table>
        </div>
        <div className="footer">
          <Button
            className="close-btn"
            content="닫기"
            primary
            onClick={setOpenAlarmModal}
          />
        </div>
      </div>
      <BgModal className="backgroud-modal" />
    </AlarmModalCompo>
  );
};

export default AlarmModal;
