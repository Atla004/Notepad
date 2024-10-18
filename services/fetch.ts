import Config from 'react-native-config';
import { fetchData } from './localstorage';
import { FetchParams } from '@/types/fetch';

const backendUrl = Config.BACKEND_URL as string;

export const wrappedFetch = async (params: FetchParams) => {
    try {
        const {route, method, body, headers} = params;
        
        const url = `${backendUrl}${route}`;
        const request: RequestInit = { method };
        if (body)
            request.body = JSON.stringify(body);

        if (headers)
            request.headers = headers;

        return await fetch(url, request);
    }
    catch (error) {
        throw new Error(`Failed to fetch data`)
    }
}

export const authorizedWrappedFetch = async (params: FetchParams) => {
    try {
        const token = await fetchData('jwtoken');
        
        const newParams: FetchParams = {
            route: params.route,
            method: params.method,
            headers: {
                ...params.headers,
                Autorization: `Bearer ${token}`
            },
        } 
        if (params.body) 
            newParams.body = params.body;
        
        return await wrappedFetch(newParams);
    }
    catch (error) {
        throw new Error('Please login')
    }
}