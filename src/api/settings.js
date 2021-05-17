import axios from "axios";
import { API } from "../lib/server.config";

// 포스트 목록을 가져오는 비동기 함수
export const getSettings = async () => {
  const response = await axios.get(`${API}/api/environment/environments`);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putSettings = async (index, data) => {
  const response = await axios.put(
    `${API}/api/environment/environments/${index}`,
    data
  );
  return response.data;
};
