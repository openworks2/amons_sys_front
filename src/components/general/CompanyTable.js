import React from "react";
import ContentSubTitle from "../ContentSubTitle";
import styled from "styled-components";
import { Button, Icon, Menu, Table, Pagination } from "semantic-ui-react";
import { FaTrash } from "react-icons/fa";
import BlankCellsRows from "../BlankCellsRows";

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
    height: 44px !important;
    width: 72px !important;
  }
  .ui.button {
    background: #f2f2f2 !important;
  }
  .ui.button:hover {
    background: #f2f2f2 !important;
    border: #f2f2f2 !important;
  }
  .ui.table td.active,
  .ui.table tr.active {
    background: #f9fafb !important;
  }
  .ui.table td.active:hover,
  .ui.table tr.active:hover {
    background: #f9fafb !important;
  }
`;

const CompanyTable = ({
  deleteHandler,
  activeHandler,
  companyData,
  activePage,
  onPageChange,
  selectRow,
}) => {
  const itemsPerPage = 14;
  const totalPages = companyData.length / itemsPerPage;

  const currentData = companyData.slice(
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  console.log("sectRow--->", selectRow);
  const { id, item } = selectRow;

  const blankRowsCount = itemsPerPage - currentData.length;

  const tableRender = () => {
    return currentData.map((company, index) => {
      return (
        <Table.Row
          className="table-row"
          key={index}
          // active={activeItem ? activeItem.no === index : false}
          active={id === index}
          onClick={(e) => activeHandler(e, index, currentData[index])}
        >
          <Table.Cell className="table-cell no" name="no">
            {index + 1}
          </Table.Cell>
          <Table.Cell className="table-cell company" name="company">
            {company.co_index}:{company.co_name}
          </Table.Cell>
          <Table.Cell className="table-cell sector" name="sector">
            {company.co_index}:{company.co_sectors}
          </Table.Cell>
          <Table.Cell className="table-cell description" name="descrption">
            {company.co_index}:{company.description}
          </Table.Cell>
          <Table.Cell className="table-cell trash-icon">
            {/* {activeItem && activeItem.no === index && (
              <Button
                className="trash-icon-button"
                onClick={() => {
                  deleteHandler();
                }}
              >
                <FaTrash />
              </Button>
            )} */}
            {id === index && (
              <Button
                className="trash-icon-button"
                onClick={() => {
                  deleteHandler();
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
        <Table.Body className="table-body">
          {tableRender()}
          <BlankCellsRows cellCount={5} rowCount={blankRowsCount} />
        </Table.Body>
        {/* =============================테이블 푸터(페이지네이션)============================== */}
        {totalPages >= 1 && (
          <Table.Footer>
            <Table.Row className="table-pagination-row">
              <Table.HeaderCell colSpan="5">
                <Pagination
                  activePage={activePage}
                  totalPages={totalPages}
                  siblingRange={1}
                  onPageChange={onPageChange}
                  firstItem={null}
                  lastItem={null}
                  className="pagination-component"
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </CompanyTableCompo>
  );
};

export default CompanyTable;
