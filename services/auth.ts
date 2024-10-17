import { wrappedFetch } from "@/services/fetch"
import { storeData, storeExpiringData } from "@/services/localstorage";
import { FetchError } from "./utils";
import {config as dotenv} from 'dotenv'

dotenv();

export const login = async (userData: {username: string, password: string}) => {
    try {
        const response = await wrappedFetch({
            route: '/auth/login',
            method: "POST",
            body: userData
        });
        if (response.status !== 200) {
            const errors = await response.json()
            throw new FetchError(errors.error);
        }

        const {user, token} = await response.json();
        await storeExpiringData('jwtoken', token, Number(process.env.JWTOKEN_EXPIRATION_DAYS as string) * 24);
        return user;
    }
    catch (error) {
        throw new Error(`Failed to fetch user: ${(error as Error).message}`)
    }
}

export const register = async (userData: {username: string, email: string, password: string}) => {
    const response = await wrappedFetch({
        route: '/auth/register',
        method: "POST",
        body: userData
    });
    if (response.status !== 200) {
        const errors = await response.json()
        throw new FetchError(errors.error);
    }
    
    const {username, password} = userData;
    return await login({username, password});  
};

export const getPasswordToken = async (email: string) => {
    const response = await wrappedFetch({
        route: '/auth/send-reset-token',
        method: "POST",
        body: { email }
    });
    if (response.status !== 200) {
        const errors = await response.json()
        throw new FetchError(errors.error);
    }

    return;
};

export const changePassword = async (newPasswordData: {email: string, newPassword: string, token: string}) => {
    const response = await wrappedFetch({
        route: '/auth/reset-password',
        method: "PUT",
        body: newPasswordData
    });
    if (response.status !== 200) {
        const errors = await response.json()
        throw new FetchError(errors.error);
    };

}

export const logout = async () => {

}