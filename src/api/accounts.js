import axios from "axios";
import { API } from "../lib/server.config";

// 포스트 목록을 가져오는 비동기 함수
export const getAccounts = async () => {
  const response = await axios.get(`${API}/api/account/accounts`);
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getAccountById = async (index) => {
  const response = await axios.get(`${API}/api/account/accounts/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postAccount = async (data) => {
  const response = await axios.post(`${API}/api/account/accounts`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putAccount = async (index, data) => {
  const response = await axios.put(
    `${API}/api/account/accounts/${index}`,
    data
  );
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteAccount = async (id) => {
  const response = await axios.delete(`${API}/api/account/accounts/${id}`);
  return response.data;
};

//로그인 기록 조회
export const getLoginRecords = async () => {
  const response = await axios.get(`${API}/api/account/login/record`);
  return response.data;
};

//로그인 기록 검색 - 기간 조건 검색
export const postLoginRecordsSearch = async (data) => {
  const response = await axios.post(
    `${API}/api/account/login/record/search`,
    data
  );
  return response.data;
};


