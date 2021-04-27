import * as scannersAPI from "../api/scanners";
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

const GET_SCANNERS = "scanner/GET_SCANNERS";
const GET_SCANNERS_SUCCESS = "scanner/GET_SCANNERS_SUCCESS";
const GET_SCANNERS_ERROR = "scanner/GET_SCANNERS_ERROR";

const GET_SCANNER = "scanner/GET_SCANNER";
const GET_SCANNER_SUCCESS = "scanner/GET_SCANNER_SUCCESS";
const GET_SCANNER_ERROR = "scanner/GET_SCANNER_ERROR";

const POST_SCANNER = "scanner/POST_SCANNER";
const POST_SCANNER_SUCCESS = "scanner/POST_SCANNER_SUCCESS";
const POST_SCANNER_ERROR = "scanner/POST_SCANNER_ERROR";

const PUT_SCANNER = "scanner/PUT_SCANNER";
const PUT_SCANNER_SUCCESS = "scanner/PUT_SCANNER_SUCCESS";
const PUT_SCANNER_ERROR = "scanner/PUT_SCANNER_ERROR";

const DELETE_SCANNER = "scanner/DELETE_SCANNER";
const DELETE_SCANNER_SUCCESS = "scanner/DELETE_SCANNER_SUCCESS";
const DELETE_SCANNER_ERROR = "scanner/DELETE_SCANNER_ERROR";

const CLEAR_SCANNER = "scanner/CLEAR_SCANNER";

export const getScanners = createPromiseThunk(
  GET_SCANNERS,
  scannersAPI.getScanners
);
export const getScanner = handleAsyncActionsById(
  GET_SCANNER,
  scannersAPI.getScannerById
);
export const postScanner = createPromiseThunkOfPost(
  POST_SCANNER,
  scannersAPI.postScanner
);
export const putScanner = createPromiseThunkOfPut(
  PUT_SCANNER,
  scannersAPI.putScanner
);
export const deleteScanner = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_SCANNER });
  try {
    // API 호출
    const payload = await scannersAPI.deleteScanner(id);
    // 요청 성공
    dispatch({ type: DELETE_SCANNER_SUCCESS, payload });
  } catch (e) {
    // 요청 실패
    dispatch({ type: DELETE_SCANNER_ERROR, error: e });
  }
};

const initialState = {
  scanners: reducerUtils.initial(),
  scanner: {},
};

const getScannersReducer = handleAsyncActions(GET_SCANNERS, "scanners", true);
const getScannerReducer = handleAsyncActionsById(GET_SCANNER, "scanner", true);
const postScannerReducer = handleAsyncActionsOfPost(
  POST_SCANNER,
  "scanners",
  true
);
const putScannerReducer = handleAsyncActionsOfPut(
  PUT_SCANNER,
  "scanners",
  "scn_index",
  true
);

export default function scanners(state = initialState, action) {
  switch (action.type) {
    case GET_SCANNERS:
    case GET_SCANNERS_SUCCESS:
    case GET_SCANNERS_ERROR:
      return getScannersReducer(state, action);
    case GET_SCANNER:
    case GET_SCANNER_SUCCESS:
    case GET_SCANNER_ERROR:
      return getScannerReducer(state, action);
    case POST_SCANNER:
    case POST_SCANNER_SUCCESS:
    case POST_SCANNER_ERROR:
      return postScannerReducer(state, action);
    case PUT_SCANNER:
    case PUT_SCANNER_SUCCESS:
    case PUT_SCANNER_ERROR:
      return putScannerReducer(state, action);
    case DELETE_SCANNER:
      return {
        ...state,
        scanners: {
          ...state.scanners,
          loading: true,
          error: null,
        },
      };
    case DELETE_SCANNER_SUCCESS:
      const items = state.scanners.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.scn_id !== _id);
      return {
        ...state,
        scanners: {
          ...state.scanners,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_SCANNER_ERROR:
      return {
        ...state,
        scanners: {
          ...state.scanners,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_SCANNER:
      return {
        ...state,
        scanner: {},
      };
    default:
      return state;
  }
}
