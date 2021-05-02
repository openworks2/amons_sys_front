import axios from "axios";

// 포스트 목록을 가져오는 비동기 함수
export const getMonitor = async () => {
  const response = await axios.get("http://192.168.0.39:3000/api/monitor/monitors");
  return response.data;
};

