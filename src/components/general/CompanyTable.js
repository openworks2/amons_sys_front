import React, { useState } from "react";
import ContentSubTitle from "../ContentSubTitle";
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
  }

  .table-header.no {
  }
  .table-header.company {
    text-align: left;
  }
  .table-header.sector {
  }
  .table-header.description {
  }
  .table-header.trash-icon {
    color: #7d7d7d;
  }

  .table-row {
    font-size: 14px;
    font-family: "NotoSansKR-Regular";
    letter-spacing: 0px;
    color: #7c7c7c;
    opacity: 1;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d8d8d8;
    opacity: 1;
  }
  .table-row.blank {
    height: 47px !important;
  }
  .table-pagination-row {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d8d8d8;
    opacity: 1;
  }

  .pagination-component {
    float: right;
  }

  .table-cell {
    text-align: center !important;
  }
  .table-cell.company {
    text-align: left !important;
  }
  .table-cell.trash-icon {
    padding: 0px !important;
    color: #7d7d7d;
    width: 72px !important;
  }
  .trash-icon-button {
    padding: 0px !important;
    margin: 0px !important;
    height: 30px !important;
    width: 30px !important;
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
`;

const CompanyTable = ({
  table,
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
  const totalPages = Math.ceil(items.length / itemsPerPage, 1);

  const viewItems = items.slice(
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
      <ContentSubTitle subTitle="소속사 목록" />
      <Table celled padded selectable>
        <Table.Header className="table-header">
          <Table.Row className="table-header-row">
            <Table.HeaderCell singleLine className="table-header no" width="1">
              NO
            </Table.HeaderCell>
            <Table.HeaderCell
              singleLine
              className="table-header company"
              width="2"
            >
              소속사
            </Table.HeaderCell>
            <Table.HeaderCell
              singleLine
              className="table-header sector"
              width="2"
            >
              업종
            </Table.HeaderCell>
            <Table.HeaderCell
              singleLine
              className="table-header description"
              width="10"
            >
              비고
            </Table.HeaderCell>
            <Table.HeaderCell
              singleLine
              className="table-header trash-icon"
              width="1"
            >
              <FaTrash />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {/* ===============================테이블 바디===================================== */}
        <Table.Body className="table-body">{tableRender(viewItems)}</Table.Body>
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
