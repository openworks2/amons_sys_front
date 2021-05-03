import axios from "axios";

// 포스트 목록을 가져오는 비동기 함수
export const getDigs = async () => {
  const response = await axios.get("/api/dig/digs");
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getDigById = async (index) => {
  const response = await axios.get(`/api/dig/digs/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postDig = async (data) => {
  const response = await axios.post(`/api/dig/digs`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putDig = async (index, data) => {
  const response = await axios.put(`/api/dig/digs/${index}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteDig = async (id) => {
  const response = await axios.delete(`/api/dig/digs/${id}`);
  return response.data;
};
