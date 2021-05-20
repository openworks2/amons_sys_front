import axios from "axios";
import { API } from "../lib/server.config";

// location 모니터링 정보
export const getMonitor = async () => {
  const response = await axios.get(`${API}/api/monitor/monitors`);
  return response.data;
};

// 스캐너 정보
export const getScanner = async () => {
  const response = await axios.get(`${API}/api/monitor/scanners`);
  return response.data;
};

// 날씨 정보 비동기 함수
export const getWeather = async () => {
  const response = await axios.get(`${API}/api/weather/weathers`);
  return response.data;
};

// ble beacon input 정보 
export const getBleBeacon = async () => {
  const response = await axios.get(`${API}/api/monitor/beacons`);
  return response.data;
};

// 대시보드 환경설정
export const getEnvironment = async () => {
  const response = await axios.get(`${API}/api/environment/environments`);
  return response.data;
};


