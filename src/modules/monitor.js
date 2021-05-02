import * as monitorAPI from "../api/monitor";
import { createPromiseThunk, handleAsyncActions, reducerUtils } from "../lib/asyncUtils";


import io from "socket.io-client";   //모듈 가져오기

const socket = io.connect("http://192.168.0.39:3000");  //3000번 포트 사용(서버)


const GET_MONITOR = 'monitor/GET_MONITOR';
const GET_MONITOR_SUCCESS = 'monitor/GET_MONITOR_SUCCESS';
const GET_MONITOR_ERROR = 'monitor/GET_MONITOR_ERROR';

const RECEIVE_MONITOR ='monitor/RECEIVE_MONITOR';

export const getMonitor = createPromiseThunk(
    GET_MONITOR,
    monitorAPI.getMonitor
)

export const receiveMonitor = ()=> dispatch => {
  dispatch({type: RECEIVE_MONITOR})
}


const initialState = {
    monitor: reducerUtils.initial(),
    data: {},
}

const getMonitorReducer = handleAsyncActions(
    GET_MONITOR,
    "monitor",
    true
)

export default function monitor(state = initialState, action) {
    switch (action.type) {
        case GET_MONITOR:
        case GET_MONITOR_SUCCESS:
        case GET_MONITOR_ERROR:
            return getMonitorReducer(state, action)
        case RECEIVE_MONITOR:

            socket.on('receive',data=>{
                console.log('>>>>>>>>>>>>@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>>>>>>>>>>>>>>')
                console.log(data)
            })
            return state;
        default:
            return state;

    }
}