import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://school-app-gvvr.onrender.com/api",
});

const requestHandler = (request) => {
	request.headers.Authorization = `Bearer ${localStorage.getItem('schoolSoftToken')}`;

	return request;
}
const errorHandler = (error) => Promise.reject(error);

axiosInstance.interceptors.request.use(
	(request) => requestHandler(request),

	(error) => errorHandler(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,

	(error) => {
		if (error.response.status === 401) {
			localStorage.clear();
			window.location.href = '/';
		}
	},
);

export default axiosInstance;
