import React, { useState } from "react";

import styled from "styled-components";
import {
  Button,
  Icon,
  Table,
  Pagination,
  Modal,
  Dropdown, Input,
} from "semantic-ui-react";
import { FaTrash, FaMinusCircle } from "react-icons/fa";

const TableCompo = styled.div`
  margin-left: 22px;
  margin-right: 22px;
  margin-top: 5px;
  margin-bottom: 18px;
  .ui.table{
    margin-top : 5px;
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
      width: 51px;
    }
    &.address {
      width: 205px ;
      text-align: left;
    }
    &.index {
      width: 81px ;
    }
    &.used-type {
      width: 181.5px ;
    }
    &.battery-remain {
      width: 120px ;
    }
    &.battery-time {
      width: 178px ;
    }
    &.description {
      width: 333.5px;
    }
    &.trash-icon {
      width: 55px !important ;
      color: #7d7d7d;
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
      height: 62.2vh ;
      @media screen and (max-height: 937px) {
      height: 58.2vh ;
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
        height: 48px;
        .table-cell {
          text-align: center;
          padding-top: 0px ;
          padding-bottom: 0px ;
          padding-left: 10px ;
          padding-right: 10px ;
          vertical-align: middle;
          &.no {
            width: 51px;
          }
          &.address {
            width: 204px ;
            text-align: left;
          }
          &.id {
            width: 82px ;
          }
          &.used-type {
            width: 182px ;
          }
          &.battery-remain {
            width: 122px ;
          }
          &.battery-time {
            width: 180px ;
          }
          &.description {
            width: 333px ;
          }
          &.trash-icon {
            width: 55px !important ;
            color: #7d7d7d;
          }
          &.trash-icon-button {
            height: 25px ;
            width: 25px ;
            border: 0px ;
          }
        }
      }
    }
  }
 
  .table-pagination-row {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d8d8d8;
    opacity: 1;
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
    padding: 0px;
  }
`;

const SearchCompo=styled.div`
padding: 0px;
margin-left: 20px;
display : block;
font-family : "NotoSansKR-Regular";
font-size : 13px;

  .ui.input>input {
    display :block;
    width : 310px;
  }
  .search-box{
    height: 40px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 1;
  }
  .dropdown{
    display : block;
    width : 123px;
  }
  .ui.basic.button.dropdown{
    background: #F2F2F2 0% 0% no-repeat padding-box !important;
    opacity: 1;
    font-size : 13px;
  }
  .ui.dropdown>.dropdown.icon:before {
    font-size : 20px;
    position : absolute;
    left : 10px;
    top : -5px !important;
    color: #2E2E2E !important;
    opacity: 0.8;
    }
  .ui.icon.input>i.icon{
    color: #3D3D3D 0% 0% no-repeat padding-box;
    opacity: 0.8;
    font-size : 15px;
  }

`

const BeaconTable = ({
  pageInfo,
  data,
  activeHandler,
  deleteHandler,
  onPageChange,
  selectedRow,
  initFormData,
  initActiveRow,
}) => {

  const options = [
    { key: 'page', text: '사용정보', value: 'page' },
    { key: 'org', text: '인원', value: 'org' },
    { key: 'site', text: '차량', value: 'site' },
  ]

  // 삭제 모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 테이블
  const { activePage, itemsPerPage } = pageInfo;
  console.log("data--->", data);
  const totalPages = Math.ceil(data.length / itemsPerPage, 1);
  const viewItems = data.slice(
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  const { selectedId, selectedItem, clickedIndex } = selectedRow;

  const splitByColon = (str="") =>{
    let length = str.length;
    let point = str.length % 2;
    let splitedStr = "";

    splitedStr = str.substring (0, point);
    while(point < length){
      if (splitedStr != "") splitedStr+= ":";
      splitedStr += str.substring(point, point + 2);
      point += 2;
    }

    return splitedStr;
  }

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
          onClick={item && ((e) => activeHandler(e, index, item.bc_id))}
        >
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell no" name="no">
            {item ? tableNo : " "}
          </Table.Cell>
          <Table.Cell className="table-cell address" name="address">
            {item && item.bc_address &&splitByColon(item.bc_address)}
          </Table.Cell>
          <Table.Cell className="table-cell id" name="id">
            {item && item.bc_id}
          </Table.Cell>
          <Table.Cell className="table-cell used-type" name="used-type">
            {item && item.bc_used_type}
          </Table.Cell>
          <Table.Cell className="table-cell battery-remain" name="battery-remain">
            {item && item.bc_remain}
          </Table.Cell>
          <Table.Cell className="table-cell battery-time" name="battery-time">
            {item && item.bc_time}
          </Table.Cell>
          <Table.Cell className="table-cell description" name="description">
            {item && item.description}
          </Table.Cell>
          <Table.Cell className="table-cell trash-icon">
            {item && selectedId && item.bc_id === selectedId && (
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
      className ="search-box"
    action={
      <Dropdown button basic options={options} defaultValue='page' className="dropdown" position="left"/>
    }
    actionPosition="left"
    icon='search'
    iconPosition='right'
    placeholder='작업자 이름 또는 차량 종류를 검색해 주세요.'
  />
  </SearchCompo>
    <TableCompo className="company-table-compo">
      <p className="subtitle">비콘 목록</p>
      <Table celled padded selectable>
        <Table.Header className="table-header">
          <Table.Row className="table-header-row">
            <Table.HeaderCell singleLine className="table-header no">
              NO
            </Table.HeaderCell>
            <Table.HeaderCell singleLine className="table-header address">
              MAC 주소
            </Table.HeaderCell>
            <Table.HeaderCell singleLine className="table-header index">
              관리번호
            </Table.HeaderCell>
            <Table.HeaderCell singleLine className="table-header used-type">
              사용정보
            </Table.HeaderCell>
            <Table.HeaderCell singleLine className="table-header battery-remain">
              배터리 잔량(%)
            </Table.HeaderCell>
            <Table.HeaderCell singleLine className="table-header battery-time">
              잔량 측정 일시
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
          <div className="resizable-table-body" as={Table}>{tableRender(viewItems)}</div>
        </Table.Cell>
        {/* =============================테이블 푸터(페이지네이션)============================== */}
        {totalPages >= 1 && (
          <Table.Footer className="table-footer">
            <Table.Row className="table-pagination-row">
              <Table.HeaderCell colSpan="12">
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
              {selectedItem && `${selectedItem.bc_address}`} 비콘을 삭제하시겠습니까?
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

export default BeaconTable;
