import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Icon, Table, Pagination, Modal } from "semantic-ui-react";
import { FaTrash, FaMinusCircle } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ko";

const TableCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  .ui.table {
    margin-top: 40px;
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
    &.name {
      text-align: left;
      width: 171px;
      @media screen and (max-height: 937px) {
        width: 169px;
      }
    }
    &.length {
      width: 81px;
    }
    &.description {
      width: 569px;
      @media screen and (max-height: 937px) {
        width: 562px;
      }
    }
    &.created-date {
      width: 130px;
    }
    &.modified-date {
      width: 130px;
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
            width: 52px;
            @media screen and (max-height: 937px) {
              width: 53px;
            }
          }
          &.name {
            width: 171px;
            text-align: left;
            @media screen and (max-height: 937px) {
              width: 172px;
            }
          }
          &.length {
            width: 81px;
          }
          &.description {
            width: 567px;
            @media screen and (max-height: 937px) {
              width: 573px;
            }
          }
          &.created-date {
            width: 130px;
            @media screen and (max-height: 937px) {
              width: 131px;
            }
          }
          &.modified-date {
            width: 130px !important;
            @media screen and (max-height: 937px) {
              width: 130px;
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

  .subtitle {
    font-family: "NotoSansKR-Medium";
    font-size: 16px;
    text-align: left;
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
    margin: 0px;
    margin-top: 36px;
    margin-bottom: 10px;
    padding: 0px;
  }
`;

const LocalTable = ({
  pageInfo,
  filteredData,
  activeHandler,
  deleteHandler,
  onPageChange,
  selectedRow,
  initFormData,
  initActiveRow,
}) => {
  let { activePage, itemsPerPage } = pageInfo;

  // 삭제 모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const addComma = (num) => {
    if (num) {
      let _num = num.toString().replace(/[^0-9]/g, "");
      let regExp = /\B(?=(\d{3})+(?!\d))/g;
      return _num.toString().replace(regExp, ",");
    }
  };
  // 테이블

  const totalPages = Math.ceil(filteredData.length / itemsPerPage, 1);
  const viewItems = filteredData.slice(
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
          className="table-row"
          key={index}
          active={item && index === clickedIndex}
          onClick={item && ((e) => activeHandler(e, index, item.local_id))}
        >
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell no" name="no">
            {item ? tableNo : " "}
          </Table.Cell>
          <Table.Cell className="table-cell name" name="name">
            {item && item.local_name}
          </Table.Cell>
          <Table.Cell className="table-cell length" name="plan_length">
            {item && item.plan_length && addComma(item.plan_length) + "m"}
          </Table.Cell>
          <Table.Cell className="table-cell description" name="description">
            {item && item.local_description}
          </Table.Cell>
          <Table.Cell className="table-cell created-date" name="created_date">
            {item && moment(item.created_date).format("YYYY-MM-DD")}
          </Table.Cell>
          <Table.Cell className="table-cell modified-date" name="modified_date">
            {item &&
              item.modified_date &&
              moment(item.modified_date).format("YYYY-MM-DD")}
          </Table.Cell>
          <Table.Cell className="table-cell trash-icon">
            {item && selectedId && item.local_id === selectedId && (
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
      <TableCompo className="local-table-compo">
        <p className="subtitle">노선 목록</p>
        <Table celled padded selectable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header no">
                NO
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header name">
                노선
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header length">
                계획 연장
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header description">
                비고
              </Table.HeaderCell>
              <Table.HeaderCell
                singleLine
                className="table-header created-date"
              >
                등록일
              </Table.HeaderCell>
              <Table.HeaderCell
                singleLine
                className="table-header modified-date"
              >
                수정일
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
                {selectedItem && `${selectedItem.local_name} `}
                노선을 삭제하시겠습니까?
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
                deleteHandler(e, selectedItem.local_index, selectedItem);
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

export default LocalTable;
