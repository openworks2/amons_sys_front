import * as monitorAPI from "../api/monitor";
import { createPromiseThunk, handleAsyncActions, reducerUtils } from "../lib/asyncUtils";


import io from "socket.io-client";   //모듈 가져오기

const socket = io.connect("http://192.168.0.39:3000");  //3000번 포트 사용(서버)


const GET_MONITOR = 'monitor/GET_MONITOR';
const GET_MONITOR_SUCCESS = 'monitor/GET_MONITOR_SUCCESS';
const GET_MONITOR_ERROR = 'monitor/GET_MONITOR_ERROR';

const GET_SCANNER = 'monitor/GET_SCANNER';
const GET_SCANNER_SUCCESS = 'monitor/GET_SCANNER_SUCCESS';
const GET_SCANNER_ERROR = 'monitor/GET_SCANNER_ERROR';
const GET_SCANNER_SOCKET = 'monitor/GET_SCANNER_SOCKET';

const GET_BLE_BEACON = 'monitor/GET_BLE_BEACON';
const GET_BLE_BEACON_SUCCESS = 'monitor/GET_BLE_BEACON_SUCCESS';
const GET_BLE_BEACON_ERROR = 'monitor/GET_BLE_BEACON__ERROR';

const GET_WEATHER = 'monitor/GET_WEATHER';
const GET_WEATHER_SUCCESS = 'monitor/GET_WEATHER_SUCCESS';
const GET_WEATHER_ERROR = 'monitor/GET_WEATHER_ERROR';



const RECEIVE_MONITOR = 'monitor/RECEIVE_MONITOR';

const TOGGLE_DRILLRATE_PANEL = 'monitor/TOGGLE_DRILLRATE_PANEL';

export const getMonitor = createPromiseThunk(
    GET_MONITOR,
    monitorAPI.getMonitor
)

export const getScanner = createPromiseThunk(
    GET_SCANNER,
    monitorAPI.getScanner
)
export const getBleBeacon = createPromiseThunk(
    GET_BLE_BEACON,
    monitorAPI.getBleBeacon
)


export const receiveMonitor = () => dispatch => {
    socket.emit('getData', 'scanner')
    socket.on('getData', (data) => {
        dispatch({ type: GET_SCANNER_SOCKET, payload: data })
    });
}


export const setRatePanel = () => dispatch => {
    dispatch({ type: TOGGLE_DRILLRATE_PANEL });
}

export const getWeather = createPromiseThunk(
    GET_WEATHER,
    monitorAPI.getWeather
)


const initialState = {
    monitor: reducerUtils.initial(),
    scanner: reducerUtils.initial(),
    beacon: reducerUtils.initial(),
    weather: reducerUtils.initial(),
    ratePanel: false
}

const getMonitorReducer = handleAsyncActions(
    GET_MONITOR,
    "monitor",
    true
)

const getScannerReducer = handleAsyncActions(
    GET_SCANNER,
    "scanner",
    true
)

const getBleBeaconReducer = handleAsyncActions(
    GET_SCANNER,
    "beacon",
    true
)

const getWeatherReducer = handleAsyncActions(
    GET_WEATHER,
    "weather",
    true
)

export default function monitor(state = initialState, action) {
    switch (action.type) {
        case GET_MONITOR:
        case GET_MONITOR_SUCCESS:
        case GET_MONITOR_ERROR:
            return getMonitorReducer(state, action)
        case GET_SCANNER:
        case GET_SCANNER_SUCCESS:
            return {
                ...state,
                scanner: {
                    ...state.scanner,
                    data: action.payload
                }
            }
        case GET_SCANNER_SOCKET:
            const { scanner, beacon } = action.payload;
            // console.log(s)
            const scannerList = Object.values(scanner);
            return {
                ...state,
                scanner: {
                    ...state.scanner,
                    data: scannerList
                },
                beacon: {
                    ...state.beacon,
                    data: beacon,
                }
            }
        case GET_SCANNER_ERROR:
            return getScannerReducer(state, action)
        case GET_BLE_BEACON:
            return {
                ...state,
                beacon: {
                    loading: true,
                    data: state.monitor.beacon ? state.monitor.beacon : null,
                    error: null
                }
            }
        case GET_BLE_BEACON_SUCCESS:
            return {
                ...state,
                beacon: {
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        case GET_BLE_BEACON_ERROR:
            return {
                ...state,
                beacon: {
                    loading: false,
                    data: state.monitor.beacon ? state.monitor.beacon : null,
                    error: action.error
                }
            }
        case GET_WEATHER:
        case GET_WEATHER_SUCCESS:
        case GET_WEATHER_ERROR:
            return getWeatherReducer(state, action);
        case TOGGLE_DRILLRATE_PANEL:
            return {
                ...state,
                ratePanel: !state.ratePanel
            };
        default:
            return state;

    }
}