import { ZodError } from "@/types/fetch";

export class FetchError extends Error {
    recievedErrors?: ZodError;
    constructor(message: string | ZodError) {
        if (typeof message !== 'string') {
            super('Error at fetching data');
            this.recievedErrors = message;
        }
        else
            super(message); 

        this.name = 'FetchError';
        Object.setPrototypeOf(this, new.target.prototype); 
    }
}

export const testJSON = (input: string): Record<string, any> | string => {
    try {
        const object = JSON.parse(input);
        return object
    }
    catch (error) {
        return input;
    }
}