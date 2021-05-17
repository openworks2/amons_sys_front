import axios from "axios";
import { API } from "../lib/server.config";

//  SOS 알람 전체 조회
export const getAlarms = async () => {
  const response = await axios.get(`${API}/api/alarm/alarms`);
  return response.data;
};

// SOS 알람 검색
export const postAlarmSearch = async (data) => {
  const response = await axios.post(`${API}/api/alarm/alarms/search`, data);
  return response.data;
};

//SOS 알람 수정
export const putAlarm = async (index, data) => {
  const response = await axios.put(`${API}/api/alarm/alarms/${index}`, data);
  return response.data;
};

// //SOS 알람 다운로드
// export const getAlarmsDownload = async () => {
//   const response = await axios.get("/api/alarm/alarms/download");
//   return response.data;
// };
