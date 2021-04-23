import * as companiesAPI from "../api/companies";
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

const GET_COMPANIES = "company/GET_COMPANIES";
const GET_COMPANIES_SUCCESS = "company/GET_COMPANIES_SUCCESS";
const GET_COMPANIES_ERROR = "company/GET_COMPANIES_ERROR";

const GET_COMPANY = "company/GET_COMPANY";
const GET_COMPANY_SUCCESS = "company/GET_COMPANY_SUCCESS";
const GET_COMPANY_ERROR = "company/GET_COMPANY_ERROR";

const POST_COMPANY = "company/POST_COMPANY";
const POST_COMPANY_SUCCESS = "company/POST_COMPANY_SUCCESS";
const POST_COMPANY_ERROR = "company/POST_COMPANY_ERROR";

const PUT_COMPANY = "company/PUT_COMPANY";
const PUT_COMPANY_SUCCESS = "company/PUT_COMPANY_SUCCESS";
const PUT_COMPANY_ERROR = "company/PUT_COMPANY_ERROR";

const DELETE_COMPANY = "company/DELETE_COMPANY";
const DELETE_COMPANY_SUCCESS = "company/DELETE_COMPANY_SUCCESS";
const DELETE_COMPANY_ERROR = "company/DELETE_COMPANY_ERROR";

const CLEAR_COMPANY = "company/CLEAR_COMPANY";

export const getCompanies = createPromiseThunk(
  GET_COMPANIES,
  companiesAPI.getCompanies
);
export const getCompany = handleAsyncActionsById(
  GET_COMPANY,
  companiesAPI.getCompanyById
);
export const postCompany = createPromiseThunkOfPost(
  POST_COMPANY,
  companiesAPI.postCompany
);
export const putCompany = createPromiseThunkOfPut(
  PUT_COMPANY,
  companiesAPI.putCompany
);
export const deleteCompany = (id) => async (dispatch) => {
  // 요청시작
  dispatch({ type: DELETE_COMPANY });
  try {
    // API 호출
    const payload = await companiesAPI.deleteCompany(id);
    // 요청 성공
    dispatch({ type: DELETE_COMPANY_SUCCESS, payload });
  } catch (e) {
    // 요청 실패
    dispatch({ type: DELETE_COMPANY_ERROR, error: e });
  }
};

const initialState = {
  companies: reducerUtils.initial(),
  company: {},
};

const getCompaniesReducer = handleAsyncActions(
  GET_COMPANIES,
  "companies",
  true
);
const getCompanyReducer = handleAsyncActionsById(GET_COMPANY, "company", true);
const postCompanyReducer = handleAsyncActionsOfPost(
  POST_COMPANY,
  "companies",
  true
);
const putCompanyReducer = handleAsyncActionsOfPut(
  PUT_COMPANY,
  "companies",
  "co_index",
  true
);

export default function companies(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
    case GET_COMPANIES_SUCCESS:
    case GET_COMPANIES_ERROR:
      return getCompaniesReducer(state, action);
    case GET_COMPANY:
    case GET_COMPANY_SUCCESS:
    case GET_COMPANY_ERROR:
      return getCompanyReducer(state, action);
    case POST_COMPANY:
    case POST_COMPANY_SUCCESS:
    case POST_COMPANY_ERROR:
      return postCompanyReducer(state, action);
    case PUT_COMPANY:
    case PUT_COMPANY_SUCCESS:
    case PUT_COMPANY_ERROR:
      return putCompanyReducer(state, action);
    case DELETE_COMPANY:
      return {
        ...state,
        companies: {
          ...state.companies,
          loading: true,
          error: null,
        },
      };
    case DELETE_COMPANY_SUCCESS:
      const items = state.companies.data;
      const _id = parseInt(action.payload.param);
      const filterData = items.filter((item) => item.co_id !== _id);
      return {
        ...state,
        companies: {
          ...state.companies,
          loading: false,
          data: filterData,
          error: null,
        },
      };
    case DELETE_COMPANY_ERROR:
      return {
        ...state,
        companies: {
          ...state.companies,
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_COMPANY:
      return {
        ...state,
        company: {},
      };
    default:
      return state;
  }
}
