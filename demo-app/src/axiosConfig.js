
import axios from 'axios';
export const axiosConfig = axios.create({
    baseURL: 'http://localhost:3001/users/',
    timeout: 10000,
    params: {},
    headers: { 'Content-Type': 'application/json' }
});
const errorResponseHandler = (error) => {
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
};
axiosConfig.interceptors.response.use(
    response => response,
    errorResponseHandler
);
