import React, { useState } from "react";
import styled from "styled-components";
import {
  Icon,
  Table,
  Pagination,
  Menu,
  Dropdown,
  Input,
  Button,
  Modal,
} from "semantic-ui-react";
import { FaSearch, FaRegCalendarAlt, FaMinusCircle } from "react-icons/fa";
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
    margin-left: -40px;
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

    &.all {
      width: 80px;
    }
    &.company-select {
      background: #f2f2f2 0% 0% no-repeat padding-box;
    }
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
    margin-top: -2px;
    width: 300px;
    height: 40px;
    .search-input {
      margin: 1px;
      height: 40px;
      border: 1px solid #dededf !important;
      &:hover,
      &:focus {
        border-color: #f1592a !important;
      }
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
  .table-categorie-menu {
    font-family: "NotoSansKR-Regular";
    font-size: 13px;
    font-size: 13px;
    text-align: center;
    width: 110px;

    &.download {
      text-align: left;
      cursor: pointer;
      border: 0px 0px 0px 1px solid #d8d8d8;
      color: #d8d8d8;
      .download-icon {
        border: 0px;
        width: 30px;
        position: absolute;
        background-color: rgba(255, 255, 255, 0) !important;
        left: 70px;
        top: 12px;
        font-size: 16px;
        cursor: pointer;
      }
      &:hover {
        color: #f1592a !important;
      }
    }
  }
  .divider,
  .text {
    font-family: "NotoSansKR-Regular" !important;
    font-size: 13px !important;
    vertical-align: middle;
    padding: 1px;
  }
  .table-company-dropdown {
    width: 140px !important;
    background: #f2f2f2 0% 0% no-repeat padding-box;
    font-family: "NotoSansKR-Regular" !important;
    font-size: 13px !important;
    .ui.basic.button {
      border: 0px !important;
      border-radius: 0px;
      box-shadow: none;
      display: flex;
      width: 100%;
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
    text-align: left;
    padding-left: 20px !important;
    padding-right: 20px !important;
    &.local {
      width: 110px;
      text-align: center;
    }
    &.company {
      width: 150px;
    }
    &.name {
      width: 150px;
    }
    &.number {
      width: 140px;
    }
    &.input-time {
      width: 210px;
      padding-left: 40px !important;
    }
    &.out-time {
      width: 90px;
    }
    &.remain-time {
      width: 180px;
      text-align: center;
    }
    &.blank {
      width: 422px;
    }
    &.kickout {
      width: 120px;
      text-align: center;
      color: #ff0000;
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
        width: 4px;
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
        &.clickable {
          cursor: pointer;
          &:hover {
            background: #f6f6f6 0% 0% no-repeat padding-box !important;
          }
        }
        .table-cell {
          text-align: left;
          padding-top: 0px;
          padding-bottom: 0px;
          padding-left: 20px;
          padding-right: 20px;
          vertical-align: middle;
          &.local {
            width: 110px;
            text-align: center;
          }
          &.company {
            width: 150px;
          }
          &.name {
            width: 150px;
          }
          &.number {
            width: 140px;
          }
          &.input-time {
            width: 210px;
            text-align: center;
          }
          &.out-time {
            width: 90px;
            text-align: center;
          }
          &.remain-time {
            width: 180px;
            text-align: center;
          }
          &.blank {
            width: 422px;
          }
          &.kickout {
            width: 120px;
            text-align: center;
            @media screen and (max-height: 970px) {
              width: 110px;
            }
            padding: 0px;
            margin: 0px;
            .kick-button {
              width: 80px;
              height: 29px;
              background: #ff0000 0% 0% no-repeat padding-box !important;
              border-radius: 4px;
              opacity: 1;
              color: #ffffff;
              font-size: 14px;
              font-family: "NotoSansKR-Regular";
              font-weight: normal !important;
              &:hover {
                color: #d8d8d8 !important;
              }
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

const KickOutVehicleTable = ({
  pageInfo,
  currentData,
  localData,
  companyList,
  categorieValue,
  searchValue,
  onPageChange,
  onSelectChange,
  onSearchChange,
  onClickCategorie,
  onSearch,
  kickoutHandler,
}) => {
  let { activePage, itemsPerPage } = pageInfo;

  // 삭제 모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  // 클릭된 버튼의 정보
  const [buttonInfo, setButtonInfo] = useState({});

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

  const getDiffTime = (bigTime, smallTime) => {
    let _bigTime = moment(bigTime);
    let _smallTime = moment(smallTime);
    let day = moment.duration(_bigTime.diff(_smallTime)).days();
    let hour = moment.duration(_bigTime.diff(_smallTime)).hours();
    let minute = moment.duration(_bigTime.diff(_smallTime)).minutes();

    let str = "";

    if (day > 0) {
      str += `${day}일 `;
    }
    if (hour > 0) {
      str += `${hour}시간 `;
    }
    if (minute > 0) {
      str += `${minute}분`;
    }

    return str;
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
          <Table.Cell className="table-cell local" name="local">
            {item &&
              item.local_index &&
              localData.find((el) => el.local_index === item.local_index) &&
              (localData.find((el) => el.local_index === item.local_index)
                .local_used === 0
                ? localData.find((el) => el.local_index === item.local_index)
                    .local_name + "(삭제됨)"
                : localData.find((el) => el.local_index === item.local_index)
                    .local_name)}
          </Table.Cell>
          <Table.Cell className="table-cell company" name="company">
            {item && item.vh_co_name && item.vh_co_name}
          </Table.Cell>
          <Table.Cell className="table-cell name" name="name">
            {item && item.vh_name && item.vh_name}
          </Table.Cell>
          <Table.Cell className="table-cell number" name="number">
            {item && item.vh_number && item.vh_number}
          </Table.Cell>
          <Table.Cell className="table-cell input-time" name="input-time">
            {item &&
              item.bc_input_time &&
              moment(item.bc_input_time).format("YYYY-MM-DD HH:mm:ss")}
          </Table.Cell>
          <Table.Cell className="table-cell out-time" name="out-time">
            {item && "∞"}
          </Table.Cell>
          <Table.Cell className="table-cell remain-time" name="remain-time">
            {item &&
              item.bc_input_time &&
              getDiffTime(today, item.bc_input_time)}
          </Table.Cell>
          <Table.Cell className="table-cell blank" name="blank"></Table.Cell>
          <Table.Cell className="table-cell kickout" name="kickout">
            {item && (
              <Button
                className="kick-button"
                onClick={() => {
                  setButtonInfo({});
                  setButtonInfo({
                    bc_index: item.bc_index,
                    bc_input_time: item.bc_input_time,
                    vh_name: item.vh_name,
                  });
                  setDeleteModalOpen(true);
                }}
              >
                강제퇴출
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  const TopMenuRender = (localData = []) => {
    if (!localData) {
      localData = [];
    }
    let _localData = localData.filter((el) => el.local_used !== 0);
    _localData = _localData.slice(0, 4);
    return _localData.map((item, index) => {
      return (
        <Menu.Item
          className="table-categorie-menu categorie"
          name={item.local_name && item.local_name}
          active={categorieValue === item.local_index}
          value={item.local_index && item.local_index}
          onClick={(e, value) => {
            onClickCategorie(e, value);
            document.getElementById("scroll0").scrollIntoView();
          }}
          key={"topMenu" + item.local_index && item.local_index}
        />
      );
    });
  };

  return (
    <>
      <CategorieMenuCompo className="table-categorie-menu-compo">
        <Menu pointing className="table-categorie-menu-box">
          <Menu.Item
            className="table-categorie-menu all"
            name="전체"
            active={categorieValue === null}
            value={null}
            onClick={(e, value) => {
              onClickCategorie(e, value);
              document.getElementById("scroll0").scrollIntoView();
            }}
          />
          {TopMenuRender(localData)}
          <Menu.Menu className="table-company-dropdown">
            <Dropdown
              button
              basic
              id="co_index"
              name="co_index"
              options={companyList}
              className="dropdown"
              placeholder="소속사 전체"
              name="searchCategorie"
              onChange={(e, value) => onSelectChange(e, value)}
            />
          </Menu.Menu>
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
          <Menu.Menu position="right">
            <div className="search-box">
              <Input
                className="search-input"
                actionPosition="left"
                placeholder="차량종류를 검색해 주세요."
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
        <p className="subtitle">막장 잔류이력 : 차량의 조회 결과</p>
        <Table celled padded selectable unstackable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header local">
                노선
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header company">
                소속사
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header name">
                차량 종류
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header number">
                차량 번호
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header input-time">
                진입일시
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header out-time">
                퇴출일시
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header remain-time">
                막장 체류시간
              </Table.HeaderCell>
              <Table.HeaderCell
                singleLine
                className="table-header blank"
              ></Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header kickout">
                강제퇴출
              </Table.HeaderCell>
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
        <Modal
          className="confirm-modal"
          onClose={() => setDeleteModalOpen(false)}
          onOpen={() => setDeleteModalOpen(true)}
          open={deleteModalOpen}
        >
          <Modal.Header className="confirm-modal header">
            강제 퇴출
          </Modal.Header>
          <Modal.Content className="confirm-modal content">
            <Modal.Description className="confirm-modal description">
              <FaMinusCircle className="confirm-modal delete-icon" />

              <p className="confirm-modal text">
                {buttonInfo && buttonInfo.vh_name && buttonInfo.vh_name} 차량을
                퇴출 시키겠습니까?
              </p>
              <p className="confirm-modal text">
                체류시간 :{" "}
                {buttonInfo &&
                  buttonInfo.bc_input_time &&
                  getDiffTime(today, buttonInfo.bc_input_time)}
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions className="confirm-modal actions">
            <Button
              className="confirm-modal button delete"
              color="red"
              content="삭제"
              labelPosition="right"
              icon="checkmark"
              onClick={(e) => {
                kickoutHandler(buttonInfo.bc_index);
                setButtonInfo({});
                setDeleteModalOpen(false);
              }}
            />
            <Button
              className="confirm-modal button cancel"
              color="black"
              onClick={() => {
                setDeleteModalOpen(false);
              }}
            >
              취소
            </Button>
          </Modal.Actions>
        </Modal>
      </TableCompo>
    </>
  );
};

export default KickOutVehicleTable;
