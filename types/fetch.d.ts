
export interface FetchRequest {
    method: "GET" | "POST" | "PUT" | "DELETE" ,
    body?: Record<string, string | number | object> | string,
    headers?: Record<string, string>
}

export interface FetchParams extends FetchRequest {
    route: string,
}

export interface ZodError extends object {
    formErrors: string[],
    fieldErrors: Record<string, string[]>
}