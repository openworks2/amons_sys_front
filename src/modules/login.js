import * as loginAPI from "../api/login";
import {
  createPromiseThunkByLogin,
  handleAsyncActionsByLogin,
  createPromiseThunkByLogOut,
  handleAsyncActionsByLogOut,
  reducerUtilsByAuth,
  createPromiseThunkByLoginCheck,
  handleAsyncActionsByLoginCheck,
} from "../lib/asyncUtilsByAuth";

// 액션타입
const LOGIN_ACCOUNT = "account/LOGIN_ACCOUNT";
const LOGIN_ACCOUNT_SUCCESS = "account/LOGIN_ACCOUNT_SUCCESS";
const LOGIN_ACCOUNT_FAIL = "account/LOGIN_ACCOUNT_FAIL";
const LOGIN_ACCOUNT_ERROR = "account/LOGIN_ACCOUNT_ERROR";

const LOGOUT_ACCOUNT = "account/LOGOUT_ACCOUNT";
const LOGOUT_ACCOUNT_SUCCESS = "account/LOGOUT_ACCOUNT_SUCCESS";
const LOGOUT_ACCOUNT_ERROR = "account/LOGOUT_ACCOUNT_ERROR";

const LOGIN_CHECK = "account/LOGIN_CHECK";
const LOGIN_CHECK_SUCCESS = "account/LOGIN_CHECK_SUCCESS";
const LOGIN_CHECK_LOGOUT = "account/LOGIN_CHECK_LOGOUT";
const LOGIN_CHECK_ERROR = "account/LOGIN_CHECK_ERROR";

const SET_LOGGED_INFO = "account/SET_LOGGED_INFO";

// 다른 디바이스 강제 로그아웃
const DUPLICATION_LOGOUT = "account/DUPLICATION_LOGOUT";
const DUPLICATION_LOGOUT_SUCCESS = "account/DUPLICATION_LOGOUT_SUCCESS";
const DUPLICATION_LOGOUT_ERROR = "account/DUPLICATION_LOGOUT_ERROR";

// 액션 trunk 함수
/* 로그인 요청 액션 */
// export const getBridges = createPromiseThunk(GET_BRIDGES, bridgeAPI.getBridges);
export const loginAsync = createPromiseThunkByLogin(
  LOGIN_ACCOUNT,
  loginAPI.loginAccount
);

/* 로그아웃 요청 액션 */
export const logOutAsync = createPromiseThunkByLogOut(
  LOGOUT_ACCOUNT,
  loginAPI.logoutAccount
);

/* 로그인 체크 액션 */
export const loginCheckAsync = createPromiseThunkByLoginCheck(
  LOGIN_CHECK,
  loginAPI.checkStatus
);

/* 로그인 데이터 추가 액션- localStarage에는 존재, state에는 login.login.data에 없다. */
export const setLogindInfoAsync = (logindInfo) => (dispatch) => {
  dispatch({ type: SET_LOGGED_INFO, payload: logindInfo });
};

/* 다른 디바이스 로그아웃 액션 */
export const duplicationLogoutAsync = (data) => async (dispatch) => {
  dispatch({ type: DUPLICATION_LOGOUT });
  try {
    const payload = await loginAPI.duplicationLogout(data);
    dispatch({ type: DUPLICATION_LOGOUT_SUCCESS, payload });
  } catch (e) {
    dispatch({ type: DUPLICATION_LOGOUT_ERROR, error: e });
  }
};

// 초기값
const initialState = {
  login: reducerUtilsByAuth.initial(),
};

const loginAuthReducer = handleAsyncActionsByLogin(
  LOGIN_ACCOUNT,
  "login",
  true
);
const logOutAuthReducer = handleAsyncActionsByLogOut(
  LOGOUT_ACCOUNT,
  "login",
  true
);
const logInCheckAuthReducer = handleAsyncActionsByLoginCheck(
  LOGIN_CHECK,
  "login",
  true
);

// 리듀서
export default function accounts(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACCOUNT:
    case LOGIN_ACCOUNT_SUCCESS:
    case LOGIN_ACCOUNT_FAIL:
    case LOGIN_ACCOUNT_ERROR:
      return loginAuthReducer(state, action);
    case LOGOUT_ACCOUNT:
    case LOGOUT_ACCOUNT_SUCCESS:
    case LOGOUT_ACCOUNT_ERROR:
      return logOutAuthReducer(state, action);
    case LOGIN_CHECK:
    case LOGIN_CHECK_SUCCESS:
    case LOGIN_CHECK_LOGOUT:
    case LOGIN_CHECK_ERROR:
      return logInCheckAuthReducer(state, action);
    case SET_LOGGED_INFO:
      return {
        ...state,
        login: {
          ...state.login,
          data: action.payload,
          logined: true,
          validated: true,
        },
      };
    case DUPLICATION_LOGOUT:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
          error: null,
        },
      };
    case DUPLICATION_LOGOUT_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          validated: action.validated,
          loading: action.validated ? state.login.loading : false,
        },
      };
    case DUPLICATION_LOGOUT_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
