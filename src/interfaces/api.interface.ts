export interface IApiError {
    message: string;
    success: boolean;
}

export interface IApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
}