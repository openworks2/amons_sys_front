import axios from "axios";
import { API } from "../lib/server.config";

// 작업자
//  SOS 알람 전체 조회
export const getBleWorkers = async () => {
  const response = await axios.get(`${API}/api/ble/bles/worker`);
  return response.data;
};

// SOS 알람 검색
export const postBleWorkersSearch = async (data) => {
  const response = await axios.post(`${API}/api/ble/bles/worker/search`, data);
  return response.data;
};

// //SOS 알람 다운로드
// export const postBleWorkerDownload = async (data) => {
//   const response = await axios.get("/api/ble/bles/worker/download", data);
//   return response.data;
// };

// 차량
//  SOS 알람 전체 조회
export const getBleVehicles = async () => {
  const response = await axios.get(`${API}/api/ble/bles/vehicle`);
  return response.data;
};

// SOS 알람 검색
export const postBleVehiclesSearch = async (data) => {
  const response = await axios.post(`${API}/api/ble/bles/vehicle/search`, data);
  return response.data;
};

// //SOS 알람 다운로드
// export const postBleVehiclesDownload = async (data) => {
//   const response = await axios.get("/api/ble/bles/vehicle/download", data);
//   return response.data;
// };

// 현재 잔류 인원 조회
export const getRemainWorkers = async () => {
  const response = await axios.get(`${API}/api/ble/bles/input/worker`);
  return response.data;
};

// 현재 잔류 차량 조회
export const getRemainVehicles = async () => {
  const response = await axios.get(`${API}/api/ble/bles/input/vehicle`);
  return response.data;
};

// 현재 잔류 작업자 조건 조회
export const postRemainWorkerSearch = async (data) => {
  const response = await axios.post(`/api/ble/bles/input/worker/search`, data);
  return response.data;
};

// 현재 잔류 차량 조건 조회
export const postRemainVehiclesSearch = async (data) => {
  const response = await axios.post(
    `${API}/api/ble/bles/input/vehicle/search`,
    data
  );
  return response.data;
};

// // 현재 잔류 작업자/차량 강제 퇴출
// export const postKickout = async (bc_index) => {
//   const response = await axios.post(`/api/ble/bles/out/${bc_index}`);
//   return response.data;
// };
