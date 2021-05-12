import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Icon, Table, Pagination } from "semantic-ui-react";
import { FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko";
import DatePicker, { registerLocale } from "react-datepicker";
import "../../react-datepicker.css";
import ko from "date-fns/locale/ko";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
registerLocale("ko", ko);
const _ = require("lodash");

const TableCompo = styled.div`
  width: 398px;
  display: inline-block;
  margin: 4px;

  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c5c9cf;
  opacity: 1;
  .ui.table {
    margin-top: 5px;
    table-layout: fixed;
    word-break: break-all;
  }

  .table-title-box {
    margin-left: -1px;
    width: 398px;
    height: 60px;
    background: #7c7c7c 0% 0% no-repeat padding-box;
    font-size: 18px;
    font-family: "NotoSansKR-Medium";
    color: #f2f2f2;
    padding: 20px;
    #table-title-box-title {
      display: inline-block;
      float: left;
    }
    #table-title-box-plan {
      display: inline-block;
      float: right;
    }
  }

  /* date picker customize 시작 */

  .date-area {
    height: 30px;
    width: 330px;
    .date-box {
      border: solid 1px;
      border-radius: 4px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      opacity: 1;
      height: 38px;
      margin-top: 25px;
      margin-left: 10px;
      .cal-icon {
        margin-left: 20px;
        margin-top: 10px;
        color: #2e2e2e;
        display: inline-block;
        font-size: 15px;
        vertical-align: middle;
      }
      .date-picker-box {
        .data-picker-label {
          position: absolute;
          top: 90px;
          margin-left: 250px;
          width: 89px;
          height: 38px;
          background: #f2f2f2 0% 0% no-repeat padding-box;
          border: 1px solid #d8d8d8;
          border-radius: 0px 4px 4px 0px;
          opacity: 1;
          color: #2e2e2e;
          font-size: 13px;
          text-align: left;
          vertical-align: middle;
          padding: 7px;
          font-family: "NotoSansKR-Regular";
          padding-left: 12px;
          cursor: pointer;
          .label-icon {
            position: absolute;
            margin-left: 25px;
            margin-top: 3px;
            text-align: right;
            font-size: 15px;
          }
          &:hover {
            color: #f1592a;
            /* border-color: #f1592a; */
          }
        }
        .date-picker-input {
          padding-left: 17px;
          width: 213px !important;
          margin-top: 5px;
          border: 0px;
          height: 25px;
          color: black;
        }
        /* vertical-align: middle; */
        display: inline-block;
      }
    }
  }
  .react-datepicker__triangle {
    display: none;
  }
  .date-picker-custom-input {
    position: absolute;
    margin-left: 10px;
    padding: 8px;
    text-align: center;
    width: 100px;
    color: #2e2e2e;
    cursor: pointer;
    &:hover {
      color: #f1592a;
    }
    &.start {
      top: -17px;
      left: 0px;
    }
    &.end {
      margin-top: -16px;
      left: 120px;
    }
  }
  .custom-triangle {
    position: absolute;
    top: 15px;
    margin-left: 83px;
    width: 0px;
    height: 0px;
    border-top: 6px solid #585858;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    &:hover {
      border-top: 6px solid #f1592a;
    }
  }
  .cal-subtitle {
    font-family: "NotoSansKR-Medium";
    font-size: 16px;
    color: #f1592a;
    padding: 0px;
    margin: -5px;
  }
  .border-line {
    height: 0px;
    border: 1px solid black;
    width: 160px;
    margin-top: 8px;
    margin-left: auto;
    margin-right: auto;
  }
  .split {
    position: absolute;
    margin-top: -23px;
    margin-left: 170px;
    text-align: center;
  }
  .cal-wrapper {
    margin-top: -20px;
    padding: 0px;
  }

  .saturday {
    color: #305a70;
  }
  .sunday {
    color: #ce3f3f;
  }
  .react-datepicker {
    margin: 20px;
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
    .react-datepicker__day-names {
      font-family: "NotoSansKR-Medium";
      font-size: 15px;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
      border-color: #f1592a !important;
      background-color: #f1592a !important;
      color: #ffffff;
    }
    .react-datepicker__day--disabled {
      color: #ccc !important;
    }
  }
  .increase-button,
  .decrease-button {
    font-family: "NotoSansKR-Medium";
    font-size: 20px;
    vertical-align: middle;
    text-align: center;
    padding: 5px;
    padding-top: 0px;
    margin: 5px;
    border-radius: 200px;
    height: 23px;
    border: solid 1px rgba(34, 36, 38, 0.35);
    display: inline-block;
    font-weight: bolder;
    cursor: pointer;
    &:hover {
      color: #f1592a !important;
      background-color: #ffffff;
    }
  }
  .ui.form select {
    font-family: "NotoSansKR-Medium";
    font-size: 14px;
    padding: 5px;
    width: 66px;
    &:focus,
    &:hover {
      border-color: #f1592a;
    }
  }
  /* date picker customize 종료 */

  .ui.table {
    margin: 10px;
    table-layout: fixed;
    word-break: break-all;
    width: 378px !important;
  }

  .table-header {
    font-size: 14px;
    font-family: "NotoSansKR-Medium";
    letter-spacing: 0px;
    color: #000000;
    background: #f2f2f2 0% 0% no-repeat padding-box !important;
    opacity: 1;
    text-align: center;
    padding-left: 15px !important;
    padding-right: 15px !important;
    &.no {
      width: 52px;
    }
    &.date {
      width: 110px;
    }
    &.amount {
      width: 117px;
    }
    &.percent {
      width: 97px;
    }
  }

  .table-body {
    margin: 0px !important;
    padding: 0px !important;
    .resizable-table-body {
      overflow: auto;
      height: 52.2vh;
      @media screen and (max-height: 970px) {
        height: 50.2vh;
      }
      /* overflow-y: scroll; */
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        margin: 0px;
      }

      .table-row {
        font-size: 14px;
        font-family: "NotoSansKR-Regular";
        letter-spacing: 0px;
        color: #7c7c7c;
        background: #ffffff 0% 0% no-repeat padding-box;
        border: 1px solid #d8d8d8;
        opacity: 1;
        height: 47px;
        .table-cell {
          text-align: center;
          padding-top: 0px;
          padding-bottom: 0px;
          padding-left: 15px;
          padding-right: 15px;
          vertical-align: middle;
          &.no {
            width: 53px;
            @media screen and (max-height: 970px) {
              width: 54px;
            }
          }
          &.date {
            width: 110px;
            @media screen and (max-height: 970px) {
              width: 115px;
            }
          }
          &.amount {
            width: 117px;
            color: #ce3f3f;
            @media screen and (max-height: 970px) {
              width: 122px;
            }
          }
          &.percent {
            width: 97px;
            color: #ce3f3f;
            @media screen and (max-height: 970px) {
              width: 89px;
            }
          }
        }
      }
    }
  }

  .table-pagination-row {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d8d8d8;
    opacity: 1;
    padding: 8px !important;
    height: 47px !important;
    .pagination-component {
      margin: auto !important;
      text-align: center;
    }
  }

  .ui.button {
    background: #f9fafb !important;
    margin: 0px !important;
    padding: 0px !important;
    &:hover {
      background: #f9fafb !important;
      border: #f2f2f2 !important;
      color: red !important;
    }
  }

  .ui.table td.active,
  .ui.table tr.active {
    background: #f9fafb !important;
    &:hover {
      background: #f9fafb !important;
    }
  }
  .subtitle {
    font-family: "NotoSansKR-Medium";
    font-size: 14px;
    text-align: left;
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
    margin: 0px;
    margin-left: 10px;
    margin-top: 56px;
    margin-bottom: 8px;
    padding: 0px;
  }
`;

const LogDigTable = ({
  pageInfo,
  data,
  onPageChange,
  initPage,
  localData,
  addComma,
  addZero,
  getDigAmountPercent,
}) => {
  let { activePage, itemsPerPage } = pageInfo;

  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (!data) {
      setCurrentData([]);
    } else {
      setCurrentData(data);
    }
  }, [data]);

  const years = _.range(2020, getYear(new Date()) + 3, 1); // 수정
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const today = new Date();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  const StartDateInput = ({ value, onClick }) => (
    <>
      <div
        className="date-picker-custom-input start"
        onClick={() => {
          onClick();
        }}
      >
        {moment(startDate).format("YYYY-MM-DD")}
        <div className="custom-triangle start" />
      </div>
    </>
  );
  const EndDateInput = ({ value, onClick }) => (
    <>
      <div
        className="date-picker-custom-input end"
        onClick={() => {
          onClick();
        }}
      >
        {moment(endDate).format("YYYY-MM-DD")}
        <div className="custom-triangle end" />
      </div>
    </>
  );

  const searchByDate = async () => {
    const searchCondition = {
      local_index: localData ? localData.local_index : null,
      from_date: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        0,
        0,
        0
      ).toISOString(),
      to_date: new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        23,
        59,
        59
      ).toISOString(),
    };
    let searchData = [];
    try {
      const response = await axios.post(
        `/api/dig/digs/search`,
        searchCondition
      );
      searchData = response.data;
      console.log("searchData response !!!");
      console.log(response);
      console.log("searchData response!!!");
    } catch (e) {
      console.log("굴진 기간 조회 서버 통신 에러");
    }
    if (!searchData) {
      searchData = [];
    }
    console.log("searchData !!!");
    console.log(searchData);
    console.log("searchCondition");
    console.log(searchCondition);
    console.log(searchData);
    console.log("searchData !!!");

    setCurrentData(searchData);
  };

  // 요일 반환
  const getDayName = (date) => {
    return date.toLocaleDateString("ko-KR", { weekday: "long" }).substr(0, 1);
  };
  // 날짜 비교시 년 월 일까지만 비교하게끔
  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  // 테이블
  function date_descending(a, b) {
    var dateA = new Date(a["record_date"]).getTime();
    var dateB = new Date(b["record_date"]).getTime();
    return dateA < dateB ? 1 : -1;
  }

  const totalPages = Math.ceil(currentData.length / itemsPerPage, 1);
  const viewItems = currentData
    .sort(date_descending)
    .slice(
      (activePage - 1) * itemsPerPage,
      (activePage - 1) * itemsPerPage + itemsPerPage
    );

  // 데이터가 null 이나 undefined 이면 오류 발생하므로 빈 배열값 기본값으로 할당
  const tableRender = (items = []) => {
    // 현재 보여지는 테이블에 들어갈 임시 배열 생성
    const tempItems = [...items, ...Array(itemsPerPage - items.length)];
    return tempItems.map((item, index) => {
      const tableNo = index + 1 + (activePage - 1) * itemsPerPage;
      return (
        <Table.Row className="table-row" key={index}>
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell no" name="no">
            {item ? tableNo : " "}
          </Table.Cell>
          <Table.Cell className="table-cell date" name="date">
            {item &&
              item.record_date &&
              moment(item.record_date).format("YYYY-MM-DD")}
          </Table.Cell>
          <Table.Cell className="table-cell amount" name="amount">
            {item && item.dig_length && addComma(item.dig_length) + "m"}
          </Table.Cell>
          <Table.Cell className="table-cell percent" name="percent">
            {item &&
              item.dig_length &&
              localData &&
              getDigAmountPercent(localData.plan_length, item.dig_length)}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <>
      <TableCompo className="table-compo">
        <div className="table-title-box">
          <div id="table-title-box-title">
            {localData && localData.local_name}
          </div>
          <div id="table-title-box-plan">
            {localData && "L=" + addComma(localData.plan_length) + "m"}
          </div>
        </div>
        <div className="date-area">
          <div className="date-box">
            <FaRegCalendarAlt className="cal-icon" />
            <div className="date-picker-box">
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <>
                    <p className="cal-subtitle">시작일을 선택하세요.</p>
                    {/* <div className="border-line" /> */}
                    <div
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="decrease-button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {"<"}
                      </div>

                      <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div
                        className="increase-button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {">"}
                      </div>
                    </div>
                  </>
                )}
                className="date-picker-input start"
                locale={ko}
                name="day_start"
                useWeekdaysShort
                selected={startDate}
                onChange={(date) => onChangeStartDate(date)}
                maxDate={endDate}
                startDate={startDate}
                customInput={<StartDateInput />}
                dayClassName={(date) =>
                  getDayName(createDate(date)) === "토"
                    ? "saturday"
                    : getDayName(createDate(date)) === "일"
                    ? "sunday"
                    : undefined
                }
              ></DatePicker>
              <div className="cal-wrapper">
                <DatePicker
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <>
                      <p className="cal-subtitle">종료일을 선택하세요.</p>
                      {/* <div className="border-line" /> */}
                      <div
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="decrease-button"
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                        >
                          {"<"}
                        </div>

                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <div
                          className="increase-button"
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          {">"}
                        </div>
                      </div>
                    </>
                  )}
                  className="date-picker-input end"
                  locale={ko}
                  name="day_end"
                  useWeekdaysShort
                  onChange={(date) => onChangeEndDate(date)}
                  minDate={startDate}
                  selected={endDate}
                  endDate={endDate}
                  customInput={<EndDateInput />}
                  dayClassName={(date) =>
                    getDayName(createDate(date)) === "토"
                      ? "saturday"
                      : getDayName(createDate(date)) === "일"
                      ? "sunday"
                      : undefined
                  }
                ></DatePicker>
              </div>
              <div className="data-picker-label" onClick={searchByDate}>
                조회
                <FaSearch className="label-icon" />
              </div>
            </div>
          </div>
        </div>
        <span className="split"> ~ </span>
        <p className="subtitle">굴진량 입력 이력</p>
        <Table celled padded selectable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header no">
                NO
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header date">
                입력일
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header amount">
                누적 굴진량
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header percent">
                누적 굴진율
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {/* ===============================테이블 바디===================================== */}
          <Table.Cell className="table-body" colSpan="12">
            <div className="resizable-table-body">{tableRender(viewItems)}</div>
          </Table.Cell>
          {/* =============================테이블 푸터(페이지네이션)============================== */}
          <Table.Footer className="table-footer">
            <Table.Row className="table-pagination-row">
              <Table.HeaderCell
                colSpan="12"
                className="table-pagination-row"
                textAlign="center"
              >
                {totalPages > 1 && (
                  <Pagination
                    activePage={activePage ? activePage : 0}
                    totalPages={totalPages}
                    siblingRange={1}
                    onPageChange={onPageChange}
                    firstItem={
                      // 페이지 수가 5개 이상일 때 >> << 맨 앞 맨 뒤 페이지 호출
                      totalPages <= 5 || {
                        "aria-label": "First item",
                        content: <Icon name="angle double left" />,
                        icon: true,
                      }
                    }
                    lastItem={
                      totalPages <= 5 || {
                        "aria-label": "Last item",
                        content: <Icon name="angle double right" />,
                        icon: true,
                      }
                    }
                    prevItem={{
                      content: <Icon name="angle left" />,
                      icon: true,
                    }}
                    nextItem={{
                      content: <Icon name="angle right" />,
                      icon: true,
                    }}
                    active={1 === activePage}
                    className="pagination-component"
                  />
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </TableCompo>
    </>
  );
};

export default LogDigTable;
