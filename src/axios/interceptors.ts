import axios, {InternalAxiosRequestConfig} from 'axios';
import {store} from '../redux/store';


axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {

    const loginRequestUrl = "http://localhost:9000/login";

    if(config.url !== loginRequestUrl && config.url?.startsWith("http://localhost:9000/")){
        const reduxState = store.getState();
        config.headers.Authorization = `Bearer ${reduxState.auth.accessToken}`;
    }
    return config;

})

