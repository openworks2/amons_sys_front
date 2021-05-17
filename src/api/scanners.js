import axios from "axios";
import { API } from "../lib/server.config";

// 포스트 목록을 가져오는 비동기 함수
export const getScanners = async () => {
  const response = await axios.get(`${API}/api/scanner/scanners`);
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getScannerById = async (index) => {
  const response = await axios.get(`${API}/api/scanner/scanners/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postScanner = async (data) => {
  const response = await axios.post(`${API}/api/scanner/scanners`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putScanner = async (index, data) => {
  const response = await axios.put(
    `${API}/api/scanner/scanners/${index}`,
    data
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteScanner = async (id) => {
  const response = await axios.delete(`${API}/api/scanner/scanners/${id}`);
  return response.data;
};
