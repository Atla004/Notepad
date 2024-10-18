
export interface FetchRequest {
    method: "GET" | "POST" | "PUT" | "DELETE" ,
    body?: any,
    headers?: Record<string, string>
}

export interface FetchParams extends FetchRequest {
    route: string,
}

export interface ZodError extends object {
    formErrors: string[],
    fieldErrors: Record<string, string[]>
}