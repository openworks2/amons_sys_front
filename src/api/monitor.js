import axios from "axios";

// location 모니터링 정보
export const getMonitor = async () => {
  const response = await axios.get("http://192.168.0.39:3000/api/monitor/monitors");
  return response.data;
};

// 스캐너 정보
export const getScanner = async () => {
  const response = await axios.get("http://192.168.0.39:3000/api/monitor/scanners");
  return response.data;
};

// 날씨 정보 비동기 함수
export const getWeather = async () => {
  const response = await axios.get("http://192.168.0.39:3000/api/weather/weathers");
  return response.data;
};

// ble beacon input 정보 
export const getBleBeacon = async () => {
  const response = await axios.get("http://192.168.0.39:3000/api/monitor/beacons");
  return response.data;
};

// 대시보드 환경설정
export const getEnvironment = async () => {
  const response = await axios.get("http://192.168.0.39:3000/api/environment/environments");
  return response.data;
};


