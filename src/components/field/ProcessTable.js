import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Icon,
  Table,
  Pagination,
  Modal,
  Menu,
} from "semantic-ui-react";
import { FaTrash, FaMinusCircle } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ko";

const CategorieMenuCompo = styled.div`
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
    padding-left: 15px !important;
    padding-right: 15px !important;
    &.no {
      width: 52px;
    }
    &.local {
      width: 141px;
      text-align: left;
    }
    &.prev {
      width: 127px;
    }
    &.state {
      width: 127px;
    }
    &.date {
      width: 200px;
    }
    /* &.description {
      width: 486px;
      @media screen and (max-height: 970px) {
        width: 478px;
      }
    } */
    &.description {
      width: 541px;
      @media screen and (max-height: 970px) {
        width: 542px;
      }
    }
    /* &.trash-icon {
      width: 55px !important ;
      color: #7d7d7d;
    }
    &.trash-icon-button {
      height: 25px;
      width: 25px;
      border: 0px;
    }

    @media screen and (max-height: 970px) {
      &.trash-icon {
        width: 64px !important;
      }
    } */
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
        /* &.clickable {
          cursor: pointer;
          &:hover {
            background: #f6f6f6 0% 0% no-repeat padding-box !important;
          }
        } */
        .table-cell {
          text-align: center;
          padding-top: 0px;
          padding-bottom: 0px;
          padding-left: 15px;
          padding-right: 15px;
          vertical-align: middle;
          background: inherit;
          &.no {
            width: 53px;
            @media screen and (max-height: 970px) {
              left: 50px !important;
            }
          }
          &.local {
            width: 141px;
            text-align: left;
          }
          &.prev {
            width: 127px;
            #tri-angle {
              position: absolute;
              left: 321px;
              @media screen and (max-height: 970px) {
                left: 321px;
              }
              margin-top: -9px;
              width: 17px;
              height: 17px;
              background-color: inherit;
              transform: translateX(-50%) translateY(-50%) rotate(45deg);
              border: none;
              border-top: 1px solid #d8d8d8;
              border-right: 1px solid #d8d8d8;
            }
          }
          &.state {
            width: 127px;
          }
          &.date {
            width: 200px;
          }
          &.description {
            width: 541px;
            @media screen and (max-height: 970px) {
              width: 539px;
            }
          }
          /* &.trash-icon {
            width: 55px !important ;
            color: #7d7d7d;
          }
          &.trash-icon-button {
            height: 25px;
            width: 25px;
            border: 0px;
          } */
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

const ProcessTable = ({
  pageInfo,
  data,
  activeHandler,
  // deleteHandler,
  onPageChange,
  selectedRow,
  initFormData,
  initActiveRow,
  initPage,
  localData,
  stateToString,
}) => {
  let { activePage, itemsPerPage } = pageInfo;

  // 삭제 모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 검색 기능 table 데이터 처리
  const [categorieValue, setCategorieValue] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  const onClickCategorie = (e, target) => {
    initPage();
    if (selectedRow.selectedId) {
      initActiveRow();
      initFormData();
    }
    const _target = target.value;
    setCategorieValue(_target);
  };

  useEffect(() => {
    let _data = data;

    let tempData = [];
    if (categorieValue === null) {
      setCurrentData(_data);
    } else {
      tempData = _data.filter((item) => item.local_index === categorieValue);
      setCurrentData(tempData);
    }
  }, [data, categorieValue]);

  // 테이블
  function date_descending(a, b) {
    var dateA = new Date(a["created_date"]).getTime();
    var dateB = new Date(b["created_date"]).getTime();
    return dateA < dateB ? 1 : -1;
  }

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
          // onClick={item && ((e) => activeHandler(e, index, item.pcs_seq))}
        >
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell no" name="no">
            {item ? tableNo : " "}
          </Table.Cell>
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
          <Table.Cell className="table-cell prev" name="prev">
            {item && item.prev_pcs_state && stateToString(item.prev_pcs_state)}
            {item && item.prev_pcs_state && <div id="tri-angle" />}
          </Table.Cell>
          <Table.Cell className="table-cell state" name="state">
            {item && item.pcs_state && stateToString(item.pcs_state)}
          </Table.Cell>
          <Table.Cell className="table-cell date" name="date">
            {item &&
              item.created_date &&
              moment(item.created_date).format("YYYY-MM-DD HH:mm:ss")}
          </Table.Cell>
          <Table.Cell className="table-cell description" name="description">
            {item && item.pcs_description && item.pcs_description}
          </Table.Cell>
          {/* <Table.Cell className="table-cell trash-icon">
            {item && selectedId && item.pcs_seq === selectedId && (
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
          </Table.Cell> */}
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

  return (
    <>
      <CategorieMenuCompo className="table-categorie-menu-compo">
        <Menu pointing className="table-categorie-menu-box" compact>
          <Menu.Item
            className="table-categorie-menu all"
            name="전체"
            active={categorieValue === null}
            value={null}
            onClick={onClickCategorie}
          />
          {TopMenuRender(localData)}
        </Menu>
      </CategorieMenuCompo>
      <TableCompo className="company-table-compo">
        <p className="subtitle">공정상태 변경 이력</p>
        <Table celled padded selectable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header no">
                NO
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header local">
                노선
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header prev">
                이전 공정상태
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header state">
                현재 공정상태
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header date">
                등록일시
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header description">
                비고
              </Table.HeaderCell>
              {/* <Table.HeaderCell singleLine className="table-header trash-icon">
                <FaTrash />
              </Table.HeaderCell> */}
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
        {/* =============================모달============================== */}
        {/* <Modal
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
                  `${moment(selectedItem.created_date).format(
                    "YYYY년MM월DD일 HH시 MM분 SS초"
                  )} `}
              </p>
              <p className="confirm-modal text">
                이전 공정상태 (
                {selectedItem &&
                  selectedItem.prev_pcs_state &&
                  selectedItem.prev_pcs_state}
                ) 현재 공정상태 (
                {selectedItem &&
                  selectedItem.pcs_state &&
                  selectedItem.pcs_state}
                )
              </p>
              <p className="confirm-modal text">
                {`공정 상태 변경 이력을 삭제하시겠습니까?`}
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
        </Modal> */}
      </TableCompo>
    </>
  );
};

export default ProcessTable;
