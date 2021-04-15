import React, { useState } from "react";

import styled from "styled-components";
import {
  Button,
  Icon,
  Menu,
  Table,
  Pagination,
  Header,
  Image,
  Modal,
  Tab,
} from "semantic-ui-react";
import { FaTrash, FaMinusCircle } from "react-icons/fa";

const CompanyTableCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;

  .table-header {
    font-size: 14px;
    font-family: "NotoSansKR-Medium";
    letter-spacing: 0px;
    color: #000000;
    background: #f2f2f2 0% 0% no-repeat padding-box !important;
    opacity: 1;
    text-align: center;
    height: 47px !important;
    padding-left: 20px !important;
    padding-right: 20px !important;

    .no {
      width: 50px !important;
    }
    .company {
      width: 200px !important;
      text-align: left;
    }
    .sector {
      width: 201.5px !important;
    }
    @media screen and (max-height: 937px) {
      .trash-icon {
        width: 204px !important;
      }
    }
    .description {
      width: 700px !important;
    }

    .trash-icon {
      width: 55px !important;
      color: #7d7d7d;
    }
    @media screen and (max-height: 937px) {
      .trash-icon {
        width: 65px !important;
      }
    }
  }

  .table-body {
    padding: 0px !important;
  }
  .table-body-box {
    width: 100% !important;
    position: relative;
    margin: 0px !important;
    padding: 0px !important;
    overflow: auto;
    height: 62.2vh !important;
    /* overflow-y: scroll; */
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      margin: 0px;
    }
  }

  .table-row {
    width: 100% !important;
    font-size: 14px;
    font-family: "NotoSansKR-Regular";
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d8d8d8;
    opacity: 1;
    height: 48px !important;
  }
  .table-cell {
    text-align: center !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
    vertical-align: middle;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
  .no {
    width: 62px !important;
  }
  .company {
    width: 198px !important;
    text-align: left !important;
  }
  .sector {
    width: 198px !important;
  }
  .description {
    width: 700px !important;
  }
  .trash-icon {
    color: #7d7d7d;
    width: 55px !important;
    margin: 0px !important;
    padding: 0px !important;
    margin: 0px !important;
  }
  .trash-icon-button {
    padding: 0px !important;
    margin: 0px !important;
    height: 30px !important;
    width: 30px !important;
    border: 0px !important;
  }

  .table-pagination-row {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d8d8d8;
    opacity: 1;
  }

  .pagination-component {
    float: right;
  }

  .ui.button {
    background: #f9fafb !important;
  }
  .ui.button:hover {
    background: #f9fafb !important;
    border: #f2f2f2 !important;
    color: red !important;
  }

  .ui.table td.active,
  .ui.table tr.active {
    background: #f9fafb !important;
  }
  .ui.table td.active:hover,
  .ui.table tr.active:hover {
    background: #f9fafb !important;
  }
  .ui.table tr:hover {
    background: #f9fafb !important;
  }
  .subtitle {
    font-family: "NotoSansKR-Medium";
    font-size: 16px;
    text-align: left;
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
    margin: 0px;
    padding: 0px;
  }
`;

const CompanyTable = ({
  table,
  data,
  activeHandler,
  deleteHandler,
  onPageChange,
  selectRow,
  initFormData,
  initActiveRow,
}) => {
  // 모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 테이블
  const { items, activePage, itemsPerPage } = table;
  console.log("00.items--->", items);
  const _items = items.length === 0 ? data : items;
  console.log("items--->", items.length);
  console.log("data--->", data);
  const totalPages = Math.ceil(_items.length / itemsPerPage, 1);
  const viewItems = _items.slice(
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  const { id, item, clickedIndex } = selectRow;

  // 데이터가 null 이나 undefined 이면 오류 발생하므로 빈 배열값 기본값으로 할당
  const tableRender = (items = []) => {
    // 현재 보여지는 테이블에 들어갈 임시 배열 생성
    const tempItems = [...items, ...Array(14 - items.length)];
    return tempItems.map((company, index) => {
      const tableNo = index + 1 + (activePage - 1) * itemsPerPage;
      return (
        <Table.Row
          className="table-row"
          key={index}
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
            {company && id && company.co_id === id && (
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
      <p className="subtitle">소속사 등록</p>
      <Table celled padded selectable>
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
        {totalPages >= 1 && (
          <Table.Footer>
            <Table.Row className="table-pagination-row">
              <Table.HeaderCell colSpan="5">
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
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
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
              {item && `${item.co_name}`} 소속사를 삭제하시겠습니까?
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
            onClick={() => {
              deleteHandler();
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
    </CompanyTableCompo>
  );
};

export default CompanyTable;
