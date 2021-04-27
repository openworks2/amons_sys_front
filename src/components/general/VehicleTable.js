import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Icon,
  Table,
  Pagination,
  Modal,
  Checkbox,
  Dropdown,
  Input,
} from "semantic-ui-react";
import { FaTrash, FaMinusCircle, FaSearch } from "react-icons/fa";
import { getVehicles } from "../../modules/vehicles";
import { useDispatch } from "react-redux";

const TableCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;
  .ui.table {
    margin-top: 5px;
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
    &.no {
      width: 52px;
    }
    &.company {
      width: 168px;
      text-align: left;
    }
    &.name {
      width: 158px;
      text-align: left;
    }
    &.number {
      width: 159px;
      text-align: left;
    }
    &.beacon {
      width: 217px;
    }
    &.description {
      width: 395px;
      @media screen and (max-height: 937px) {
        width: 396px;
      }
    }
    &.trash-icon {
      width: 55px !important ;
      color: #7d7d7d;
    }
    &.trash-icon-button {
      height: 25px;
      width: 25px;
      border: 0px;
    }

    @media screen and (max-height: 937px) {
      &.trash-icon {
        width: 64px !important;
      }
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
      @media screen and (max-height: 937px) {
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
          padding-left: 10px;
          padding-right: 10px;
          vertical-align: middle;
          &.no {
            width: 52px;
            @media screen and (max-height: 937px) {
              width: 53px;
            }
          }
          &.company {
            width: 171px;
            text-align: left;
            @media screen and (max-height: 937px) {
              width: 172px;
            }
          }
          &.name {
            width: 157px;
            text-align: left;
            @media screen and (max-height: 937px) {
              width: 158px;
            }
          }
          &.number {
            width: 158px;
            text-align: left;
            @media screen and (max-height: 937px) {
              width: 157px;
            }
          }
          &.beacon {
            width: 217px;
            @media screen and (max-height: 937px) {
              width: 219px;
            }
          }
          &.description {
            width: 400px;
            @media screen and (max-height: 937px) {
              width: 404px;
            }
          }
          &.trash-icon {
            width: 55px !important ;
            color: #7d7d7d;
          }
          &.trash-icon-button {
            height: 25px;
            width: 25px;
            border: 0px;
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
    background: #f9fafb !important;
    &:hover {
      background: #f9fafb !important;
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
    margin-top: 25px;
    margin-bottom: 10px;
    padding: 0px;
  }
`;

const SearchCompo = styled.div`
  padding: 0px;
  margin-left: 20px;
  display: block;
  font-family: "NotoSansKR-Regular";
  font-size: 13px;

  .ui.input > input {
    display: block;
    width: 310px;
  }
  .search-box {
    height: 40px;
    background: #ffffff 0% 0% no-repeat padding-box;
    opacity: 1;
  }
  .search-icon {
    position: absolute;
    left: 405px;
    top: 13px;
    font-size: 15px;
    cursor: pointer;
    &:hover {
      color: #f1592a;
    }
  }
  .dropdown {
    display: block;
    width: 123px;
  }
  .ui.basic.button.dropdown {
    background: #f2f2f2 0% 0% no-repeat padding-box !important;
    opacity: 1;
    font-size: 13px;
  }
  .ui.input > input {
    &:focus {
      border-color: #f1592a !important;
    }
  }
  .ui.dropdown > .dropdown.icon,
  &:before,
  &:after {
    left: 80px;
    font-size: 20px;
    position: absolute;
    color: #2e2e2e !important;
    opacity: 0.8;
  }
`;

const VehicleTable = ({
  pageInfo,
  data,
  activeHandler,
  deleteHandler,
  onPageChange,
  selectedRow,
  initFormData,
  initActiveRow,
  companyData,
  companySearchList,
}) => {
  let { activePage, itemsPerPage } = pageInfo;

  // 삭제 모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 검색 기능 table 데이터 처리
  // 검색하고 curreunt page 1 로 이동시켜줘야 함.
  const [categorieValue, setCategorieValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentData, setCurrentData] = useState([]);

  const onChangeCategorie = (e, value) => {
    const _value = value.value;
    setCategorieValue(_value);
  };

  // serach input 입력
  const onSearchChange = (e) => {
    const _searchValue = e.target.value;
    setSearchValue(_searchValue);
  };

  const dispatch = useDispatch();

  const onSearch = (e) => {
    const _data = data;
    let tempData = [];
    if (!searchValue) {
      dispatch(getVehicles());
    }
    if (categorieValue === null) {
      // 전체검색
      tempData = _data.filter((item) => item.vh_name.includes(searchValue));
      setCurrentData(tempData);
    } else {
      // 검색
      tempData = _data.filter((item) => item.co_index === categorieValue);
      tempData = tempData.filter((item) => item.vh_name.includes(searchValue));
      setCurrentData(tempData);
    }
    initActiveRow();
    initFormData();
    activePage = 1;
  };

  useEffect(() => {
    const _data = data;
    setCurrentData(_data);
    // 카테고리 별 데이터 변경 시
    // let tempData = [];
    // if (categorieValue === null) {
    //   setCurrentData(_data);
    // } else {
    //   tempData = _data.filter((item) => item.co_index === categorieValue);
    //   setCurrentData(tempData);
    // }
  }, [data]);

  // 테이블

  const totalPages = Math.ceil(currentData.length / itemsPerPage, 1);
  const viewItems = currentData.slice(
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  const { selectedId, selectedItem, clickedIndex } = selectedRow;

  const splitByColon = (str = "") => {
    let length = str.length;
    let point = str.length % 2;
    let splitedStr = "";

    splitedStr = str.substring(0, point);
    while (point < length) {
      if (splitedStr !== "") splitedStr += ":";
      splitedStr += str.substring(point, point + 2);
      point += 2;
    }

    return splitedStr;
  };

  // 데이터가 null 이나 undefined 이면 오류 발생하므로 빈 배열값 기본값으로 할당
  const tableRender = (items = []) => {
    // 현재 보여지는 테이블에 들어갈 임시 배열 생성
    const tempItems = [...items, ...Array(itemsPerPage - items.length)];
    return tempItems.map((item, index) => {
      const tableNo = index + 1 + (activePage - 1) * itemsPerPage;
      return (
        <Table.Row
          className="table-row"
          key={index}
          active={item && index === clickedIndex}
          onClick={item && ((e) => activeHandler(e, index, item.vh_id))}
        >
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell no" name="no">
            {item ? tableNo : " "}
          </Table.Cell>
          <Table.Cell className="table-cell company" name="company">
            {item &&
              companyData &&
              companyData.find((el) => el.co_index === item.co_index).co_name}
          </Table.Cell>
          <Table.Cell className="table-cell name" name="name">
            {item && item.vh_name}
          </Table.Cell>
          <Table.Cell className="table-cell number" name="number">
            {item && item.vh_number}
          </Table.Cell>
          <Table.Cell className="table-cell beacon" name="beacon">
            {item && item.bc_address
              ? item.bc_id + " : " + splitByColon(item.bc_address)
              : item && "할당없음"}
          </Table.Cell>
          <Table.Cell className="table-cell description" name="description">
            {item && item.description}
          </Table.Cell>
          <Table.Cell className="table-cell trash-icon">
            {item && selectedId && item.vh_id === selectedId && (
              <Button
                className="trash-icon-button"
                onClick={(e) => {
                  // 상위 테이블 로우에 걸어줬던 버튼 떄문에 이벤트 버블링 생긴다.
                  // 버블링 막고 독립적인 버튼으로 만들어 주기.
                  e.stopPropagation();
                  setDeleteModalOpen(true);
                }}
              >
                <FaTrash />
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <>
      <SearchCompo className="search-compo">
        <Input
          className="search-box"
          action={
            <Dropdown
              button
              basic
              options={companySearchList}
              className="dropdown"
              placeholder="소속사"
              position="left"
              name="searchCategorie"
              onChange={(e, value) => {
                onChangeCategorie(e, value);
              }}
            />
          }
          actionPosition="left"
          placeholder="차량 종류를 검색해 주세요."
          value={searchValue}
          onChange={onSearchChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          icon={<FaSearch onClick={onSearch} className="search-icon" />}
        />
      </SearchCompo>
      <TableCompo className="company-table-compo">
        <p className="subtitle">차량 목록</p>
        <Table celled padded selectable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header no">
                NO
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header company">
                소속사
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header name">
                차량 종류
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header number">
                차량번호
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header beacon">
                비콘 사용 정보
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header description">
                비고
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header trash-icon">
                <FaTrash />
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
        {/* =============================모달============================== */}
        <Modal
          className="confirm-modal"
          onClose={() => setDeleteModalOpen(false)}
          onOpen={() => setDeleteModalOpen(true)}
          open={deleteModalOpen}
        >
          <Modal.Header className="confirm-modal header">삭제</Modal.Header>
          <Modal.Content className="confirm-modal content">
            <Modal.Description className="confirm-modal description">
              <FaMinusCircle className="confirm-modal delete-icon" />
              <p className="confirm-modal text">
                {selectedItem &&
                  `${selectedItem.vh_name} ${selectedItem.vh_number}`}
                차량 정보를 삭제하시겠습니까?
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
                deleteHandler(e, selectedId);
                setDeleteModalOpen(false);
              }}
            />
            <Button
              className="confirm-modal button cancel"
              color="black"
              onClick={() => {
                setDeleteModalOpen(false);
                initFormData();
                initActiveRow();
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

export default VehicleTable;
