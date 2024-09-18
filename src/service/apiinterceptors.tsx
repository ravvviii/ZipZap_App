import { tokenStorage } from "@state/storage";
import axios from "axios";
import { Alert } from "react-native";
import { refresh_tokens } from "./authService";
import { BASE_URl } from "./config";







export const appAxios = axios.create({
    baseURL:BASE_URl
})




// Setup Axios interceptors to automatically set the Authorization header for outgoing requests
appAxios.interceptors.request.use(async config => {
    const accessToken = tokenStorage.getString('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Setup Axios interceptors to handle 401 Unauthorized responses by attempting to refresh the access token
appAxios.interceptors.response.use(response => response, async error => {
    if (error.response && error.response.status === 401) {
        try {
           
            const newAccessToken = await refresh_tokens(); 
            if (newAccessToken) {
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return appAxios(error.config); // Resend the request with the new token
            }
        } catch (refreshError) {
            console.log('ERROR REFRESHING TOKEN', refreshError);
        }
    }

    if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message || 'Something went wrong';
        Alert.alert(errorMessage);
    }

    return Promise.resolve(error);
});

