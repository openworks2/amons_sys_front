import * as localsAPI from "../api/locals";
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

const GET_LOCALS = "local/GET_LOCALS";
const GET_LOCALS_SUCCESS = "local/GET_LOCALS_SUCCESS";
const GET_LOCALS_ERROR = "local/GET_LOCALS_ERROR";

const GET_LOCAL = "local/GET_LOCAL";
const GET_LOCAL_SUCCESS = "local/GET_LOCAL_SUCCESS";
const GET_LOCAL_ERROR = "local/GET_LOCAL_ERROR";

const POST_LOCAL = "local/POST_LOCAL";
const POST_LOCAL_SUCCESS = "local/POST_LOCAL_SUCCESS";
const POST_LOCAL_ERROR = "local/POST_LOCAL_ERROR";

const PUT_LOCAL = "local/PUT_LOCAL";
const PUT_LOCAL_SUCCESS = "local/PUT_LOCAL_SUCCESS";
const PUT_LOCAL_ERROR = "local/PUT_LOCAL_ERROR";

const DELETE_LOCAL = "local/DELETE_LOCAL";
const DELETE_LOCAL_SUCCESS = "local/DELETE_LOCAL_SUCCESS";
const DELETE_LOCAL_ERROR = "local/DELETE_LOCAL_ERROR";

const CLEAR_LOCAL = "local/CLEAR_LOCAL";

export const getLocals = createPromiseThunk(GET_LOCALS, localsAPI.getLocals);
export const getLocal = handleAsyncActionsById(
  GET_LOCAL,
  localsAPI.getLocalById
);
export const postLocal = createPromiseThunkOfPost(
  POST_LOCAL,
  localsAPI.postLocal
);
export const putLocal = createPromiseThunkOfPut(PUT_LOCAL, localsAPI.putLocal);
export const deleteLocal = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_LOCAL });
  try {
    // API 호출
    const payload = await localsAPI.deleteLocal(id);
    // 요청 성공
    dispatch({ type: DELETE_LOCAL_SUCCESS, payload });
  } catch (e) {
    // 요청 실패
    dispatch({ type: DELETE_LOCAL_ERROR, error: e });
  }
};

const initialState = {
  locals: reducerUtils.initial(),
  local: {},
};

const getLocalsReducer = handleAsyncActions(GET_LOCALS, "locals", true);
const getLocalReducer = handleAsyncActionsById(GET_LOCAL, "local", true);
const postLocalReducer = handleAsyncActionsOfPost(POST_LOCAL, "locals", true);
const putLocalReducer = handleAsyncActionsOfPut(
  PUT_LOCAL,
  "locals",
  "local_index",
  true
);

export default function locals(state = initialState, action) {
  switch (action.type) {
    case GET_LOCALS:
    case GET_LOCALS_SUCCESS:
    case GET_LOCALS_ERROR:
      return getLocalsReducer(state, action);
    case GET_LOCAL:
    case GET_LOCAL_SUCCESS:
    case GET_LOCAL_ERROR:
      return getLocalReducer(state, action);
    case POST_LOCAL:
    case POST_LOCAL_SUCCESS:
    case POST_LOCAL_ERROR:
      return postLocalReducer(state, action);
    case PUT_LOCAL:
    case PUT_LOCAL_SUCCESS:
    case PUT_LOCAL_ERROR:
      return putLocalReducer(state, action);
    case DELETE_LOCAL:
      return {
        ...state,
        locals: {
          ...state.locals,
          loading: true,
          error: null,
        },
      };
    case DELETE_LOCAL_SUCCESS:
      const items = state.locals.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.local_id !== _id);
      return {
        ...state,
        locals: {
          ...state.locals,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_LOCAL_ERROR:
      return {
        ...state,
        locals: {
          ...state.locals,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_LOCAL:
      return {
        ...state,
        local: {},
      };
    default:
      return state;
  }
}
