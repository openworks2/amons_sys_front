import axios from "axios";

// 작업자
//  SOS 알람 전체 조회
export const getBleWorkers = async () => {
  const response = await axios.get("/api/ble/bles/worker");
  return response.data;
};

// SOS 알람 검색
export const postBleWorkersSearch = async (data) => {
  const response = await axios.post(`/api/ble/bles/worker/search`, data);
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
  const response = await axios.get("/api/ble/bles/vehicle");
  return response.data;
};

// SOS 알람 검색
export const postBleVehiclesSearch = async (data) => {
  const response = await axios.post(`/api/ble/bles/vehicle/search`, data);
  return response.data;
};

// //SOS 알람 다운로드
// export const postBleVehiclesDownload = async (data) => {
//   const response = await axios.get("/api/ble/bles/vehicle/download", data);
//   return response.data;
// };
