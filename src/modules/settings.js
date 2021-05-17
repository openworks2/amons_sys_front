import * as settingsAPI from "../api/settings";
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
  createPromiseThunkOfPut,
  handleAsyncActionsOfPut,
} from "../lib/asyncUtils";

const GET_SETTINGS = "setting/GET_SETTINGS";
const GET_SETTINGS_SUCCESS = "setting/GET_SETTINGS_SUCCESS";
const GET_SETTINGS_ERROR = "setting/GET_SETTINGS_ERROR";

const PUT_SETTINGS = "setting/PUT_SETTINGS";
const PUT_SETTINGS_SUCCESS = "setting/PUT_SETTINGS_SUCCESS";
const PUT_SETTINGS_ERROR = "setting/PUT_SETTINGS_ERROR";

export const getSettings = createPromiseThunk(
  GET_SETTINGS,
  settingsAPI.getSettings
);
export const putSettings = createPromiseThunkOfPut(
  PUT_SETTINGS,
  settingsAPI.putSettings
);

const initialState = {
  settings: reducerUtils.initial(),
};

const getSettingsReducer = handleAsyncActions(GET_SETTINGS, "settings", true);
const putSettingsReducer = handleAsyncActionsOfPut(
  PUT_SETTINGS,
  "settings",
  "setting_seq",
  true
);

export default function settings(state = initialState, action) {
  switch (action.type) {
    case GET_SETTINGS:
    case GET_SETTINGS_SUCCESS:
    case GET_SETTINGS_ERROR:
      return getSettingsReducer(state, action);
    case PUT_SETTINGS:
    case PUT_SETTINGS_SUCCESS:
    case PUT_SETTINGS_ERROR:
      return putSettingsReducer(state, action);
    default:
      return state;
  }
}
