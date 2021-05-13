import * as cctvsAPI from "../api/cctvs";
import {
  createPromiseThunk,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
  createPromiseThunkOfPost,
  handleAsyncActionsOfPost,
  createPromiseThunkOfPut,
  handleAsyncActionsOfPut,
} from "../lib/asyncUtils";

const GET_CCTVS = "cctv/GET_CCTVS";
const GET_CCTVS_SUCCESS = "cctv/GET_CCTVS_SUCCESS";
const GET_CCTVS_ERROR = "cctv/GET_CCTVS_ERROR";

const GET_CCTV = "cctv/GET_CCTV";
const GET_CCTV_SUCCESS = "cctv/GET_CCTV_SUCCESS";
const GET_CCTV_ERROR = "cctv/GET_CCTV_ERROR";

const POST_CCTV = "cctv/POST_CCTV";
const POST_CCTV_SUCCESS = "cctv/POST_CCTV_SUCCESS";
const POST_CCTV_ERROR = "cctv/POST_CCTV_ERROR";

const PUT_CCTV = "cctv/PUT_CCTV";
const PUT_CCTV_SUCCESS = "cctv/PUT_CCTV_SUCCESS";
const PUT_CCTV_ERROR = "cctv/PUT_CCTV_ERROR";

const DELETE_CCTV = "cctv/DELETE_CCTV";
const DELETE_CCTV_SUCCESS = "cctv/DELETE_CCTV_SUCCESS";
const DELETE_CCTV_ERROR = "cctv/DELETE_CCTV_ERROR";

const CLEAR_CCTV = "cctv/CLEAR_CCTV";

export const getCctvs = createPromiseThunk(GET_CCTVS, cctvsAPI.getCctvs);
export const getCctv = handleAsyncActionsById(GET_CCTV, cctvsAPI.getCctvById);
export const postCctv = createPromiseThunkOfPost(POST_CCTV, cctvsAPI.postCctv);
export const putCctv = createPromiseThunkOfPut(PUT_CCTV, cctvsAPI.putCctv);
export const deleteCctv = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_CCTV });
  try {
    // API 호출
    const payload = await cctvsAPI.deleteCctv(id);
    // 요청 성공
    dispatch({ type: DELETE_CCTV_SUCCESS, payload });
  } catch (e) {
    // 요청 실패
    dispatch({ type: DELETE_CCTV_ERROR, error: e });
  }
};

const initialState = {
  cctvs: reducerUtils.initial(),
  cctv: {},
};

const getCctvsReducer = handleAsyncActions(GET_CCTVS, "cctvs", true);
const getCctvReducer = handleAsyncActionsById(GET_CCTV, "cctv", true);
const postCctvReducer = handleAsyncActionsOfPost(POST_CCTV, "cctvs", true);
const putCctvReducer = handleAsyncActionsOfPut(
  PUT_CCTV,
  "cctvs",
  "cctv_index",
  true
);

export default function cctvs(state = initialState, action) {
  switch (action.type) {
    case GET_CCTVS:
    case GET_CCTVS_SUCCESS:
    case GET_CCTVS_ERROR:
      return getCctvsReducer(state, action);
    case GET_CCTV:
    case GET_CCTV_SUCCESS:
    case GET_CCTV_ERROR:
      return getCctvReducer(state, action);
    case POST_CCTV:
    case POST_CCTV_SUCCESS:
    case POST_CCTV_ERROR:
      return postCctvReducer(state, action);
    case PUT_CCTV:
    case PUT_CCTV_SUCCESS:
    case PUT_CCTV_ERROR:
      return putCctvReducer(state, action);
    case DELETE_CCTV:
      return {
        ...state,
        cctvs: {
          ...state.cctvs,
          loading: true,
          error: null,
        },
      };
    case DELETE_CCTV_SUCCESS:
      const items = state.cctvs.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.cctv_id !== _id);
      return {
        ...state,
        cctvs: {
          ...state.cctvs,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_CCTV_ERROR:
      return {
        ...state,
        cctvs: {
          ...state.cctvs,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_CCTV:
      return {
        ...state,
        cctv: {},
      };
    default:
      return state;
  }
}
