import * as accountsAPI from "../api/accounts";
import {
  createPromiseThunk,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
  createPromiseThunkOfPost,
  handleAsyncActionsOfPost,
  createPromiseThunkOfPut,
  handleAsyncActionsOfPut,
  handleAsyncActionsOfPostGet,
} from "../lib/asyncUtils";

const GET_ACCOUNTS = "account/GET_ACCOUNTS";
const GET_ACCOUNTS_SUCCESS = "account/GET_ACCOUNTS_SUCCESS";
const GET_ACCOUNTS_ERROR = "account/GET_ACCOUNTS_ERROR";

const GET_ACCOUNT = "account/GET_ACCOUNT";
const GET_ACCOUNT_SUCCESS = "account/GET_ACCOUNT_SUCCESS";
const GET_ACCOUNT_ERROR = "account/GET_ACCOUNT_ERROR";

const POST_ACCOUNT = "account/POST_ACCOUNT";
const POST_ACCOUNT_SUCCESS = "account/POST_ACCOUNT_SUCCESS";
const POST_ACCOUNT_ERROR = "account/POST_ACCOUNT_ERROR";

const PUT_ACCOUNT = "account/PUT_ACCOUNT";
const PUT_ACCOUNT_SUCCESS = "account/PUT_ACCOUNT_SUCCESS";
const PUT_ACCOUNT_ERROR = "account/PUT_ACCOUNT_ERROR";

const DELETE_ACCOUNT = "account/DELETE_ACCOUNT";
const DELETE_ACCOUNT_SUCCESS = "account/DELETE_ACCOUNT_SUCCESS";
const DELETE_ACCOUNT_ERROR = "account/DELETE_ACCOUNT_ERROR";

const CLEAR_ACCOUNT = "account/CLEAR_ACCOUNT";

const GET_LOGINRECORDS = "account/GET_LOGINRECORDS";
const GET_LOGINRECORDS_SUCCESS = "account/GET_LOGINRECORDS_SUCCESS";
const GET_LOGINRECORDS_ERROR = "account/GET_LOGINRECORDS_ERROR";

const POST_LOGINRECORDSSEARCH = "account/POST_LOGINRECORDSSEARCH";
const POST_LOGINRECORDSSEARCH_SUCCESS =
  "account/POST_LOGINRECORDSSEARCH_SUCCESS";
const POST_LOGINRECORDSSEARCH_ERROR = "account/POST_LOGINRECORDSSEARCH_ERROR";

export const getAccounts = createPromiseThunk(
  GET_ACCOUNTS,
  accountsAPI.getAccounts
);
export const getAccount = handleAsyncActionsById(
  GET_ACCOUNT,
  accountsAPI.getAccountById
);
export const postAccount = createPromiseThunkOfPost(
  POST_ACCOUNT,
  accountsAPI.postAccount
);
export const putAccount = createPromiseThunkOfPut(
  PUT_ACCOUNT,
  accountsAPI.putAccount
);
export const deleteAccount = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_ACCOUNT });
  try {
    // API 호출
    const payload = await accountsAPI.deleteAccount(id);
    // 요청 성공
    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload });
  } catch (e) {
    // 요청 실패
    dispatch({ type: DELETE_ACCOUNT_ERROR, error: e });
  }
};

export const getLoginRecords = createPromiseThunk(
  GET_LOGINRECORDS,
  accountsAPI.getLoginRecords
);
export const postLoginRecordsSearch = createPromiseThunkOfPost(
  POST_LOGINRECORDSSEARCH,
  accountsAPI.postLoginRecordsSearch
);

const initialState = {
  accounts: reducerUtils.initial(),
  account: {},
  auth: {},
  loginRecords: {},
};

const getAccountsReducer = handleAsyncActions(GET_ACCOUNTS, "accounts", true);
const getAccountReducer = handleAsyncActionsById(GET_ACCOUNT, "account", true);
const postAccountReducer = handleAsyncActionsOfPost(
  POST_ACCOUNT,
  "accounts",
  true
);
const putAccountReducer = handleAsyncActionsOfPut(
  PUT_ACCOUNT,
  "accounts",
  "acc_id",
  true
);
const getLoginRecordsReducer = handleAsyncActions(
  GET_LOGINRECORDS,
  "loginRecords",
  true
);
const postLoginRecordsSearchReducer = handleAsyncActionsOfPostGet(
  POST_LOGINRECORDSSEARCH,
  "loginRecords",
  true
);

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
    case GET_ACCOUNTS_SUCCESS:
    case GET_ACCOUNTS_ERROR:
      return getAccountsReducer(state, action);
    case GET_ACCOUNT:
    case GET_ACCOUNT_SUCCESS:
    case GET_ACCOUNT_ERROR:
      return getAccountReducer(state, action);
    case POST_ACCOUNT:
    case POST_ACCOUNT_SUCCESS:
    case POST_ACCOUNT_ERROR:
      return postAccountReducer(state, action);
    case PUT_ACCOUNT:
    case PUT_ACCOUNT_SUCCESS:
    case PUT_ACCOUNT_ERROR:
      return putAccountReducer(state, action);
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          loading: true,
          error: null,
        },
      };
    case DELETE_ACCOUNT_SUCCESS:
      const items = state.accounts.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.acc_id !== _id);
      return {
        ...state,
        accounts: {
          ...state.accounts,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_ACCOUNT:
      return {
        ...state,
        account: {},
      };
    case GET_LOGINRECORDS:
    case GET_LOGINRECORDS_SUCCESS:
    case GET_LOGINRECORDS_ERROR:
      return getLoginRecordsReducer(state, action);
    case POST_LOGINRECORDSSEARCH:
    case POST_LOGINRECORDSSEARCH_SUCCESS:
    case POST_LOGINRECORDSSEARCH_ERROR:
      return postLoginRecordsSearchReducer(state, action);
    default:
      return state;
  }
}
