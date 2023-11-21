import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
        config.headers['Content-Type'] = 'application/json';
        config.headers['WithCredentials'] = 'true';
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(error.response);
        
        // If the error status is 401 and there is no originalRequest._retry flag,
        // and the error message is not 'Password is incorrect'
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry && error.response.data.message !== 'Password is incorrect') {
            originalRequest._retry = true;

            try {
                const response = await axios.post('/refresh');
                const { accessToken } = response.data;

                localStorage.setItem('token', accessToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (error) {
                console.error(error);
                console.log('Redirecting to login page');
                window.location.href = '/login';
                // window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);


export default api;