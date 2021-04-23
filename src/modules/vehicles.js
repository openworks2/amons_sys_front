import * as vehiclesAPI from "../api/vehicles";
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

const GET_VEHICLES = "vehicle/GET_VEHICLES";
const GET_VEHICLES_SUCCESS = "vehicle/GET_VEHICLES_SUCCESS";
const GET_VEHICLES_ERROR = "vehicle/GET_VEHICLES_ERROR";

const GET_VEHICLE = "vehicle/GET_VEHICLE";
const GET_VEHICLE_SUCCESS = "vehicle/GET_VEHICLE_SUCCESS";
const GET_VEHICLE_ERROR = "vehicle/GET_VEHICLE_ERROR";

const POST_VEHICLE = "vehicle/POST_VEHICLE";
const POST_VEHICLE_SUCCESS = "vehicle/POST_VEHICLE_SUCCESS";
const POST_VEHICLE_ERROR = "vehicle/POST_VEHICLE_ERROR";

const PUT_VEHICLE = "vehicle/PUT_VEHICLE";
const PUT_VEHICLE_SUCCESS = "vehicle/PUT_VEHICLE_SUCCESS";
const PUT_VEHICLE_ERROR = "vehicle/PUT_VEHICLE_ERROR";

const DELETE_VEHICLE = "vehicle/DELETE_VEHICLE";
const DELETE_VEHICLE_SUCCESS = "vehicle/DELETE_VEHICLE_SUCCESS";
const DELETE_VEHICLE_ERROR = "vehicle/DELETE_VEHICLE_ERROR";

const CLEAR_VEHICLE = "VEHICLE/CLEAR_VEHICLE";

export const getVehicles = createPromiseThunk(
  GET_VEHICLES,
  vehiclesAPI.getVehicles
);
export const getVehicle = handleAsyncActionsById(
  GET_VEHICLE,
  vehiclesAPI.getVehicleById
);
export const postVehicle = createPromiseThunkOfPost(
  POST_VEHICLE,
  vehiclesAPI.postVehicle
);
export const putVehicle = createPromiseThunkOfPut(
  PUT_VEHICLE,
  vehiclesAPI.putVehicle
);
export const deleteVehicle = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_VEHICLE });
  try {
    // API 호출
    const payload = await vehiclesAPI.deleteVehicle(id);
    // 요청 성공
    dispatch({ type: DELETE_VEHICLE_SUCCESS, payload });
  } catch (e) {
    // 요청 실패
    dispatch({ type: DELETE_VEHICLE_ERROR, error: e });
  }
};

const initialState = {
  vehicles: reducerUtils.initial(),
  vehicle: {},
};

const getVehiclesReducer = handleAsyncActions(GET_VEHICLES, "vehicles", true);
const getVehicleReducer = handleAsyncActionsById(GET_VEHICLE, "vehicle", true);
const postVehicleReducer = handleAsyncActionsOfPost(
  POST_VEHICLE,
  "vehicles",
  true
);
const putVehicleReducer = handleAsyncActionsOfPut(
  PUT_VEHICLE,
  "vehicles",
  "vh_index",
  true
);

export default function vehicles(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLES:
    case GET_VEHICLES_SUCCESS:
    case GET_VEHICLES_ERROR:
      return getVehiclesReducer(state, action);
    case GET_VEHICLE:
    case GET_VEHICLE_SUCCESS:
    case GET_VEHICLE_ERROR:
      return getVehicleReducer(state, action);
    case POST_VEHICLE:
    case POST_VEHICLE_SUCCESS:
    case POST_VEHICLE_ERROR:
      return postVehicleReducer(state, action);
    case PUT_VEHICLE:
    case PUT_VEHICLE_SUCCESS:
    case PUT_VEHICLE_ERROR:
      return putVehicleReducer(state, action);
    case DELETE_VEHICLE:
      return {
        ...state,
        vehicles: {
          ...state.vehicles,
          loading: true,
          error: null,
        },
      };
    case DELETE_VEHICLE_SUCCESS:
      const items = state.vehicles.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.vh_id !== _id);
      return {
        ...state,
        vehicles: {
          ...state.vehicles,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_VEHICLE_ERROR:
      return {
        ...state,
        vehicles: {
          ...state.vehicles,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_VEHICLE:
      return {
        ...state,
        vehicle: {},
      };
    default:
      return state;
  }
}
