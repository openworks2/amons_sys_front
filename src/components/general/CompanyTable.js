import React, { useEffect, useState } from "react";
import ContentSubTitle from "../ContentSubTitle";
import styled from "styled-components";
import { Icon, Menu, Table } from "semantic-ui-react";
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
  .table-pagenation-row {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d8d8d8;
    opacity: 1;
  }

  .table-cell {
    text-align: center !important;
  }
  .table-cell.company {
    text-align: left !important;
  }

  .ui.table td.active {
    background: #f9fafb 0% 0% no-repeat padding-box !important;
    border: 1px solid #d8d8d8 !important;
    opacity: 1;
  }

  .ui.selectable.table tr.active:hover {
    background: #f9fafb 0% 0% no-repeat padding-box !important;
    border: 1px solid #d8d8d8 !important;
    opacity: 1;
  }
`;

const CompanyTable = ({ clickState, clickedRow, rowClickHandler }) => {
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
          <Table.Row
            className="table-row"
            key={0}
            active={
              clickState === true ? (clickedRow === 0 ? true : false) : false
            }
            onClick={() => {
              rowClickHandler(0);
            }}
            selectable={true}
          >
            <Table.Cell className="table-cell no">1</Table.Cell>
            <Table.Cell className="table-cell company">오픈웍스</Table.Cell>
            <Table.Cell className="table-cell sector">협력사</Table.Cell>
            <Table.Cell className="table-cell description">
              CCTV 업체 입니다
            </Table.Cell>
            <Table.Cell className="table-cell trash-icon">
              {clickState ? 0 === clickedRow ? <FaTrash /> : <></> : <></>}
            </Table.Cell>
          </Table.Row>
          <BlankCellsRows cellCount={5} rowCount={13} />
        </Table.Body>
        {/* =============================테이블 푸터(페이지네이션)============================== */}
        <Table.Footer>
          <Table.Row className="table-pagenation-row">
            <Table.HeaderCell colSpan="5">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </CompanyTableCompo>
  );
};

export default CompanyTable;
