import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Icon,
  Table,
  Pagination,
  Modal,
  Menu,
  Input,
} from "semantic-ui-react";
import { FaTrash, FaMinusCircle, FaSearch } from "react-icons/fa";
import { getCctvs } from "../../modules/cctvs";
import { useDispatch } from "react-redux";

const CategorieMenuCompo = styled.div`
  .ui.pointing.table-categorie-menu-box.menu {
    margin-left: 18px !important;
    margin-right: 18px !important;
    margin-top: 8px !important;
    margin-bottom: 0px !important;
    height: 40px;
    text-align: center !important;
  }
  .ui.input > input {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
  }
  .table-categorie-menu {
    font-family: "NotoSansKR-Regular";
    font-size: 13px;
    width: 123px;

    &.all {
      width: 80px;
    }
    &.search {
      display: flex !important;
      width: 234px;
      margin: 0px !important;
      padding: 0px !important;
      font-family: "NotoSansKR-Regular";
      .search-box {
        margin-top: 0px;
        margin-bottom: 0px;
        height: 40px;
        padding-left: 1px;
      }
      &.search-icon {
        width: 30px;
        position: absolute;
        left: 200px;
        top: 13px;
        font-size: 15px;
        cursor: pointer;
        &:hover {
          color: #f1592a;
        }
      }
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
    padding-left: 10px !important;
    padding-right: 10px !important;
    &.no {
      width: 52px;
    }
    &.local {
      width: 101px;
    }
    &.pos-x {
      width: 101px;
    }
    &.tab-order-num {
      width: 70px;
    }
    &.name {
      width: 117px;
    }
    &.ip {
      width: 203px;
      text-align: left;
      @media screen and (max-height: 970px) {
        width: 193px;
      }
    }
    &.port {
      width: 61px;
    }
    &.cctv-user-id {
      width: 86px;
    }
    &.cctv-pw {
      width: 160px;
    }
    &.description {
      width: 182px;
      @media screen and (max-height: 970px) {
        width: 183px;
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

    @media screen and (max-height: 970px) {
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
      @media screen and (max-height: 970px) {
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
            @media screen and (max-height: 970px) {
              width: 53px;
            }
          }
          &.local {
            width: 101px;
            @media screen and (max-height: 970px) {
              width: 102px;
            }
          }
          &.pos-x {
            width: 101px;
            @media screen and (max-height: 970px) {
              width: 101px;
            }
          }
          &.tab-order-num {
            width: 70px;
          }
          &.name {
            width: 117px;
          }
          &.ip {
            width: 203px;
            text-align: left;
            @media screen and (max-height: 970px) {
              width: 193px;
            }
          }
          &.port {
            width: 61px;
          }
          &.cctv-user-id {
            width: 86px;
          }
          &.cctv-pw {
            width: 160px;
          }
          &.description {
            width: 182px;
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
    margin-top: 18px;
    margin-bottom: 10px;
    padding: 0px;
  }
`;

const CctvTable = ({
  pageInfo,
  data,
  activeHandler,
  deleteHandler,
  onPageChange,
  selectedRow,
  initFormData,
  initActiveRow,
  initPage,
  localData,
  addComma,
  addZero,
}) => {
  let { activePage, itemsPerPage } = pageInfo;

  // 삭제 모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 검색 기능 table 데이터 처리
  // 검색하고 curreunt page 1 로 이동시켜줘야 함.
  const [categorieValue, setCategorieValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
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
      dispatch(getCctvs());
    }
    if (categorieValue === null) {
      // 전체검색
      let _searchValue = searchValue;
      tempData = _data.filter((item) => item.cctv_name.includes(_searchValue));

      setCurrentData(tempData);
    } else {
      // 검색
      tempData = _data.filter((item) => item.local_index === categorieValue);
      let _searchValue = searchValue;
      tempData = _data.filter((item) => item.cctv_name.includes(_searchValue));

      setCurrentData(tempData);
    }
    if (selectedRow.selectedId) {
      initActiveRow();
      initFormData();
    }
    initPage();
  };

  // 테이블

  const totalPages = Math.ceil(currentData.length / itemsPerPage, 1);
  const viewItems = currentData.slice(
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
          id={"scroll" + index}
          active={item && index === clickedIndex}
          onClick={item && ((e) => activeHandler(e, index, item.cctv_id))}
        >
          {/* 값이 있는지 없는지 판단해서 truthy 할 때 값 뿌리기. */}
          <Table.Cell className="table-cell no" name="no">
            {item ? tableNo : " "}
          </Table.Cell>
          <Table.Cell className="table-cell local" name="local">
            {item &&
              item.local_index &&
              localData.find((el) => el.local_index === item.local_index) &&
              (localData.find((el) => el.local_index === item.local_index)
                .local_used === 0
                ? localData.find((el) => el.local_index === item.local_index)
                    .local_name + "(삭제됨)"
                : localData.find((el) => el.local_index === item.local_index)
                    .local_name)}
          </Table.Cell>
          <Table.Cell className="table-cell pos-x" name="pos-x">
            {item && addComma(addZero(item.cctv_pos_x, 3))}
          </Table.Cell>
          <Table.Cell className="table-cell tab-order-num" name="tab-order-num">
            {item && "1"}
          </Table.Cell>
          <Table.Cell className="table-cell name" name="name">
            {item && item.cctv_name && item.cctv_name}
          </Table.Cell>
          <Table.Cell className="table-cell ip" name="ip">
            {item && item.cctv_ip && item.cctv_ip}
          </Table.Cell>
          <Table.Cell className="table-cell port" name="port">
            {item && item.cctv_port && item.cctv_port}
          </Table.Cell>
          <Table.Cell className="table-cell cctv-user-id" name="cctv-user-id">
            {item && item.cctv_user_id && item.cctv_user_id}
          </Table.Cell>
          <Table.Cell className="table-cell cctv-pw" name="cctv-pw">
            {item && item.cctv_pw && item.cctv_pw}
          </Table.Cell>
          <Table.Cell className="table-cell description" name="description">
            {item && item.description}
          </Table.Cell>
          <Table.Cell className="table-cell trash-icon">
            {item && selectedId && item.cctv_id === selectedId && (
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
        <Menu pointing className="table-categorie-menu-box">
          <Menu.Item
            className="table-categorie-menu all"
            name="전체"
            active={categorieValue === null}
            value={null}
            onClick={onClickCategorie}
          />
          {TopMenuRender(localData)}
          <Menu.Menu position="right">
            <Menu.Item className="table-categorie-menu search">
              <Input
                className="search-box"
                actionPosition="left"
                placeholder="CCTV 이름을 검색해 주세요."
                value={searchValue && searchValue}
                onChange={onSearchChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSearch();
                  }
                }}
                icon={
                  <FaSearch
                    onClick={onSearch}
                    className="table-categorie-menu search search-icon"
                  />
                }
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </CategorieMenuCompo>
      <TableCompo className="company-table-compo">
        <p className="subtitle">CCTV 목록</p>
        <Table celled padded selectable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header no">
                NO
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header local">
                노선
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header pos-x">
                설치위치(m)
              </Table.HeaderCell>
              <Table.HeaderCell
                singleLine
                className="table-header tab-order-num"
              >
                탭 순서
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header name">
                이름
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header ip">
                IP 주소
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header port">
                PORT
              </Table.HeaderCell>
              <Table.HeaderCell
                singleLine
                className="table-header cctv-user-id"
              >
                아이디
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header cctv-pw">
                비밀번호
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
                {selectedItem && `${selectedItem.cctv_name} `}
                cctv 정보를 삭제하시겠습니까?
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

export default CctvTable;
