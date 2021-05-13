import axios from "axios";
import { API } from "../lib/server.config";


export const loginAccount = async (data) => {
  const response = await axios.post(`${API}/api/account/login`, data, { withCredentials: true });
  return response.data;
};
// LOGOUT POST 비동기 함수
export const logoutAccount = async () => {
  const response = await axios.get(`${API}/api/account/logout`, { withCredentials: true });
  return response.data;
};
// 현재 서버에서 로그인 중인지 검증(서버측에 세션이 존재하는지 확인)
export const checkStatus = async () => {
  const response = await axios.get(`${API}/api/account/check`, { withCredentials: true });
  return response.data;
}
export const duplicationLogout = async (data) => {
  const response = await axios.post(`${API}/api/account/duplicate/logout`, data);
  return response.data;
}

export const doubleCheckAccout = async (data) => {
  const response = await axios.post(`${API}/api/account/doubleCheck`, data);
  return response.data;
}