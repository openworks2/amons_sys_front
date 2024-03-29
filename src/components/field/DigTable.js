import React, { useCallback, useMemo, useState } from "react";
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
  .ui.input > input {
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
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
      @media screen and (max-height: 970px) {
        width: 51px;
      }
    }
    &.local {
      width: 141px;
      text-align: left;
    }
    &.plan {
      width: 101px;
    }
    &.amount {
      width: 121px;
    }
    &.percent {
      width: 121px;
    }
    &.date {
      width: 111px;
    }
    &.description {
      width: 486px;
      @media screen and (max-height: 970px) {
        width: 478px;
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
        width: 4px;
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
            width: 53px;
            @media screen and (max-height: 970px) {
              width: 52px;
            }
          }
          &.local {
            width: 141px;
            text-align: left;
            @media screen and (max-height: 970px) {
              width: 142px;
            }
          }
          &.plan {
            width: 101px;
          }
          &.amount {
            width: 121px;
            color: #ce3f3f;
          }
          &.percent {
            width: 121px;
            color: #ce3f3f;
          }
          &.date {
            width: 111px;
          }
          &.description {
            width: 486px;
            @media screen and (max-height: 970px) {
              width: 478px;
            }
          }
          &.trash-icon {
            width: 55px;
            color: #7d7d7d;
            @media screen and (max-height: 970px) {
              width: 61px;
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

const DigTable = ({
  pageInfo,
  activeHandler,
  deleteHandler,
  onPageChange,
  selectedRow,
  initFormData,
  initActiveRow,
  localData,
  addComma,
  addZero,
  getDigAmountPercent,
  categorieValue,
  currentData,
  onClickCategorie,
}) => {
  let { activePage, itemsPerPage } = pageInfo;
  const { selectedId, selectedItem, clickedIndex } = selectedRow;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const dateAndLocalDescending = useCallback((a, b) => {
    let dateA = new Date(a["record_date"]).getTime();
    let dateB = new Date(b["record_date"]).getTime();
    let indexA = a["local_index"];
    let indexB = b["local_index"];
    return dateA > dateB ? -1 : indexA > indexB ? 0 : 1;
  }, []);

  // [ Table Info Area ] =======================================================

  const getTotalPages = useCallback(() => {
    try {
      return Math.ceil(currentData.length / itemsPerPage, 1);
    } catch (e) {
      console.log("<getTotalPages Error>", e);
    }
  }, [currentData, itemsPerPage]);

  const cutViewItems = useCallback(() => {
    try {
      return currentData
        .sort(dateAndLocalDescending)
        .slice(
          (activePage - 1) * itemsPerPage,
          (activePage - 1) * itemsPerPage + itemsPerPage
        );
    } catch (e) {
      console.log("<cutViewItems Error>", e);
    }
  }, [activePage, currentData, dateAndLocalDescending, itemsPerPage]);

  const totalPages = getTotalPages();
  const viewItems = cutViewItems();

  // [ Table Cell Area ] =======================================================

  const printLocal = useCallback((item, matchedLocalInfo) => {
    try {
      if (matchedLocalInfo && item && item.local_index) {
        if (matchedLocalInfo.local_used === 1) {
          return matchedLocalInfo.local_name;
        } else {
          return matchedLocalInfo.local_name + `(삭제됨)`;
        }
      }
    } catch (e) {
      console.log("<printLocal Error>", e);
    }
  }, []);

  const printPlanLength = useCallback(
    (item, matchedLocalInfo) => {
      if (
        matchedLocalInfo &&
        matchedLocalInfo.plan_length !== (null || undefined) &&
        item
      ) {
        try {
          return addComma(addZero(matchedLocalInfo.plan_length, 3)) + "m";
        } catch (e) {
          console.log("<printPlanLength Error>", e);
        }
      }
    },
    [addComma, addZero]
  );

  const printAmount = useCallback(
    (item) => {
      if (item && item.dig_length !== (null || undefined)) {
        try {
          return addComma(item.dig_length) + "m";
        } catch (e) {
          console.log("<printAmount Error>", e);
        }
      }
    },
    [addComma]
  );

  const printPercent = useCallback(
    (item, matchedLocalInfo) => {
      if (item && item.dig_length !== (null || undefined) && matchedLocalInfo) {
        try {
          return getDigAmountPercent(
            matchedLocalInfo.plan_length,
            item.dig_length
          );
        } catch (e) {
          console.log("<printAmount Error>", e);
        }
      }
    },
    [getDigAmountPercent]
  );

  const printTrashCan = useCallback(
    (item) => {
      if (
        item &&
        item.dig_seq &&
        item.dig_seq > 4 &&
        selectedId &&
        selectedId === item.dig_seq
      ) {
        try {
          return (
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
          );
        } catch (e) {
          console.log("<printTrashCan Error>", e);
        }
      }
    },
    [selectedId]
  );

  // [ Table Render Area ] =======================================================

  const tableRender = useCallback(
    (items = []) => {
      const tempItems = [...items, ...Array(itemsPerPage - items.length)];
      return tempItems.map((item, index) => {
        let matchedLocalInfo = item
          ? localData.find((el) => el.local_index === item.local_index)
          : null;
        const tableNo = index + 1 + (activePage - 1) * itemsPerPage;
        return (
          <Table.Row
            className={item ? "table-row clickable" : "table-row non-clickable"}
            key={"tableRowKey" + index}
            id={"scroll" + index}
            active={item && index === clickedIndex}
            onClick={item && ((e) => activeHandler(e, index, item.dig_seq))}
          >
            <Table.Cell className="table-cell no" name="no">
              {item ? tableNo : " "}
            </Table.Cell>
            <Table.Cell className="table-cell local" name="local">
              {printLocal(item, matchedLocalInfo)}
            </Table.Cell>
            <Table.Cell className="table-cell plan" name="plan">
              {printPlanLength(item, matchedLocalInfo)}
            </Table.Cell>
            <Table.Cell className="table-cell amount" name="amount">
              {printAmount(item)}
            </Table.Cell>
            <Table.Cell className="table-cell percent" name="percent">
              {printPercent(item, matchedLocalInfo)}
            </Table.Cell>
            <Table.Cell className="table-cell date" name="date">
              {item &&
                item.record_date &&
                moment(item.record_date).format("YYYY-MM-DD")}
            </Table.Cell>
            <Table.Cell className="table-cell description" name="description">
              {item && item.description && item.description}
            </Table.Cell>
            <Table.Cell className="table-cell trash-icon">
              {printTrashCan(item)}
            </Table.Cell>
          </Table.Row>
        );
      });
    },
    [
      activeHandler,
      activePage,
      clickedIndex,
      itemsPerPage,
      localData,
      printAmount,
      printLocal,
      printPercent,
      printPlanLength,
      printTrashCan,
    ]
  );

  const TopMenuRender = useCallback(
    (localData = []) => {
      try {
        let _localData = localData.filter((el) => el.local_used !== 0);
        _localData = _localData.slice(0, 4);
        return _localData.map((item, index) => {
          return (
            <Menu.Item
              className="table-categorie-menu categorie"
              name={item.local_name && item.local_name}
              active={categorieValue === item.local_index}
              value={item.local_index && item.local_index}
              onClick={(e, value) => {
                onClickCategorie(e, value);
                document.getElementById("scroll0").scrollIntoView();
              }}
              key={"topMenu" + item.local_index && item.local_index}
            />
          );
        });
      } catch (e) {
        console.log("<TopMenuRender Error>", e);
      }
    },
    [categorieValue, onClickCategorie]
  );

  return (
    <>
      <CategorieMenuCompo className="table-categorie-menu-compo">
        <Menu pointing className="table-categorie-menu-box" compact>
          <Menu.Item
            className="table-categorie-menu all"
            name="전체"
            active={categorieValue === null}
            value={null}
            onClick={(e, value) => {
              onClickCategorie(e, value);
              document.getElementById("scroll0").scrollIntoView();
            }}
          />
          {TopMenuRender(localData)}
        </Menu>
      </CategorieMenuCompo>
      <TableCompo className="company-table-compo">
        <p className="subtitle">최근 누적 굴진 이력</p>
        <Table celled padded selectable unstackable>
          <Table.Header className="table-header">
            <Table.Row className="table-header-row">
              <Table.HeaderCell singleLine className="table-header no">
                NO
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header local">
                노선
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header plan">
                계획연장
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header amount">
                누적 굴진량
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header percent">
                누적 굴진율
              </Table.HeaderCell>
              <Table.HeaderCell singleLine className="table-header date">
                입력일
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
                {selectedItem &&
                  `${
                    localData.find(
                      (el) => el.local_index === selectedItem.local_index
                    ) &&
                    localData.find(
                      (el) => el.local_index === selectedItem.local_index
                    ).local_name
                  } 노선의 `}
                {moment(selectedItem && selectedItem.record_date).format(
                  "YYYY년 MM월 DD일"
                )}
              </p>
              <p className="confirm-modal text">
                굴진 이력을 삭제하시겠습니까?
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

export default DigTable;
