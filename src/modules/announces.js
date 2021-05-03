import * as announcesAPI from "../api/announces";
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

const GET_ANNOUNCES = "announce/GET_ANNOUNCES";
const GET_ANNOUNCES_SUCCESS = "announce/GET_ANNOUNCES_SUCCESS";
const GET_ANNOUNCES_ERROR = "announce/GET_ANNOUNCES_ERROR";

const GET_ANNOUNCE = "announce/GET_ANNOUNCE";
const GET_ANNOUNCE_SUCCESS = "announce/GET_ANNOUNCE_SUCCESS";
const GET_ANNOUNCE_ERROR = "announce/GET_ANNOUNCE_ERROR";

const POST_ANNOUNCE = "announce/POST_ANNOUNCE";
const POST_ANNOUNCE_SUCCESS = "announce/POST_ANNOUNCE_SUCCESS";
const POST_ANNOUNCE_ERROR = "announce/POST_ANNOUNCE_ERROR";

const PUT_ANNOUNCE = "announce/PUT_ANNOUNCE";
const PUT_ANNOUNCE_SUCCESS = "announce/PUT_ANNOUNCE_SUCCESS";
const PUT_ANNOUNCE_ERROR = "announce/PUT_ANNOUNCE_ERROR";

const DELETE_ANNOUNCE = "announce/DELETE_ANNOUNCE";
const DELETE_ANNOUNCE_SUCCESS = "announce/DELETE_ANNOUNCE_SUCCESS";
const DELETE_ANNOUNCE_ERROR = "announce/DELETE_ANNOUNCE_ERROR";

const CLEAR_ANNOUNCE = "announce/CLEAR_ANNOUNCE";

export const getAnnounces = createPromiseThunk(
  GET_ANNOUNCES,
  announcesAPI.getAnnounces
);
export const getAnnounce = handleAsyncActionsById(
  GET_ANNOUNCE,
  announcesAPI.getAnnounceById
);
export const postAnnounce = createPromiseThunkOfPost(
  POST_ANNOUNCE,
  announcesAPI.postAnnounce
);
export const putAnnounce = createPromiseThunkOfPut(
  PUT_ANNOUNCE,
  announcesAPI.putAnnounce
);
export const deleteAnnounce = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_ANNOUNCE });
  try {
    // API 호출
    const payload = await announcesAPI.deleteAnnounce(id);
    // 요청 성공
    dispatch({ type: DELETE_ANNOUNCE_SUCCESS, payload });
  } catch (e) {
    // 요청 실패
    dispatch({ type: DELETE_ANNOUNCE_ERROR, error: e });
  }
};

const initialState = {
  announces: reducerUtils.initial(),
  announce: {},
};

const getAnnouncesReducer = handleAsyncActions(
  GET_ANNOUNCES,
  "announces",
  true
);
const getAnnounceReducer = handleAsyncActionsById(
  GET_ANNOUNCE,
  "announce",
  true
);
const postAnnounceReducer = handleAsyncActionsOfPost(
  POST_ANNOUNCE,
  "announces",
  true
);
const putAnnounceReducer = handleAsyncActionsOfPut(
  PUT_ANNOUNCE,
  "announces",
  "ann_id",
  true
);

export default function announces(state = initialState, action) {
  switch (action.type) {
    case GET_ANNOUNCES:
    case GET_ANNOUNCES_SUCCESS:
    case GET_ANNOUNCES_ERROR:
      return getAnnouncesReducer(state, action);
    case GET_ANNOUNCE:
    case GET_ANNOUNCE_SUCCESS:
    case GET_ANNOUNCE_ERROR:
      return getAnnounceReducer(state, action);
    case POST_ANNOUNCE:
    case POST_ANNOUNCE_SUCCESS:
    case POST_ANNOUNCE_ERROR:
      return postAnnounceReducer(state, action);
    case PUT_ANNOUNCE:
    case PUT_ANNOUNCE_SUCCESS:
    case PUT_ANNOUNCE_ERROR:
      return putAnnounceReducer(state, action);
    case DELETE_ANNOUNCE:
      return {
        ...state,
        announces: {
          ...state.announces,
          loading: true,
          error: null,
        },
      };
    case DELETE_ANNOUNCE_SUCCESS:
      const items = state.announces.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.ann_id !== _id);
      return {
        ...state,
        announces: {
          ...state.announces,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_ANNOUNCE_ERROR:
      return {
        ...state,
        announces: {
          ...state.announces,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_ANNOUNCE:
      return {
        ...state,
        announce: {},
      };
    default:
      return state;
  }
}
