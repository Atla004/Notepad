import { wrappedFetch } from "@/services/fetch"
import { storeData } from "@/services/localstorage";

// TODO: Better error handling

export const login = async (userData: {username: string, password: string}) => {
    try {
        const response = await wrappedFetch({
            route: '/auth/login',
            method: "POST",
            body: userData
        });
        if (response.status !== 200)
            throw new Error(`code ${response.status} at login`)

        const {user, token} = await response.json();
        await storeData('jwtoken', token);
        return user;
    }
    catch (error) {
        throw new Error(`Failed to fetch user: ${(error as Error).message}`)
    }
}

export const register = async (userData: {username: string, email: string, password: string}) => {
    try {
        const response = await wrappedFetch({
            route: '/auth/register',
            method: "POST",
            body: userData
        });
        if (response.status !== 200)
            throw new Error(`code ${response.status} at register`);
        
        const {username, password} = userData;
        return await login({username, password});
    }
    catch (error) {
        throw new Error(`Failed to register user: ${(error as Error).message}`)
    }
};

export const getPasswordToken = async (email: string) => {
    try {
        const response = await wrappedFetch({
            route: '/auth/send-reset-token',
            method: "POST",
            body: { email }
        });
        if (response.status !== 200)
            throw new Error(`code ${response.status} at login`)

        
    }
    catch (error) {

    }
};

export const changePassword = async (data: {email: string, newPassword: string, token: string}) => {
    try {

    }
    catch (error) {

    }
}