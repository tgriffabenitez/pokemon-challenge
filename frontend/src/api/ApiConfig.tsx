import axios from 'axios';


const baseURL = 'http://localhost:3000';

const Api = axios.create({baseURL});

Api.interceptors.request.use(
    async(config: any) => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
);


export default Api;
