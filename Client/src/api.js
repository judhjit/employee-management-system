import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
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
                const response = await api.post('/refresh');
                const { accessToken, ttl } = response.data;
                const date = new Date();
                const ttlNum = Number(ttl) * 1000;
                const expiry = date.getTime() + ttlNum;
                let user = JSON.parse(localStorage.getItem('user'));
                user.expiry = expiry;
                console.log("Refresh request sent", user);
                localStorage.setItem('token', accessToken);
                localStorage.setItem('user', JSON.stringify(user));

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (error) {
                console.error(error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                console.log('Redirecting to login page');
                // window.location.href = '/login';
                window.location.href = '/';
            }
        }

        if(error.response.status === 401 && !originalRequest._retry && error.response.data.message === 'Password is incorrect') {
            console.log("Password is incorrect");
            return Promise.reject(error);
        }

        if(error.response.status === 403) {
            console.log("Forbidden! Reuse of token detected");
            // window.location.href = '/';
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);


export default api;