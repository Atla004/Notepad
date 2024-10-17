import {config as dotenv} from 'dotenv';
import { fetchData } from './localstorage';
import { FetchParams, FetchRequest } from '@/types/fetch';

dotenv();

const backendUrl = process.env.BACKEND_URL as string;

export const wrappedFetch = async (params: FetchParams) => {
    try {
        const {route, method, body, headers} = params;
        
        const url = `${backendUrl}${route}`;
        const request: FetchRequest = { method };
        if (body)
            request.body = JSON.stringify(body);

        if (headers)
            request.headers = headers;

        return await fetch(url, request as object);
    }
    catch (error) {
        throw new Error(`Failed to fetch: ${(error as Error).message}`)
    }
}

export const authorizedWrappedFetch = async (params: FetchParams) => {
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