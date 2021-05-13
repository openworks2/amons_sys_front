import * as alarmsAPI from "../api/alarms";
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
const postAlarmSearchReducer = handleAsyncActionsOfPost(
  POST_ALARMSEARCH,
  "alarms",
  true
);
const putAlarmReducer = handleAsyncActionsOfPut(
  PUT_ALARM,
  "alarms",
  "emg_seq",
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
    case PUT_ALARM_SUCCESS:
    case PUT_ALARM_ERROR:
      return putAlarmReducer(state, action);
    case CLEAR_ALARM:
      return {
        ...state,
        alarm: {},
      };
    default:
      return state;
  }
}
