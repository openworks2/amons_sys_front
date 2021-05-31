import React, { useState } from "react";

import styled from "styled-components";
import { Button, Icon, Table, Pagination, Modal } from "semantic-ui-react";
import { FaTrash, FaMinusCircle } from "react-icons/fa";

const CompanyTableCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  padding-top: 1px;
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
    &.company {
      width: 200px;
      text-align: left;
    }
    &.sector {
      width: 201px;
    }
    &.description {
      width: 680px;
      @media screen and (max-height: 970px) {
        width: 671px;
      }
    }
    &.trash-icon {
      width: 55px !important ;
      color: #7d7d7d;
    }
    @media screen and (max-height: 970px) {
      &.trash-icon {
        width: 64px !important;
      }
    }
  }

  .table-body {
    margin: 0px !important;
    padding: 0px !important;
    .table-body-box {
      width: 100% !important;
      overflow: auto;
      height: 60.9vh;
      /* overflow-y: scroll; */
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        margin: 0px;
        width: 4px;
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
          padding-left: 15px;
          padding-right: 15px;
          vertical-align: middle;
          &.no {
            width: 52px;
            @media screen and (max-height: 970px) {
              width: 53px;
            }
          }
          &.company {
            width: 201px;
            text-align: left !important;
            @media screen and (max-height: 970px) {
              width: 202px;
            }
          }
          &.sector {
            width: 200px;
            @media screen and (max-height: 970px) {
              width: 202px;
            }
          }
          &.description {
            width: 695px;
            @media screen and (max-height: 970px) {
              width: 678px;
            }
          }
          &.trash-icon {
            color: #7d7d7d;
            width: 55px;
            margin: 0px;
            padding: 0px;
            @media screen and (max-height: 970px) {
              width: 60px;
            }
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

  .ui.table {
    table-layout: fixed;
    word-break: break-all;
  }

  .ui.table td.active,
  .ui.table tr.active {
    background: #f4f4f4 0% 0% no-repeat padding-box !important;
    &:hover {
      background: #f4f4f4 0% 0% no-repeat padding-box !important;
      opacity: 0.8;
    }
  }

  .subtitle {
    font-family: "NotoSansKR-Medium";
    font-size: 16px;
    text-align: left;
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
    margin-top: 5px;
    margin-bottom: 38px;
    @media screen and (max-height: 970px) {
      margin-bottom: 25px;
      margin-top: 0px;
    }
  }
`;

const CompanyTable = ({
  pageInfo,
  data,
  workerData,
  vehicleData,
  activeHandler,
  deleteHandler,
  onPageChange,
  selectedRow,
  initFormData,
  initActiveRow,
}) => {
  // 삭제 모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 테이블
  const { activePage, itemsPerPage } = pageInfo;
  const totalPages = Math.ceil(data.length / itemsPerPage, 1);
  const viewItems = data.slice(
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  const { selectedId, selectedItem, clickedIndex } = selectedRow;

  // 데이터가 null 이나 undefined 이면 오류 발생하므로 빈 배열값 기본값으로 할당
  const tableRender = (items = []) => {
    // 현재 보여지는 테이블에 들어갈 임시 배열 생성

    const tempItems = [...items, ...Array(itemsPerPage - items.length)];
    return tempItems.map((company, index) => {
      const tableNo = index + 1 + (activePage - 1) * itemsPerPage;
      return (
        <Table.Row
          className={company ? "table-row clickable" : "table-row"}
          key={"tableRowKey" + index}
          id={"scroll" + index}
          active={company && index === clickedIndex}
          onClick={company && ((e) => activeHandler(e, index, company.co_id))}
        >
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell no" name="no">
            {company ? tableNo : " "}
          </Table.Cell>
          <Table.Cell className="table-cell company" name="company">
            {company && company.co_name}
          </Table.Cell>
          <Table.Cell className="table-cell sector" name="sector">
            {company && company.co_sectors}
          </Table.Cell>
          <Table.Cell className="table-cell description" name="descrption">
            {company && company.description}
          </Table.Cell>
          <Table.Cell className="table-cell trash-icon">
            {company && selectedId && company.co_id === selectedId && (
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
    <CompanyTableCompo className="company-table-compo">
      <p className="subtitle">소속사 목록</p>
      <Table celled padded selectable unstackable>
        <Table.Header className="table-header">
          <Table.Row className="table-header-row">
            <Table.HeaderCell singleLine className="table-header no">
              NO
            </Table.HeaderCell>
            <Table.HeaderCell singleLine className="table-header company">
              소속사
            </Table.HeaderCell>
            <Table.HeaderCell singleLine className="table-header sector">
              업종
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
          <div className="table-body-box">{tableRender(viewItems)}</div>
        </Table.Cell>
        {/* =============================테이블 푸터(페이지네이션)============================== */}
        <Table.Footer className="table-footer">
          <Table.Row className="table-pagination-row">
            <Table.HeaderCell colSpan="5" className="table-pagination-row">
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
                  prevItem={{ content: <Icon name="angle left" />, icon: true }}
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
        <Modal.Header className="confirm-modal header">
          {selectedItem &&
          ((workerData &&
            workerData.find((el) => el.co_id === selectedItem.co_id)) ||
            (vehicleData &&
              vehicleData.find((el) => el.co_id === selectedItem.co_id)))
            ? "삭제할 수 없습니다"
            : "삭제"}
        </Modal.Header>
        <Modal.Content className="confirm-modal content">
          <Modal.Description className="confirm-modal description">
            <FaMinusCircle className="confirm-modal delete-icon" />
            {selectedItem &&
            ((workerData &&
              workerData.find((el) => el.co_id === selectedItem.co_id)) ||
              (vehicleData &&
                vehicleData.find((el) => el.co_id === selectedItem.co_id))) ? (
              <>
                <p className="confirm-modal text">
                  소속사 : {selectedItem && `${selectedItem.co_name}`}
                </p>
                <p className="confirm-modal text-info">
                  해당 소속사에 할당된 작업자나 차량이 있어 삭제할 수 없습니다.
                </p>
                <p className="confirm-modal text-info">
                  삭제하려면 먼저 할당된 작업자나 차량을 해제해 주십시오.
                </p>
              </>
            ) : (
              <>
                <p className="confirm-modal text">
                  소속사 : {selectedItem && `${selectedItem.co_name}`}
                </p>
                <p className="confirm-modal text">
                  해당 소속사를 삭제하시겠습니까?
                </p>
              </>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className="confirm-modal actions">
          {selectedItem &&
          ((workerData &&
            workerData.find((el) => el.co_id === selectedItem.co_id)) ||
            (vehicleData &&
              vehicleData.find((el) => el.co_id === selectedItem.co_id))) ? (
            <Button
              className="confirm-modal button cancel"
              color="black"
              onClick={() => {
                setDeleteModalOpen(false);
                initFormData();
                initActiveRow();
              }}
            >
              확인
            </Button>
          ) : (
            <>
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
            </>
          )}
        </Modal.Actions>
      </Modal>
    </CompanyTableCompo>
  );
};

export default CompanyTable;
