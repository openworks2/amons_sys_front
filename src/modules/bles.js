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

// 잔류 이력 조회

const GET_REMAINWORKERS = "ble/GET_REMAINWORKERS";
const GET_REMAINWORKERS_SUCCESS = "ble/GET_REMAINWORKERS_SUCCESS";
const GET_REMAINWORKERS_ERROR = "ble/GET_REMAINWORKERS_ERROR";

const GET_REMAINVEHICLES = "ble/GET_REMAINVEHICLES";
const GET_REMAINVEHICLES_SUCCESS = "ble/GET_REMAINVEHICLES_SUCCESS";
const GET_REMAINVEHICLES_ERROR = "ble/GET_REMAINVEHICLES_ERROR";

const POST_REMAINWORKERSSEARCH = "ble/POST_REMAINWORKERSSEARCH";
const POST_REMAINWORKERSSEARCH_SUCCESS = "ble/POST_REMAINWORKERSSEARCH_SUCCESS";
const POST_REMAINWORKERSSEARCH_ERROR = "ble/POST_REMAINWORKERSSEARCH_ERROR";

const POST_REMAINVEHICLESSEARCH = "ble/POST_REMAINVEHICLESSEARCH";
const POST_REMAINVEHICLESSEARCH_SUCCESS =
  "ble/POST_REMAINVEHICLESSEARCH_SUCCESS";
const POST_REMAINVEHICLESSEARCH_ERROR = "ble/POST_REMAINVEHICLESSEARCH_ERROR";

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

// 잔류 이력 조회

export const getRemainWorkers = createPromiseThunk(
  GET_REMAINWORKERS,
  blesAPI.getRemainWorkers
);

export const getRemainVehicles = createPromiseThunk(
  GET_REMAINVEHICLES,
  blesAPI.getRemainVehicles
);

export const postRemainWorkerSearch = createPromiseThunkOfPost(
  POST_REMAINWORKERSSEARCH,
  blesAPI.postRemainWorkerSearch
);

export const postRemainVehiclesSearch = createPromiseThunkOfPost(
  POST_REMAINVEHICLESSEARCH,
  blesAPI.postRemainVehiclesSearch
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

// 잔류 이력 조회

const getRemainWorkersReducer = handleAsyncActions(
  GET_REMAINWORKERS,
  "bleWorkers",
  true
);

const getRemainVehiclesReducer = handleAsyncActions(
  GET_REMAINVEHICLES,
  "bleVehicles",
  true
);

const postRemainWorkersSearchReducer = handleAsyncActionsOfPostGet(
  POST_REMAINWORKERSSEARCH,
  "bleWorkers",
  true
);

const postRemainVehiclesSearchReducer = handleAsyncActionsOfPostGet(
  POST_REMAINVEHICLESSEARCH,
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
    //잔류
    case GET_REMAINWORKERS:
    case GET_REMAINWORKERS_SUCCESS:
    case GET_REMAINWORKERS_ERROR:
      return getRemainWorkersReducer(state, action);
    case GET_REMAINVEHICLES:
    case GET_REMAINVEHICLES_SUCCESS:
    case GET_REMAINVEHICLES_ERROR:
      return getRemainVehiclesReducer(state, action);
    case POST_REMAINWORKERSSEARCH:
    case POST_REMAINWORKERSSEARCH_SUCCESS:
    case POST_REMAINWORKERSSEARCH_ERROR:
      return postRemainWorkersSearchReducer(state, action);
    case POST_REMAINVEHICLESSEARCH:
    case POST_REMAINVEHICLESSEARCH_SUCCESS:
    case POST_REMAINVEHICLESSEARCH_ERROR:
      return postRemainVehiclesSearchReducer(state, action);
    default:
      return state;
  }
}
