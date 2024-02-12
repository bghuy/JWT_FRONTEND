// import axios from 'axios';
import axios from '../setup/axios';
const registerNewUser = async (userData) => {
    console.log("userData", userData);
    const data = await axios.post('/api/v1/user/create', { ...userData });
    console.log(data);
    return data;
}
const login = async (loginData) => {
    const data = await axios.post('/api/v1/user/login', loginData);
    return data;
}
const fetchAllUsers = async (page, limit) => {
    const data = await axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
    return data;
}
const deleteUser = async (user) => {
    const data = await axios.delete(`/api/v1/user/delete`, { data: { id: user.id } });
    return data;
}
const getGroup = async () => {
    const data = await axios.get(`/api/v1/group/read`);
    return data;
}
const updateUser = async (user) => {
    console.log("check user>> ", user);
    const data = await axios.put(`/api/v1/user/update`, user);
    return data;
}
const getUserAccount = async () => {
    const data = await axios.get(`/api/v1/account`);
    return data;
}
const logout = async () => {
    const data = await axios.post('/api/v1/user/logout');
    return data;
}
export { registerNewUser, login, fetchAllUsers, deleteUser, getGroup, updateUser, getUserAccount, logout };