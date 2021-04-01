import axios from 'axios';

// 포스트 목록을 가져오는 비동기 함수
export const getCompanies = async () => {
    const response = await axios.get('/api/company/companies');
    return response.data;
}

// INDEX로 조회하는 비동기 함수
export const getCompanyById = async (index) => {
    const response = await axios.get(`/api/company/companies/${index}`);
    return response.data;
}

// 데이터 추가를 위한 POST 비동기 함수
export const postCompany = async (data) => {
    const response = await axios.post(`/api/company/companies`, data);
    return response.data;
}

// 데이터 수정를 위한 put 비동기 함수
export const putCompany = async (id, data) => {
    const response = await axios.put(`/api/company/companies/${id}`, data);
    return response.data;
}

// ID로 데이터 삭제를 위한 DELTE 비동기 함수
export const deleteCompany = async (id) => {
    const response = await axios.delete(`/api/company/companies/${id}`);
    return response.data;
}
