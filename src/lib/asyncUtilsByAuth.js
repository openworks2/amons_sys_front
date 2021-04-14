import storage from "../lib/starage";

//*** LOGIN ASYNC UTILS *** */
// thunk 생성 함수 리팩토링
export const createPromiseThunkByLogin = (type, promiseCreator) => {
    const [SUCCESS, ERROR, FAIL] = [
        `${type}_SUCCESS`,
        `${type}_ERROR`,
        `${type}_FAIL`,
    ];

    const thunkCreator = (param) => async (dispatch, getState) => {
        // 요청시작
        dispatch({ type });
        try {
            // API 호출
            const payload = await promiseCreator(param);
            // Account 인증 성공했을 때
            if (payload.validated) {
                storage.set("user", payload.data);
                dispatch({
                    type: SUCCESS,
                    payload,
                });
            } else {
                // Account 인증 실패 했을 때
                storage.remove("user");
                dispatch({
                    type: FAIL,
                    payload,
                });
            }
        } catch (e) {
            // API 요청 실패 했을 때
            dispatch({
                type: ERROR,
                payload: e,
                error: true, // FSA(Flux Standard Action) 규칙
            });
        }
    };
    return thunkCreator;
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActionsByLogin = (type, key, keepData) => {
    const [SUCCESS, ERROR, FAIL] = [
        `${type}_SUCCESS`,
        `${type}_ERROR`,
        `${type}_FAIL`,
    ];
    const reducer = (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.loading(keepData ? state[key].data : null),
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.success(action.payload),
                };
            case FAIL:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.fail(action.payload),
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.error(action.payload),
                };
            default:
                return state;
        }
    };
    return reducer;
};
//******************************************** END LOGIN ASYNCUTILS *** */

//*** LOGOUT ASYNC UTILS *** */
export const createPromiseThunkByLogOut = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    const thunkCreator = (param) => async (dispatch, getState) => {
        // 요청시작
        dispatch({ type });
        try {
            // API 호출
            const payload = await promiseCreator(param);
            // Account 인증 성공했을 때
            storage.remove("user");
            dispatch({
                type: SUCCESS,
                payload,
            });
        } catch (e) {
            // API 요청 실패 했을 때
            dispatch({
                type: ERROR,
                payload: e,
                error: true, // FSA(Flux Standard Action) 규칙
            });
        }
    };
    return thunkCreator;
};

export const handleAsyncActionsByLogOut = (type, key, keepData) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    const reducer = (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.loading(keepData ? state[key].data : null),
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.initial(),
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.error(action.payload),
                };
            default:
                return state;
        }
    };
    return reducer;
};
//******************************************** END LOGOUT ASYNCUTILS *** */

//*** LOGIN CHECk ASYNCUTILS *** */
export const createPromiseThunkByLoginCheck = (type, promiseCreator) => {
    const [SUCCESS, ERROR, LOGOUT] = [
        `${type}_SUCCESS`,
        `${type}_ERROR`,
        `${type}_LOGOUT`,
    ];
    const thunkCreator = () => async (dispatch, getState) => {
        // 요청시작
        dispatch({ type });
        try {
            // API 호출
            const payload = await promiseCreator();
            // 서버에서 로그인 상태
            const data = storage.get("user");
            if (payload.validated) {
                dispatch({
                    type: SUCCESS,
                    data,
                });
            } else {
                storage.remove("user");
                dispatch({
                    type: LOGOUT,
                });
            }
        } catch (e) {
            // API 요청 실패 했을 때
            dispatch({
                type: ERROR,
                payload: e,
                error: true, // FSA(Flux Standard Action) 규칙
            });
        }
    };
    return thunkCreator;
};

export const handleAsyncActionsByLoginCheck = (type, key, keepData) => {
    const [SUCCESS, ERROR, LOGOUT] = [
        `${type}_SUCCESS`,
        `${type}_ERROR`,
        `${type}_LOGOUT`,
    ];

    const reducer = (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.loading(keepData ? state[key] : null),
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.success(action.data),
                };
            case LOGOUT:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.initial(),
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtilsByAuth.error(action.payload),
                };
            default:
                return state;
        }
    };
    return reducer;
};

//******************************************** END LOGIN CHECk ASYNCUTILS *** */

// 초기값 리팩토링
export const reducerUtilsByAuth = {
    initial: (initialData = null) => ({
        loading: false,
        data: null,
        error: null,
        logined: false, // 현재 로그인 중인지 알려준다.
        validated: false, // 현재 로그인 중인지 아닌지 한번 서버측에 검증했음을 의미
        failMsg: null, // 로그인 실패 에러 메세지
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState ? prevState.data : false,
        error: null,
        logined: prevState ? prevState.logined : false,
        validated: prevState ? prevState.validated : false,
        failMsg: null,
    }),
    success: (data) => ({
        loading: false,
        data,
        error: null,
        logined: true,
        validated: true,
        failMsg: null,
    }),
    fail: (failMsg) => ({
        loading: false,
        data: null,
        error: null,
        logined: false,
        validated: false,
        failMsg,
    }),
    error: (error) => ({
        loading: false,
        data: null,
        error,
        logined: false,
        validated: false,
        failMsg: null,
    }),
};