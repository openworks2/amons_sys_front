import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon, Table, Pagination, Menu } from "semantic-ui-react";
import { FaSearch, FaRegCalendarAlt, FaFileDownload } from "react-icons/fa";
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
  .table-categorie-menu {
    font-family: "NotoSansKR-Regular";
    font-size: 13px;
    font-size: 13px;
    text-align: center;
    width: 110px;
    &.search {
      text-align: left;
      background: #f2f2f2 0% 0% no-repeat padding-box;
      cursor: pointer;
      &.search-icon {
        width: 30px;
        position: absolute;
        background-color: rgba(255, 255, 255, 0) !important;
        left: 70px;
        top: 13px;
        font-size: 15px;
        cursor: pointer;
      }
      &:hover {
        color: #f1592a !important;
      }
    }
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
        &.disabled {
          cursor: default;
        }
      }
      &:hover {
        color: #f1592a !important;
      }
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
    text-align: center;
    padding-left: 10px !important;
    padding-right: 10px !important;
    &.local {
      width: 90px;
    }
    &.name {
      width: 100px;
    }
    &.company {
      width: 110px;
      text-align: left;
    }
    &.age {
      width: 70px;
    }
    &.phone {
      width: 140px;
    }
    &.receive-time {
      width: 180px;
    }
    &.writer {
      width: 100px;
      color: #ce3f3f;
    }
    &.emg-end-time {
      width: 180px;
      color: #ce3f3f;
    }
    &.result {
      width: 218px;
      color: #ce3f3f;
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
          text-align: center;
          padding-top: 0px;
          padding-bottom: 0px;
          padding-left: 10px;
          padding-right: 10px;
          vertical-align: middle;
          &.no {
            width: 52px;
            @media screen and (max-height: 970px) {
              width: 53px;
            }
          }
          &.local {
            width: 90px;
          }
          &.name {
            width: 100px;
          }
          &.company {
            width: 110px;
            text-align: left;
          }
          &.age {
            width: 70px;
          }
          &.phone {
            width: 140px;
          }
          &.receive-time {
            width: 180px;
          }
          &.writer {
            width: 100px;
            color: #ce3f3f;
          }
          &.emg-end-time {
            width: 180px;
            color: #ce3f3f;
          }
          &.result {
            width: 218px;
            color: #ce3f3f;
            @media screen and (max-height: 970px) {
              width: 213px;
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

  .ui.table td.active,
  .ui.table tr.active {
    background: #f4f4f4 0% 0% no-repeat padding-box !important;
    &:hover {
      background: #f4f4f4 0% 0% no-repeat padding-box !important;
      opacity: 0.8;
    }
  }
  .ui.checkbox input:checked ~ label:after {
    background-color: #2e2e2e;
    border-radius: 4px;
    border-color: #929292;
    color: #ffffff;
    font-size: 12px;
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

const AlarmTable = ({
  pageInfo,
  data,
  activeHandler,
  onPageChange,
  selectedRow,
  initFormData,
  initActiveRow,
  initPage,
  localData,
  onSearch,
  downloadHandler,
}) => {
  let { activePage, itemsPerPage } = pageInfo;
  // 검색 기능 table 데이터 처리
  // 검색하고 curreunt page 1 로 이동시켜줘야 함.
  const [categorieValue, setCategorieValue] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  const onClickCategorie = (e, value) => {
    initPage();
    if (selectedRow.selectedId) {
      initActiveRow();
      initFormData();
    }
    const _value = value.value;
    setCategorieValue(_value);
  };

  useEffect(() => {
    const _data = data;
    setCurrentData(_data);
    let tempData = [];
    if (categorieValue === null) {
      setCurrentData(_data);
    } else {
      tempData = _data.filter((item) => item.local_index === categorieValue);
      setCurrentData(tempData);
    }
  }, [data, categorieValue]);

  const today = new Date();

  const calAge = (birth) => {
    let currentYear = today.getFullYear();
    let age = currentYear - birth.substring(0, 4) + 1;
    return age;
  };
  function date_descending(a, b) {
    var dateA = new Date(a["emg_start_time"]).getTime();
    var dateB = new Date(b["emg_start_time"]).getTime();
    return dateA < dateB ? 1 : -1;
  }
  // 테이블

  const totalPages = Math.ceil(currentData.length / itemsPerPage, 1);
  const viewItems = currentData
    .sort(date_descending)
    .slice(
      (activePage - 1) * itemsPerPage,
      (activePage - 1) * itemsPerPage + itemsPerPage
    );

  const { selectedId, selectedItem, clickedIndex } = selectedRow;

  // 데이터가 null 이나 undefined 이면 오류 발생하므로 빈 배열값 기본값으로 할당
  const tableRender = (items = []) => {
    // 현재 보여지는 테이블에 들어갈 임시 배열 생성
    const tempItems = [...items, ...Array(itemsPerPage - items.length)];
    return tempItems.map((item, index) => {
      const tableNo = index + 1 + (activePage - 1) * itemsPerPage;
      return (
        <Table.Row
          className={item ? "table-row clickable" : "table-row"}
          key={index}
          id={"scroll" + index}
          active={item && index === clickedIndex}
          onClick={item && ((e) => activeHandler(e, index, item.emg_seq))}
        >
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell local" name="local">
            {item &&
              item.local_index &&
              localData &&
              localData.find((el) => el.local_index === item.local_index) &&
              (localData.find((el) => el.local_index === item.local_index)
                .local_used === 0
                ? localData.find((el) => el.local_index === item.local_index)
                    .local_name + "(삭제됨)"
                : localData.find((el) => el.local_index === item.local_index)
                    .local_name)}
          </Table.Cell>
          <Table.Cell className="table-cell name" name="name">
            {item && item.wk_name && item.wk_name}
          </Table.Cell>
          <Table.Cell className="table-cell company" name="company">
            {item && item.wk_co_name && item.wk_co_name}
          </Table.Cell>
          <Table.Cell className="table-cell age" name="age">
            {item && item.wk_birth && calAge(item.wk_birth)}
          </Table.Cell>
          <Table.Cell className="table-cell phone" name="phone">
            {item && item.wk_phone && item.wk_phone}
          </Table.Cell>
          <Table.Cell className="table-cell receive-time" name="receive-time">
            {item &&
              item.emg_start_time &&
              moment(item.emg_start_time).format("YYYY-MM-DD HH:mm:ss")}
          </Table.Cell>
          <Table.Cell className="table-cell writer" name="writer">
            {item && item.emg_writer && item.emg_writer}
          </Table.Cell>
          <Table.Cell className="table-cell emg-end-time" name="emg-end-time">
            {item &&
              item.emg_end_time &&
              moment(item.emg_end_time).format("YYYY-MM-DD HH:mm:ss")}
          </Table.Cell>
          <Table.Cell className="table-cell result" name="result">
            {item && item.emg_result && item.emg_result}
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
          onClick={onClickCategorie}
        />
      );
    });
  };

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

  return (
    <>
      <CategorieMenuCompo className="table-categorie-menu-compo">
        <Menu pointing className="table-categorie-menu-box">
          <Menu.Item
            className="table-categorie-menu all"
            name="전체"
            active={categorieValue === null}
            value={null}
            onClick={onClickCategorie}
          />
          {TopMenuRender(localData)}

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
            <Menu.Item
              className="table-categorie-menu search"
              onClick={() => {
                onSearch(categorieValue, startDate, endDate);
              }}
            >
              조회
              <FaSearch className="table-categorie-menu search search-icon" />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu>
            {data && data.length > 0 ? (
              <Menu.Item
                className="table-categorie-menu download"
                onClick={() => {
                  downloadHandler(startDate, endDate);
                }}
              >
                다운로드
                <FaFileDownload className="table-categorie-menu download-icon" />
              </Menu.Item>
            ) : (
              <Menu.Item className="table-categorie-menu download" disabled>
                다운로드
                <FaFileDownload className="table-categorie-menu download-icon disabled" />
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </CategorieMenuCompo>
      <TableCompo className="company-table-compo">
        <p className="subtitle">알람이력 : 작업자의 조회결과</p>
        <Table celled padded selectable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header local">
                노선
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header name">
                이름
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header company">
                소속사
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header age">
                나이
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header phone">
                핸드폰
              </Table.HeaderCell>
              <Table.HeaderCell
                singleLine
                className="table-header receive-time"
              >
                수신일시
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header writer">
                작성자
              </Table.HeaderCell>
              <Table.HeaderCell
                singleLine
                className="table-header emg-end-time"
              >
                조치일시
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header result">
                내용
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

export default AlarmTable;
