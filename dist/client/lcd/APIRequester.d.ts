export interface APIResponse<T> {
    height: string;
    result: T;
}
export declare class APIRequester {
    private axios;
    constructor(baseURL: string);
    getRaw<T>(endpoint: string, params?: any): Promise<T>;
    get<T>(endpoint: string, params?: any): Promise<APIResponse<T>>;
    postRaw<T>(endpoint: string, data?: any): Promise<T>;
    post<T>(endpoint: string, data?: any): Promise<APIResponse<T>>;
}
