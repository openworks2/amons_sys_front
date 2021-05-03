import * as digsAPI from "../api/digs";
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

const GET_DIGS = "dig/GET_DIGS";
const GET_DIGS_SUCCESS = "dig/GET_DIGS_SUCCESS";
const GET_DIGS_ERROR = "dig/GET_DIGS_ERROR";

const GET_DIG = "dig/GET_DIG";
const GET_DIG_SUCCESS = "dig/GET_DIG_SUCCESS";
const GET_DIG_ERROR = "dig/GET_DIG_ERROR";

const POST_DIG = "dig/POST_DIG";
const POST_DIG_SUCCESS = "dig/POST_DIG_SUCCESS";
const POST_DIG_ERROR = "dig/POST_DIG_ERROR";

const PUT_DIG = "dig/PUT_DIG";
const PUT_DIG_SUCCESS = "dig/PUT_DIG_SUCCESS";
const PUT_DIG_ERROR = "dig/PUT_DIG_ERROR";

const DELETE_DIG = "dig/DELETE_DIG";
const DELETE_DIG_SUCCESS = "dig/DELETE_DIG_SUCCESS";
const DELETE_DIG_ERROR = "dig/DELETE_DIG_ERROR";

const CLEAR_ANNOUNCE = "dig/CLEAR_ANNOUNCE";

export const getDigs = createPromiseThunk(GET_DIGS, digsAPI.getDigs);
export const getDig = handleAsyncActionsById(GET_DIG, digsAPI.getDigById);
export const postDig = createPromiseThunkOfPost(POST_DIG, digsAPI.postDig);
export const putDig = createPromiseThunkOfPut(PUT_DIG, digsAPI.putDig);
export const deleteDig = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_DIG });
  try {
    // API 호출
    const payload = await digsAPI.deleteDig(id);
    // 요청 성공
    dispatch({ type: DELETE_DIG_SUCCESS, payload });
  } catch (e) {
    // 요청 실패
    dispatch({ type: DELETE_DIG_ERROR, error: e });
  }
};

const initialState = {
  digs: reducerUtils.initial(),
  dig: {},
};

const getDigsReducer = handleAsyncActions(GET_DIGS, "digs", true);
const getDigReducer = handleAsyncActionsById(GET_DIG, "dig", true);
const postDigReducer = handleAsyncActionsOfPost(POST_DIG, "digs", true);
const putDigReducer = handleAsyncActionsOfPut(PUT_DIG, "digs", "dig_seq", true);

export default function digs(state = initialState, action) {
  switch (action.type) {
    case GET_DIGS:
    case GET_DIGS_SUCCESS:
    case GET_DIGS_ERROR:
      return getDigsReducer(state, action);
    case GET_DIG:
    case GET_DIG_SUCCESS:
    case GET_DIG_ERROR:
      return getDigReducer(state, action);
    case POST_DIG:
    case POST_DIG_SUCCESS:
    case POST_DIG_ERROR:
      return postDigReducer(state, action);
    case PUT_DIG:
    case PUT_DIG_SUCCESS:
    case PUT_DIG_ERROR:
      return putDigReducer(state, action);
    case DELETE_DIG:
      return {
        ...state,
        digs: {
          ...state.digs,
          loading: true,
          error: null,
        },
      };
    case DELETE_DIG_SUCCESS:
      const items = state.digs.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.dig_seq !== _id);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log(items);
      console.log(_id);
      console.log(action);
      console.log(action.payload.param);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      return {
        ...state,
        digs: {
          ...state.digs,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_DIG_ERROR:
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      // console.log(items);
      // console.log(_id);
      console.log(action);
      console.log(action.payload.param);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      return {
        ...state,
        digs: {
          ...state.digs,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_ANNOUNCE:
      return {
        ...state,
        dig: {},
      };
    default:
      return state;
  }
}
