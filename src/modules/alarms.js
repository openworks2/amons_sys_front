import * as alarmsAPI from "../api/alarms";
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
  createPromiseThunkOfPost,
  handleAsyncActionsOfPostGet,
  createPromiseThunkOfPut,
} from "../lib/asyncUtils";

const GET_ALARMS = "alarm/GET_ALARMS";
const GET_ALARMS_SUCCESS = "alarm/GET_ALARMS_SUCCESS";
const GET_ALARMS_ERROR = "alarm/GET_ALARMS_ERROR";

const POST_ALARMSEARCH = "alarm/POST_ALARMSEARCH";
const POST_ALARMSEARCH_SUCCESS = "alarm/POST_ALARMSEARCH_SUCCESS";
const POST_ALARMSEARCH_ERROR = "alarm/POST_ALARMSEARCH_ERROR";

const PUT_ALARM = "alarm/PUT_ALARM";
const PUT_ALARM_SUCCESS = "alarm/PUT_ALARM_SUCCESS";
const PUT_ALARM_ERROR = "alarm/PUT_ALARM_ERROR";

const CLEAR_ALARM = "alarm/CLEAR_ALARM";

export const getAlarms = createPromiseThunk(GET_ALARMS, alarmsAPI.getAlarms);

export const postAlarmSearch = createPromiseThunkOfPost(
  POST_ALARMSEARCH,
  alarmsAPI.postAlarmSearch
);
export const putAlarm = createPromiseThunkOfPut(PUT_ALARM, alarmsAPI.putAlarm);

const initialState = {
  alarms: reducerUtils.initial(),
  alarm: {},
};

const getAlarmsReducer = handleAsyncActions(GET_ALARMS, "alarms", true);
const postAlarmSearchReducer = handleAsyncActionsOfPostGet(
  POST_ALARMSEARCH,
  "alarms",
  true
);

export default function alarms(state = initialState, action) {
  switch (action.type) {
    case GET_ALARMS:
    case GET_ALARMS_SUCCESS:
    case GET_ALARMS_ERROR:
      return getAlarmsReducer(state, action);
    case POST_ALARMSEARCH:
    case POST_ALARMSEARCH_SUCCESS:
    case POST_ALARMSEARCH_ERROR:
      return postAlarmSearchReducer(state, action);
    case PUT_ALARM:
      return {
        ...state,
        alarms: {
          ...state.alarms,
          loading: true,
          error: null,
        },
      };
    case PUT_ALARM_SUCCESS:
      let items = state.alarms.data;
      const _seq = parseInt(action.payload.emg_seq);
      const _formData = action.payload;

      let modifiedData = items.find((el) => el.emg_seq === _seq);
      modifiedData = {
        ...modifiedData,
        emg_writer: _formData.emg_writer,
        emg_result: _formData.emg_result,
        emg_end_time: _formData.emg_end_time,
      };
      items = items.filter((el) => el.emg_seq !== _seq);
      items.push(modifiedData);
      return {
        ...state,
        alarms: {
          ...state.alarms,
          loading: false,
          data: items,
          error: null,
        },
      };
    case PUT_ALARM_ERROR:
      return {
        ...state,
        alarms: {
          ...state.alarms,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_ALARM:
      return {
        ...state,
        alarm: {},
      };
    default:
      return state;
  }
}
