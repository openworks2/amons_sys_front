import * as workersAPI from "../api/workers";
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

const GET_WORKERS = "worker/GET_WORKERS";
const GET_WORKERS_SUCCESS = "worker/GET_WORKERS_SUCCESS";
const GET_WORKERS_ERROR = "worker/GET_WORKERS_ERROR";

const GET_WORKER = "worker/GET_WORKER";
const GET_WORKER_SUCCESS = "worker/GET_WORKER_SUCCESS";
const GET_WORKER_ERROR = "worker/GET_WORKER_ERROR";

const POST_WORKER = "worker/POST_WORKER";
const POST_WORKER_SUCCESS = "worker/POST_WORKER_SUCCESS";
const POST_WORKER_ERROR = "worker/POST_WORKER_ERROR";

const PUT_WORKER = "worker/PUT_WORKER";
const PUT_WORKER_SUCCESS = "worker/PUT_WORKER_SUCCESS";
const PUT_WORKER_ERROR = "worker/PUT_WORKER_ERROR";

const DELETE_WORKER = "worker/DELETE_WORKER";
const DELETE_WORKER_SUCCESS = "worker/DELETE_WORKER_SUCCESS";
const DELETE_WORKER_ERROR = "worker/DELETE_WORKER_ERROR";

const CLEAR_WORKER = "worker/CLEAR_WORKER";

export const getWorkers = createPromiseThunk(
  GET_WORKERS,
  workersAPI.getWorkers
);

export const getWorker = handleAsyncActionsById(
  GET_WORKER,
  workersAPI.getWorkerById
);

export const postWorker = createPromiseThunkOfPost(
  POST_WORKER,
  workersAPI.postWorker
);

export const putWorker = createPromiseThunkOfPut(
  PUT_WORKER,
  workersAPI.putWorker
);

export const deleteWorker = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_WORKER });
  try {
    //API 호출
    const payload = await workersAPI.deleteWorker(id);
    //요청성공
    dispatch({ type: DELETE_WORKER_SUCCESS, payload });
  } catch (e) {
    dispatch({ type: DELETE_WORKER_ERROR, error: e });
  }
};

const initialState = {
  workers: reducerUtils.initial(),
  worker: {},
};

const getWorkersReducer = handleAsyncActions(GET_WORKERS, "workers", true);
const getWorkerReducer = handleAsyncActionsById(GET_WORKER, "workers", true);
const postWorkerReducer = handleAsyncActionsOfPost(
  POST_WORKER,
  "workers",
  true
);
const putWorkerReducer = handleAsyncActionsOfPut(
  PUT_WORKER,
  "workers",
  "wk_index",
  true
);

export default function workers(state = initialState, action) {
  switch (action.type) {
    case GET_WORKERS:
    case GET_WORKERS_SUCCESS:
    case GET_WORKERS_ERROR:
      return getWorkersReducer(state, action);
    case GET_WORKER:
    case GET_WORKER_SUCCESS:
    case GET_WORKER_ERROR:
      return getWorkerReducer(state, action);
    case POST_WORKER:
    case POST_WORKER_SUCCESS:
    case POST_WORKER_ERROR:
      return postWorkerReducer(state, action);
    case PUT_WORKER:
    case PUT_WORKER_SUCCESS:
    case PUT_WORKER_ERROR:
      return putWorkerReducer(state, action);
    case DELETE_WORKER:
      return {
        ...state,
        workers: {
          ...state.workers,
          loading: true,
          error: null,
        },
      };
    case DELETE_WORKER_SUCCESS:
      const items = state.workers.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.wk_id !== _id);
      return {
        ...state,
        workers: {
          ...state.workers,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_WORKER_ERROR:
      return {
        ...state,
        workers: {
          ...state.workers,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_WORKER:
      return {
        ...state,
        worker: {},
      };
    default:
      return state;
  }
}
