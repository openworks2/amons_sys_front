import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AnnounceInput from "../../components/field/AnnounceInput";
import AnnounceTable from "../../components/field/AnnounceTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnnounces,
  postAnnounce,
  putAnnounce,
  deleteAnnounce,
} from "../../modules/announces";

const ContentsCompo = styled.div`
  min-width: 1680px !important;
  min-height: 756px;
  height: 84%;
  padding-left: 280px !important;
  padding-right: 130px;
  position: relative;
`;

const ContentsBodyCompo = styled.div`
  min-width: 1630px !important;
  min-height: 720px !important;
  width: 100%;
  overflow: auto;
  margin: 0px;
  padding: 0px;
  position: relative;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    margin: 0px;
    display: none;
  }

  .input-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 368px;
    height: 82.5vh;
    min-height: 683px;
    padding-top: 22px;
    display: inline-block;
    vertical-align: top;
  }
  .table-box {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c5c9cf;
    width: 1236px;
    height: 82.5vh;
    min-height: 683px;
    margin-left: 20px;
    padding-top: 10px;
    display: inline-block;
    vertical-align: top;
  }
`;

const ErrMsg = styled.div`
  text-align: center;
  color: green;
  vertical-align: middle;
  font-size: 24px;
  margin-top: 40vh;
`;
// ***********************************Logic Area*****************************************

const AnnounceContainer = () => {
  const { data, loading, error } = useSelector(
    (state) => state.announces.announces
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnounces());
  }, []);

  const [formData, setFormData] = useState({
    ann_id: null,
    created_date: null,
    modified_date: null,
    ann_title: "",
    ann_contents: "",
    ann_writer: null,
    ann_preview: 1,
  });

  // form onChange Event
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // 입력값 state 에 저장
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // radioChange event handler
  const onRadioChange = (value) => {
    let _ann_preview = value;
    setFormData({
      ...formData,
      ann_preview: _ann_preview,
    });
  };

  const [selectedRow, setSelectedRow] = useState({
    selectedId: null,
    selectedItem: undefined,
    clickedIndex: null,
  });

  const initActiveRow = () => {
    setSelectedRow({
      selectedId: null,
      selectedItem: undefined,
      clickedIndex: null,
    });
  };
  const initFormData = () => {
    setFormData({
      ...formData,
      ann_id: null,
      created_date: null,
      modified_date: null,
      ann_title: "",
      ann_contents: "",
      ann_writer: null,
      ann_preview: 1,
    });
  };

  // table row 클릭 핸들러
  const activeHandler = (e, index, selectedId) => {
    if (index === selectedRow.clickedIndex) {
      initActiveRow();
      initFormData();
    } else {
      const findItem = data.find((announce) => announce.ann_id === selectedId);

      setSelectedRow({
        selectedId: findItem.ann_id,
        selectedItem: findItem,
        clickedIndex: index,
      });

      setFormData({
        ...formData,
        ann_id: findItem.ann_id,
        created_date: findItem.created_date,
        modified_date: findItem.modified_date,
        ann_title: findItem.ann_title,
        ann_contents: findItem.ann_contents,
        ann_writer: findItem.ann_writer,
        ann_preview: findItem.ann_preview,
      });
    }
  };

  // 페이지 네이션
  const [pageInfo, setPageInfo] = useState({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  const onPageChange = (e, { activePage }) => {
    e.preventDefault();
    let _activePage = Math.ceil(activePage);
    const PreState = pageInfo;
    setPageInfo({
      ...PreState,
      activePage: _activePage,
    });
    // 활성화된 로우 초기화
    initActiveRow();
    initFormData();
  };

  const today = new Date();

  // CREATE
  const createHandler = (e) => {
    e.preventDefault();

    let newAnnounce = {
      ...formData,
    };
    dispatch(postAnnounce(newAnnounce));
    initActiveRow();
    initFormData();
  };

  // UPDATE
  const updateHandler = (e) => {
    e.preventDefault();

    const findItem = selectedRow.selectedItem;

    let newAnnounce = {
      ...formData,
      created_date: findItem.created_date,
      modified_date: today,
    };
    dispatch(putAnnounce(newAnnounce.ann_id, newAnnounce));
  };

  // DELETE
  const deleteHandler = (e, ann_id) => {
    dispatch(deleteAnnounce(ann_id));
    initActiveRow();
    initFormData();
  };

  if (error) {
    return (
      <ErrMsg className="err-msg">
        통신 에러가 발생했습니다. 새로고침 버튼을 눌러보세요.
      </ErrMsg>
    );
  }

  return (
    <ContentsCompo className="contents-compo">
      <ContentsBodyCompo className="contents-body-compo">
        <div className="input-box">
          <AnnounceInput
            className="announce-input-box"
            onChange={onChange}
            formData={formData}
            createHandler={createHandler}
            updateHandler={updateHandler}
            selectedRow={selectedRow}
            initFormData={initFormData}
            initActiveRow={initActiveRow}
            onRadioChange={onRadioChange}
          />
        </div>
        <div className="table-box">
          {data && (
            <AnnounceTable
              className="announce-table-box"
              pageInfo={pageInfo}
              data={data}
              activeHandler={activeHandler}
              deleteHandler={deleteHandler}
              onPageChange={onPageChange}
              selectedRow={selectedRow}
              initFormData={initFormData}
              initActiveRow={initActiveRow}
            />
          )}
        </div>
      </ContentsBodyCompo>
    </ContentsCompo>
  );
};

export default AnnounceContainer;
