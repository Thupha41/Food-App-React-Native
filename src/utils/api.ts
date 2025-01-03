import axios from "@/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const registerAPI = (email: string, password: string, name: string) => {
    const url = `/api/v1/auth/register`;
    return axios.post<IBackendRes<IRegister>>(url, {
        email, password, name
    })
}

export const verifyCodeAPI = (email: string, code: string) => {
    const url = `/api/v1/auth/verify-code`;
    return axios.post<IBackendRes<IRegister>>(url, {
        email, code
    })
}

export const resendCodeAPI = (email: string) => {
    const url = `/api/v1/auth/verify-email`;
    return axios.post<IBackendRes<IRegister>>(url, {
        email
    })
}

export const loginApi = (email: string, password: string) => {
    const url = `/api/v1/auth/login`;
    return axios.post<IBackendRes<IUserLogin>>(url, {
        username: email, password
    })
}

export const getAccountApi = () => {
    const url = `/api/v1/auth/account`;
    return axios.get<IBackendRes<IUserLogin>>(url)
}

export const getURLBaseBackend = () => {
    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    return backend;
}

export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStorage: any = {}
            stores?.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1]
            });
            console.log(JSON.stringify(asyncStorage, null, 2));
        });
    });
};
