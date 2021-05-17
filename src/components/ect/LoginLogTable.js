import React, { useState } from "react";
import styled from "styled-components";
import { Icon, Table, Pagination, Menu, Input } from "semantic-ui-react";
import { FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ko";
import DatePicker, { registerLocale } from "react-datepicker";
import "../../react-datepicker.css";
import ko from "date-fns/locale/ko";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
registerLocale("ko", ko);
const _ = require("lodash");

const CategorieMenuCompo = styled.div`
  font-family: "NotoSansKR-Regular" !important;
  font-size: 13px !important;
  width: 686px;
  /* date picker customize 시작 */
  .cal-icon {
    top: 12px;
    position: absolute;
    color: #2e2e2e;
    display: inline-block;
    font-size: 15px;
    vertical-align: middle;
  }
  .custom-triangle {
    position: absolute;
    top: 5px;
    margin-left: 115px;
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
  .react-datepicker__triangle {
    position: absolute;
    margin-left: 80px !important;
  }
  .react-datepicker__input-time-container {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
  }
  .react-datepicker-time__input input[type="time"] {
    width: 110px;
    height: 30px;
  }
  .saturday {
    color: #305a70;
  }
  .sunday {
    color: #ce3f3f;
  }
  .react-datepicker {
    margin-left: 0px;
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
  .date-picker-custom-input.wrapper {
    padding: 0px;
    margin: 0px;
    width: 160px;
    height: 20px;
    &:hover {
      color: #f1592a;
      border-color: #f1592a;
    }
  }

  .date-picker-custom-input.start {
    margin-left: 28px;
  }
  .table-categorie-menu {
    font-family: "NotoSansKR-Regular";
    font-size: 13px;
    font-size: 13px;
    display: inline-block;
    &.datepicker-start {
      text-align: left;
      width: 175px !important;
    }
    &.datepicker-spliter {
      .border-div {
        position: absolute;
        width: 40px;
        height: 38px;
        top: 0px;
        left: -1px;
        margin: auto;
        text-align: left;
        padding: 13px;
        padding-left: 9px;
        background-color: #ffffff;
      }
      text-align: left;
      width: 10px !important;
      padding: 0px;
      border-color: red 3px !important;
    }
    &.datepicker-end {
      text-align: left;
      width: 160px !important;
    }
  }
  /* date picker customize 종료 */
  .ui.pointing.table-categorie-menu-box.menu {
    margin-left: 18px !important;
    margin-right: 18px !important;
    margin-top: 8px !important;
    margin-bottom: 0px !important;
    height: 40px;
    text-align: center !important;
  }
  .table-categorie-menu {
    font-family: "NotoSansKR-Regular";
    font-size: 13px;
    font-size: 13px;
    width: 123px;
  }
  .ui.menu .item > .input input {
    &:focus {
      border-color: #f1592a !important;
    }
  }
  .ui.menu:not(.vertical) .item {
    display: inline-block;
  }
  .ui.pointing.menu .item:after {
    width: 1.3em;
    height: 1.3em;
  }
  .ui.input > input,
  .ui.input {
    width: 300px;
    border-radius: 0px;
    border-color: #f2f2f2 !important;
    border: 0px solid !important;
  }

  .search-box {
    margin-top: 2px;
    width: 302px;
    height: 35px;
    border-radius: 0px;
    background-color: #f2f2f2;
    &:hover,
    &:focus {
      background-color: #f1592a !important;
    }
  }
  .search-icon {
    position: absolute;
    top: 12px;
    left: 265px;
    color: #3d3d3d;
    cursor: pointer;
    &:hover,
    &:focus {
      color: #f1592a !important;
    }
  }

  .divider,
  .text {
    font-family: "NotoSansKR-Regular" !important;
    font-size: 13px !important;
    vertical-align: middle;
    padding: 1px;
  }

  .ui.dropdown > .dropdown.icon,
  &:before,
  &:after {
    left: 95px;
    font-size: 20px;
    position: absolute;
    color: #2e2e2e !important;
    opacity: 0.8;
  }
  .ui.basic.button:hover,
  .ui.basic.buttons .button:hover,
  .ui.basic.button:focus,
  .ui.basic.buttons .button:focus {
    background: #f2f2f2 0% 0% no-repeat padding-box !important;
  }
  .active.selected.item {
    display: none;
  }
  .item {
    width: 140px !important;
  }
`;

const TableCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-bottom: 18px;
  .ui.table {
    margin-top: 5px;
    table-layout: fixed;
    word-break: break-all;
  }

  .table-header {
    font-size: 14px;
    font-family: "NotoSansKR-Medium";
    letter-spacing: 0px;
    color: #000000;
    background: #f2f2f2 0% 0% no-repeat padding-box !important;
    opacity: 1;
    text-align: center;
    padding-left: 20px !important;
    padding-right: 20px !important;
    &.login-time {
      width: 220px;
    }
    &.ip {
      width: 220px;
    }
    &.user-id {
      width: 140px;
    }
    &.os {
      width: 150px;
    }
    &.browser {
      width: 150px;
    }
    &.screensize {
      width: 150px;
    }
    &.blank {
      width: 542px;
    }
  }

  .table-body {
    margin: 0px !important;
    padding: 0px !important;
    .resizable-table-body {
      width: 100% !important;
      position: relative;
      overflow: auto;
      height: 60.9vh;
      @media screen and (max-height: 970px) {
        height: 58.2vh;
      }
      /* overflow-y: scroll; */
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        margin: 0px;
      }
      .sms-check,
      .ui.checkbox input.hidden + label {
        cursor: default !important;
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
          padding-left: 20px;
          padding-right: 20px;
          vertical-align: middle;
          &.login-time {
            width: 220px;
          }
          &.ip {
            width: 220px;
          }
          &.user-id {
            width: 140px;
          }
          &.os {
            width: 150px;
          }
          &.browser {
            width: 150px;
          }
          &.screensize {
            width: 150px;
          }
          &.blank {
            width: 542px;
            @media screen and (max-height: 970px) {
              width: 531px;
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
    height: 60px !important;
    .pagination-component {
      float: right;
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

  .subtitle {
    font-family: "NotoSansKR-Medium";
    font-size: 16px;
    text-align: left;
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
    margin: 0px;
    margin-top: 18px;
    margin-bottom: 10px;
    padding: 0px;
  }
`;

const LoginLogTable = ({
  pageInfo,
  currentData,
  searchValue,
  onPageChange,
  onSearchChange,
  onSearch,
}) => {
  let { activePage, itemsPerPage } = pageInfo;

  const today = new Date();

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

  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  );
  const [endDate, setEndDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
  );

  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  const onSearchEnter = () => {
    onSearch(startDate, endDate);
  };

  const StartDateInput = ({ value, onClick }) => (
    <div className="date-picker-custom-input wrapper">
      <div
        className="date-picker-custom-input start"
        onClick={() => {
          onClick();
        }}
      >
        {moment(startDate).format("YYYY-MM-DD HH:mm")}
        <div className="custom-triangle start" />
      </div>
    </div>
  );
  const EndDateInput = ({ value, onClick }) => (
    <div className="date-picker-custom-input wrapper">
      <div
        className="date-picker-custom-input end"
        onClick={() => {
          onClick();
        }}
      >
        {moment(endDate).format("YYYY-MM-DD HH:mm")}
        <div className="custom-triangle end" />
      </div>
    </div>
  );

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
  const totalPages = Math.ceil(currentData.length / itemsPerPage, 1);
  const viewItems = currentData.slice(
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
        <Table.Row className="table-row" key={index} id={"scroll" + index}>
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell login-time" name="login-time">
            {item &&
              item.ll_logined_date &&
              moment(item.ll_logined_date).format("YYYY-MM-DD HH:mm:ss")}
          </Table.Cell>
          <Table.Cell className="table-cell ip" name="ip">
            {item && item.ll_ip && item.ll_ip}
          </Table.Cell>
          <Table.Cell className="table-cell user-id" name="user-id">
            {item && item.ll_user_id && item.ll_user_id}
          </Table.Cell>
          <Table.Cell className="table-cell os" name="os">
            {item && item.ll_os && item.ll_os}
          </Table.Cell>
          <Table.Cell className="table-cell browser" name="browser">
            {item && item.ll_browser && item.ll_browser}
          </Table.Cell>
          <Table.Cell className="table-cell screensize" name="screensize">
            {item && item.ll_screen && item.ll_screen}
          </Table.Cell>
          <Table.Cell className="table-cell blank" name="blank"></Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <>
      <CategorieMenuCompo className="table-categorie-menu-compo">
        <Menu pointing className="table-categorie-menu-box">
          <Menu.Menu>
            <Menu.Item className="table-categorie-menu datepicker-start">
              <FaRegCalendarAlt className="cal-icon" />
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
                showTimeInput
                timeInputLabel="시간선택 : "
              ></DatePicker>
            </Menu.Item>
            <Menu.Item className="table-categorie-menu datepicker-spliter">
              <div className="border-div">~</div>
            </Menu.Item>
            <Menu.Item className="table-categorie-menu datepicker-end">
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
                showTimeInput
                timeInputLabel="시간선택 : "
              ></DatePicker>
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu>
            <div className="search-box">
              <Input
                className="search-input"
                actionPosition="left"
                placeholder="IP 주소를 검색해 주세요."
                value={searchValue}
                onChange={onSearchChange}
                onKeyPress={(e, startDate, endDate) => {
                  if (e.key === "Enter") {
                    onSearchEnter();
                  }
                }}
                icon={
                  <FaSearch
                    onClick={() => {
                      onSearch(startDate, endDate);
                    }}
                    className="search-icon"
                  />
                }
              />
            </div>
          </Menu.Menu>
        </Menu>
      </CategorieMenuCompo>
      <TableCompo className="company-table-compo">
        <p className="subtitle">로그인 기록의 조회 결과</p>
        <Table celled padded selectable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header login-time">
                로그인 일시
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header ip">
                접속 IP 주소
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header user-id">
                접속 아이디
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header os">
                OS
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header browser">
                브라우저
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header screensize">
                해상도
              </Table.HeaderCell>
              <Table.HeaderCell
                singleLine
                className="table-header blank"
              ></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {/* ===============================테이블 바디===================================== */}
          <Table.Cell className="table-body" colSpan="12">
            <div className="resizable-table-body" id="move-here">
              {tableRender(viewItems)}
            </div>
          </Table.Cell>
          {/* =============================테이블 푸터(페이지네이션)============================== */}
          <Table.Footer className="table-footer">
            <Table.Row className="table-pagination-row">
              <Table.HeaderCell colSpan="12" className="table-pagination-row">
                {totalPages > 1 && (
                  <Pagination
                    activePage={activePage ? activePage : 0}
                    totalPages={totalPages}
                    siblingRange={1}
                    onPageChange={(e, activePage) => {
                      document.getElementById("scroll0").scrollIntoView();
                      onPageChange(e, activePage);
                    }}
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

export default LoginLogTable;
