import axios from "axios";

// 포스트 목록을 가져오는 비동기 함수
export const getAccounts = async () => {
  const response = await axios.get("/api/account/accounts");
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getAccountById = async (index) => {
  const response = await axios.get(`/api/account/accounts/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postAccount = async (data) => {
  const response = await axios.post(`/api/account/accounts`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putAccount = async (index, data) => {
  const response = await axios.put(`/api/account/accounts/${index}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteAccount = async (id) => {
  const response = await axios.delete(`/api/account/accounts/${id}`);
  return response.data;
};

// 중복확인
export const doubleCheckAccount = async (data) => {
  const response = await axios.post(`/api/account/doublecheck/`, data);
  return response.data;
};
