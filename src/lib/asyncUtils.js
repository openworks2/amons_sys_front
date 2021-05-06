/**
 * @description 전체 조회 Thunck 생성 함수
 */
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  console.log("type---->", type);
  return (param) => async (dispatch) => {
    dispatch({ type });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true, //FSA 규칙
      });
    }
  };
};

/**
 * @description 인덱스 조회 Thunck 생성 함수
 */
// idSelector -> API 호출할 떄 사용하는 파라미터리에서 ID 선택 방법 예>> id 외 다른 값도 객체 형태롤 받아올 수 있는 상황 대비 {id,option}
const defaultIdSelector = (param) => param; // idSelector 기본값 셋팅
export const createPromiseThunkById = (
  type,
  promiseCreator,
  idSelector = defaultIdSelector
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    const id = idSelector(param);
    dispatch({ type, meta: id });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true, //FSA 규칙
        meta: id,
      });
    }
  };
};
/**
 * @description Item 등록 Thunck 생성함수
 */
export const createPromiseThunkOfPost = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (data) => async (dispatch) => {
    // 요청시작
    dispatch({ type });
    // API 호출
    try {
      // 성공했을 때
      const payload = await promiseCreator(data);
      dispatch({ type: SUCCESS, payload });
    } catch (e) {
      // 실패했을 때
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

/**
 * @description Item 수정 Thunck 생성함수
 */
export const createPromiseThunkOfPut = (
  type,
  promiseCreator,
  idSelector = defaultIdSelector
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param, data) => async (dispatch) => {
    console.log("data-->", data);
    const id = idSelector(param);
    dispatch({ type, meta: id });
    try {
      const payload = await promiseCreator(param, data);
      console.log("id-->", id);
      console.log("payload-->", payload);
      console.log("SUCCESS-->", payload);
      dispatch({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true, //FSA 규칙
        meta: id,
      });
    }
  };
};

/**
 * @description 전체조회- 리듀서
 */
export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

/**
 * @description 인덱스 조회- 리듀서
 */
export const handleAsyncActionsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              keepData ? state[key][id] && state[key][id].data : null
            ),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload),
          },
        };
      default:
        return state;
    }
  };
};

/**
 * @description Item 등록- 리듀서
 */
export const handleAsyncActionsOfPost = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  const reducer = (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            loading: false,
            data: state[key].data.concat(action.payload),
            error: null,
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            loading: false,
            data: keepData ? state[key].data : null,
            error: null,
          },
        };
      default:
        return state;
    }
  };
  return reducer;
};

/**
 * @description Item 등록 최신 최상단으로 - 리듀서
 */
export const handleAsyncActionsOfPostOrderByTime = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  const reducer = (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        let newArray = [action.payload].concat(state[key].data);
        function date_descending(a, b) {
          var dateA = new Date(a["created_date"]).getTime();
          var dateB = new Date(b["created_date"]).getTime();
          return dateA < dateB ? 1 : -1;
        }
        newArray = newArray.sort(date_descending);
        return {
          ...state,
          [key]: {
            loading: false,
            data: newArray,
            error: null,
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            loading: false,
            data: keepData ? state[key].data : null,
            error: null,
          },
        };
      default:
        return state;
    }
  };
  return reducer;
};

/**
 * @description Item 수정- 리듀서
 */
export const handleAsyncActionsOfPut = (type, key, index, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  console.log("PUT!!!");

  console.log(">>>>>>>>>>key->", key);
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        console.log("state->", state);
        console.log("payload->", action.payload);
        return {
          ...state,
          [key]: {
            loading: false,
            data: state[key].data.map((item) => {
              return item[index] === action.payload[index]
                ? action.payload
                : item;
            }),
            error: null,
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            loading: false,
            data: keepData ? state[key].data : null,
            error: null,
          },
        };
      default:
        return state;
    }
  };
};

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};
