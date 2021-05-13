import * as processesAPI from "../api/processes";
import {
  createPromiseThunk,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
  createPromiseThunkOfPost,
  handleAsyncActionsOfPost,
  handleAsyncActionsOfPostOrderByTime,
  createPromiseThunkOfPut,
  handleAsyncActionsOfPut,
} from "../lib/asyncUtils";

const GET_PROCESSES = "process/GET_PROCESSES";
const GET_PROCESSES_SUCCESS = "process/GET_PROCESSES_SUCCESS";
const GET_PROCESSES_ERROR = "process/GET_PROCESSES_ERROR";

const GET_PROCESS = "process/GET_PROCESS";
const GET_PROCESS_SUCCESS = "process/GET_PROCESS_SUCCESS";
const GET_PROCESS_ERROR = "process/GET_PROCESS_ERROR";

const POST_PROCESS = "process/POST_PROCESS";
const POST_PROCESS_SUCCESS = "process/POST_PROCESS_SUCCESS";
const POST_PROCESS_ERROR = "process/POST_PROCESS_ERROR";

const PUT_PROCESS = "process/PUT_PROCESS";
const PUT_PROCESS_SUCCESS = "process/PUT_PROCESS_SUCCESS";
const PUT_PROCESS_ERROR = "process/PUT_PROCESS_ERROR";

const DELETE_PROCESS = "process/DELETE_PROCESS";
const DELETE_PROCESS_SUCCESS = "process/DELETE_PROCESS_SUCCESS";
const DELETE_PROCESS_ERROR = "process/DELETE_PROCESS_ERROR";

const CLEAR_PROCESS = "process/CLEAR_PROCESS";

export const getProcesses = createPromiseThunk(
  GET_PROCESSES,
  processesAPI.getProcesses
);

export const getProcess = handleAsyncActionsById(
  GET_PROCESS,
  processesAPI.getProcessById
);

export const postProcess = createPromiseThunkOfPost(
  POST_PROCESS,
  processesAPI.postProcess
);

export const putProcess = createPromiseThunkOfPut(
  PUT_PROCESS,
  processesAPI.putProcess
);

export const deleteProcess = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_PROCESS });
  try {
    //API 호출
    const payload = await processesAPI.deleteProcess(id);
    //요청성공
    dispatch({ type: DELETE_PROCESS_SUCCESS, payload });
  } catch (e) {
    dispatch({ type: DELETE_PROCESS_ERROR, error: e });
  }
};

const initialState = {
  processes: reducerUtils.initial(),
  process: {},
};

const getProcessesReducer = handleAsyncActions(
  GET_PROCESSES,
  "processes",
  true
);
const getProcessReducer = handleAsyncActionsById(GET_PROCESS, "process", true);
const postProcessReducer = handleAsyncActionsOfPostOrderByTime(
  POST_PROCESS,
  "processes",
  true
);
const putProcessReducer = handleAsyncActionsOfPut(
  PUT_PROCESS,
  "processes",
  "pcs_seq",
  true
);

export default function processes(state = initialState, action) {
  switch (action.type) {
    case GET_PROCESSES:
    case GET_PROCESSES_SUCCESS:
    case GET_PROCESSES_ERROR:
      return getProcessesReducer(state, action);
    case GET_PROCESS:
    case GET_PROCESS_SUCCESS:
    case GET_PROCESS_ERROR:
      return getProcessReducer(state, action);
    case POST_PROCESS:
    case POST_PROCESS_SUCCESS:
    case POST_PROCESS_ERROR:
      return postProcessReducer(state, action);
    case PUT_PROCESS:
    case PUT_PROCESS_SUCCESS:
    case PUT_PROCESS_ERROR:
      return putProcessReducer(state, action);
    case DELETE_PROCESS:
      return {
        ...state,
        processes: {
          ...state.processes,
          loading: true,
          error: null,
        },
      };
    case DELETE_PROCESS_SUCCESS:
      const items = state.processes.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.pcs_seq !== _id);
      return {
        ...state,
        processes: {
          ...state.processes,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_PROCESS_ERROR:
      return {
        ...state,
        processes: {
          ...state.processes,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_PROCESS:
      return {
        ...state,
        process: {},
      };
    default:
      return state;
  }
}
