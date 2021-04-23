import axios from "axios";

// 포스트 목록을 가져오는 비동기 함수
export const getVehicles = async () => {
  const response = await axios.get("/api/vehicle/vehicles");
  return response.data;
};

// INDEX로 조회하는 비동기 함수
export const getVehicleById = async (index) => {
  const response = await axios.get(`/api/vehicle/vehicles/${index}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postVehicle = async (data) => {
  const response = await axios.post(`/api/vehicle/vehicles`, data);
  return response.data;
};

// 데이터 수정을 위한 put 비동기 함수
export const putVehicle = async (index, data) => {
  const response = await axios.put(`/api/vehicle/vehicles/${index}`, data);
  return response.data;
};

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteVehicle = async (id) => {
  const response = await axios.delete(`/api/vehicle/vehicles/${id}`);
  return response.data;
};
