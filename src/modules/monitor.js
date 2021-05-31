import * as monitorAPI from "../api/monitor";
import { createPromiseThunk, handleAsyncActions, reducerUtils } from "../lib/asyncUtils";


import io from "socket.io-client";   //모듈 가져오기
import { API } from '../lib/server.config'


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

const GET_ENVIRONMENT = 'monitor/GET_ENVIRONMENT';
const GET_ENVIRONMENT_SUCCESS = 'monitor/GET_ENVIRONMENT_SUCCESS';
const GET_ENVIRONMENT_ERROR = 'monitor/GET_ENVIRONMENT_ERROR';


const RECEIVE_MONITOR = 'monitor/RECEIVE_MONITOR';

const TOGGLE_DRILLRATE_PANEL = 'monitor/TOGGLE_DRILLRATE_PANEL';

const TOGGLE_CAMERA_REPOSITION = 'monitor/TOGGLE_CAMERA_REPOSITION'


const CLOSED_ALARM_PANEL = 'monitor/CLOSED_ALARM_PANEL';
const SET_SOS_SITUACTION = 'monitor/SET_SOS_SITUACTION';
const INIT_SOS_SITUACTION = 'moniotr/INIT_SOS_SITUACTION'

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

let socket;
export const receiveMonitor = () => dispatch => {
    if (!socket) {
        socket = io.connect(API);  //3000번 포트 사용(서버)
        socket.emit('getData', 'scanner')
        socket.on('getData', (data) => {
            const filterAlarm = data.beacon.filter(item => item.bc_emergency === 2 && item.wk_id && item);
            if (filterAlarm.length > 0) {
                const payload = {
                    sosSituation: true,
                    sosList: filterAlarm
                }
                dispatch({ type: SET_SOS_SITUACTION, payload });
            }
            dispatch({ type: GET_SCANNER_SOCKET, payload: data })
        });
    }
}

export const socketDisconnet = () => dispatch => {
    socket.disconnect();
}

export const setRatePanel = () => dispatch => {
    dispatch({ type: TOGGLE_DRILLRATE_PANEL });
}

export const setSOSSituation = boolean => dispatch => {
    dispatch({ type: SET_SOS_SITUACTION, payload: boolean });
}

export const setInitSOSSituation = () => dispatch => {
    dispatch({ type: INIT_SOS_SITUACTION });
}

export const getWeather = createPromiseThunk(
    GET_WEATHER,
    monitorAPI.getWeather
)

export const getEnvironment = createPromiseThunk(
    GET_ENVIRONMENT,
    monitorAPI.getEnvironment
)
export const closeAlarmPanel = () => dispatch => {
    dispatch({ type: CLOSED_ALARM_PANEL });
}

export const toggleCameraReposition = () => dispatch => {
    dispatch({ type: TOGGLE_CAMERA_REPOSITION });
    setTimeout(() => {
        dispatch({ type: TOGGLE_CAMERA_REPOSITION });
    }, 500);
}

const initialState = {
    monitor: reducerUtils.initial(),
    scanner: reducerUtils.initial(),
    beacon: reducerUtils.initial(),
    weather: reducerUtils.initial(),
    environment: reducerUtils.initial(),
    ratePanel: false,
    alarmPanel: false,
    sosSituation: false,
    sosList: [],
    repositionAction: false
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

const getEnvironmentReducer = handleAsyncActions(
    GET_ENVIRONMENT,
    "environment",
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
        case GET_ENVIRONMENT:
        case GET_ENVIRONMENT_SUCCESS:
        case GET_ENVIRONMENT_ERROR:
            return getEnvironmentReducer(state, action);
        case TOGGLE_DRILLRATE_PANEL:
            return {
                ...state,
                ratePanel: !state.ratePanel
            };
        case SET_SOS_SITUACTION:
            const actionList = action.payload.sosList;
            const stateList = state.sosList;
            let tempList=[
                ...actionList,
                ...stateList
            ];
            const temp = tempList.reduce(function (acc, current) {
                if (acc.findIndex(({ bc_index }) => bc_index === current.bc_index) === -1) {
                  acc.push(current);
                }
                return acc;
              }, []);
            
            return {
                ...state,
                alarmPanel: true,
                sosSituation: action.payload.sosSituation,
                sosList: temp
            };
        case INIT_SOS_SITUACTION:
            return {
                ...state,
                alarmPanel: state.alarmPanel ? !state.alarmPanel : state.alarmPanel,
                sosSituation: false,
                sosList: []
            };
        case CLOSED_ALARM_PANEL:
            return {
                ...state,
                alarmPanel: false,
            }
        case TOGGLE_CAMERA_REPOSITION:
            return {
                ...state,
                repositionAction: !state.repositionAction
            }
        default:
            return state;

    }
}