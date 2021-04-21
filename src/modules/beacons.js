import * as beaconsAPI from "../api/beacons";
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

const GET_BEACONS = "beacon/GET_BEACONS";
const GET_BEACONS_SUCCESS = "beacon/GET_BEACONS_SUCCESS";
const GET_BEACONS_ERROR = "beacon/GET_BEACONS_ERROR";

const GET_BEACON = "beacon/GET_BEACON";
const GET_BEACON_SUCCESS = "beacon/GET_BEACON_SUCCESS";
const GET_BEACON_ERROR = "beacon/GET_BEACON_ERROR";

const POST_BEACON = "beacon/POST_BEACON";
const POST_BEACON_SUCCESS = "beacon/POST_BEACON_SUCCESS";
const POST_BEACON_ERROR = "beacon/POST_BEACON_ERROR";

const PUT_BEACON = "beacon/PUT_BEACON";
const PUT_BEACON_SUCCESS = "beacon/PUT_BEACON_SUCCESS";
const PUT_BEACON_ERROR = "beacon/PUT_BEACON_ERROR";

const DELETE_BEACON = "beacon/DELETE_BEACON";
const DELETE_BEACON_SUCCESS = "beacon/DELETE_BEACON_SUCCESS";
const DELETE_BEACON_ERROR = "beacon/DELETE_BEACON_ERROR";

const GET_UNUSED_BEACONS = "beacon/GET_UNUSED_BEACONS";
const GET_UNUSED_BEACONS_SUCCESS = "beacon/GET_UNUSED_BEACONS_SUCCESS";
const GET_UNUSED_BEACONS_ERROR = "beacon/GET_UNUSED_BEACONS_ERROR";

const CLEAR_BEACON = "beacon/CLEAR_BEACON";

export const getBeacons = createPromiseThunk(
  GET_BEACONS,
  beaconsAPI.getBeacons
);

export const getBeacon = handleAsyncActionsById(
  GET_BEACON,
  beaconsAPI.getBeaconById
);

export const postBeacon = createPromiseThunkOfPost(
  POST_BEACON,
  beaconsAPI.postBeacon
);

export const putBeacon = createPromiseThunkOfPut(
  PUT_BEACON,
  beaconsAPI.putBeacon
);

export const getUnUsedBeacons = createPromiseThunk(
  GET_UNUSED_BEACONS,
  beaconsAPI.getUnUsedBeacons
);

export const deleteBeacon = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_BEACON });
  try {
    //API 호출
    const payload = await beaconsAPI.deleteBeacon(id);
    //요청성공
    dispatch({ type: DELETE_BEACON_SUCCESS, payload });
  } catch (e) {
    dispatch({ type: DELETE_BEACON_ERROR, error: e });
  }
};

const initialState = {
  beacons: reducerUtils.initial(),
  beacon: {},
};

const getBeaconsReducer = handleAsyncActions(GET_BEACONS, "beacons", true);
const getBeaconReducer = handleAsyncActionsById(GET_BEACON, "beacons", true);
const postBeaconReducer = handleAsyncActionsOfPost(
  POST_BEACON,
  "beacons",
  true
);

const putBeaconReducer = handleAsyncActionsOfPut(
  PUT_BEACON,
  "beacons",
  "bc_index",
  true
);

const getUnUsedBeaconsReducer = handleAsyncActions(
  GET_UNUSED_BEACONS,
  "beacons",
  true
);

export default function beacons(state = initialState, action) {
  switch (action.type) {
    case GET_BEACONS:
    case GET_BEACONS_SUCCESS:
    case GET_BEACONS_ERROR:
      return getBeaconsReducer(state, action);
    case GET_BEACON:
    case GET_BEACON_SUCCESS:
    case GET_BEACON_ERROR:
      return getBeaconReducer(state, action);
    case POST_BEACON:
    case POST_BEACON_SUCCESS:
    case POST_BEACON_ERROR:
      return postBeaconReducer(state, action);
    case PUT_BEACON:
    case PUT_BEACON_SUCCESS:
    case PUT_BEACON_ERROR:
      return putBeaconReducer(state, action);
    case DELETE_BEACON:
      return {
        ...state,
        beacons: {
          ...state.beacons,
          loading: true,
          error: null,
        },
      };
    case DELETE_BEACON_SUCCESS:
      const items = state.beacons.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.bc_id !== _id);
      return {
        ...state,
        beacons: {
          ...state.beacons,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_BEACON_ERROR:
      return {
        ...state,
        beacons: {
          ...state.beacons,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_BEACON:
      return {
        ...state,
        beacon: {},
      };
    case GET_UNUSED_BEACONS:
    case GET_UNUSED_BEACONS_SUCCESS:
    case GET_UNUSED_BEACONS_ERROR:
      return getUnUsedBeaconsReducer(state, action);
    default:
      return state;
  }
}
