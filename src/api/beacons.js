import axios from "axios";
import { API } from "../lib/server.config";

// 포스트 목록을 가져오는 비동기 함수
export const getBeacons = async () => {
  const response = await axios.get(`${API}/api/beacon/beacons`);
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getBeaconById = async (index) => {
  const response = await axios.get(`${API}/api/beacon/beacons/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postBeacon = async (data) => {
  const response = await axios.post(`${API}/api/beacon/beacons`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putBeacon = async (index, data) => {
  const response = await axios.put(`${API}/api/beacon/beacons/${index}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteBeacon = async (id) => {
  const response = await axios.delete(`${API}/api/beacon/beacons/${id}`);
  return response.data;
};

// 미사용 비콘 조회를 위한 get 비동기 함수
export const getUnUsedBeacons = async () => {
  const response = await axios.get("/api/beacon/unused");
  return response.data;
};
