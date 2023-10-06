import axios from "axios";


//const HOST_URL = "https://schoolsoftapp-3432013afef6.herokuapp.com";
//const HOST_URL = "https://reports.busiatrust.ac.ug";

const HOST_URL = "http://localhost:3001";


export const UPLOADS_URL = HOST_URL + "/useruploads/";


const axiosInstance = axios.create({
	baseURL: HOST_URL + "/api",
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
		if (error?.response?.status === 401) {
			localStorage.clear();
			window.location.href = '/';
		}
	},
);

export default axiosInstance;
