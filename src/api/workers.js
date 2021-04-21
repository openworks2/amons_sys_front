import axios from "axios";

// 포스트 목록을 가져오는 비동기 함수
export const getWorkers = async () => {
  const response = await axios.get("/api/worker/workers");
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getWorkerById = async (index) => {
  const response = await axios.get(`/api/worker/workers/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postWorker = async (data) => {
  const response = await axios.post(`/api/worker/workers`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putWorker = async (index, data) => {
  const response = await axios.put(`/api/worker/workers/${index}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteWorker = async (id) => {
  const response = await axios.delete(`/api/worker/workers/${id}`);
  return response.data;
};
