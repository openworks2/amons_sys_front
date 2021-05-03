import axios from "axios";

// 포스트 목록을 가져오는 비동기 함수
export const getAnnounces = async () => {
  const response = await axios.get("/api/announce/announces");
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getAnnounceById = async (index) => {
  const response = await axios.get(`/api/announce/announces/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postAnnounce = async (data) => {
  const response = await axios.post(`/api/announce/announces`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putAnnounce = async (index, data) => {
  const response = await axios.put(`/api/announce/announces/${index}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteAnnounce = async (id) => {
  const response = await axios.delete(`/api/announce/announces/${id}`);
  return response.data;
};
