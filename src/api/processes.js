import axios from "axios";

// 포스트 목록을 가져오는 비동기 함수
export const getProcesses = async () => {
  const response = await axios.get("/api/process/processes");
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getProcessById = async (index) => {
  const response = await axios.get(`/api/process/processes/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postProcess = async (data) => {
  const response = await axios.post(`/api/process/processes`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putProcess = async (index, data) => {
  const response = await axios.put(`/api/process/processes/${index}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteProcess = async (id) => {
  const response = await axios.delete(`/api/process/processes/${id}`);
  return response.data;
};
