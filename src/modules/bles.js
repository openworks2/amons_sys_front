import * as blesAPI from "../api/bles";
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
  createPromiseThunkOfPost,
  handleAsyncActionsOfPostGet,
} from "../lib/asyncUtils";

const GET_BLEWORKERS = "ble/GET_BLEWORKERS";
const GET_BLEWORKERS_SUCCESS = "ble/GET_BLEWORKERS_SUCCESS";
const GET_BLEWORKERS_ERROR = "ble/GET_BLEWORKERS_ERROR";

const POST_BLEWORKERSSEARCH = "ble/POST_BLEWORKERSSEARCH";
const POST_BLEWORKERSSEARCH_SUCCESS = "ble/POST_BLEWORKERSSEARCH_SUCCESS";
const POST_BLEWORKERSSEARCH_ERROR = "ble/POST_BLEWORKERSSEARCH_ERROR";

const GET_BLEVEHICLES = "ble/GET_BLEVEHICLES ";
const GET_BLEVEHICLES_SUCCESS = "ble/GET_BLEVEHICLES_SUCCESS";
const GET_BLEVEHICLES_ERROR = "ble/GET_BLEVEHICLES_ERROR";

const POST_BLEVEHICLESSEARCH = "ble/POST_BLEVEHICLESSEARCH";
const POST_BLEVEHICLESSEARCH_SUCCESS = "ble/POST_BLEVEHICLESSEARCH_SUCCESS";
const POST_BLEVEHICLESSEARCH_ERROR = "ble/POST_BLEVEHICLESSEARCH_ERROR";

export const getBleWorkers = createPromiseThunk(
  GET_BLEWORKERS,
  blesAPI.getBleWorkers
);

export const postBleWorkersSearch = createPromiseThunkOfPost(
  POST_BLEWORKERSSEARCH,
  blesAPI.postBleWorkersSearch
);

export const getBleVehicles = createPromiseThunk(
  GET_BLEVEHICLES,
  blesAPI.getBleVehicles
);

export const postBleVehiclesSearch = createPromiseThunkOfPost(
  POST_BLEVEHICLESSEARCH,
  blesAPI.postBleVehiclesSearch
);

const initialState = {
  bleWorkers: reducerUtils.initial(),
  bleVehicles: reducerUtils.initial(),
};

const getBleWorkersReducer = handleAsyncActions(
  GET_BLEWORKERS,
  "bleWorkers",
  true
);
const postBleWorkersSearchReducer = handleAsyncActionsOfPostGet(
  POST_BLEWORKERSSEARCH,
  "bleWorkers",
  true
);

const getBleVehiclesReducer = handleAsyncActions(
  GET_BLEVEHICLES,
  "bleVehicles",
  true
);
const postBleVehiclesSearchReducer = handleAsyncActionsOfPostGet(
  POST_BLEVEHICLESSEARCH,
  "bleVehicles",
  true
);

export default function bles(state = initialState, action) {
  switch (action.type) {
    case GET_BLEWORKERS:
    case GET_BLEWORKERS_SUCCESS:
    case GET_BLEWORKERS_ERROR:
      return getBleWorkersReducer(state, action);
    case POST_BLEWORKERSSEARCH:
    case POST_BLEWORKERSSEARCH_SUCCESS:
    case POST_BLEWORKERSSEARCH_ERROR:
      return postBleWorkersSearchReducer(state, action);
    case GET_BLEVEHICLES:
    case GET_BLEVEHICLES_SUCCESS:
    case GET_BLEVEHICLES_ERROR:
      return getBleVehiclesReducer(state, action);
    case POST_BLEVEHICLESSEARCH:
    case POST_BLEVEHICLESSEARCH_SUCCESS:
    case POST_BLEVEHICLESSEARCH_ERROR:
      return postBleVehiclesSearchReducer(state, action);
    default:
      return state;
  }
}
