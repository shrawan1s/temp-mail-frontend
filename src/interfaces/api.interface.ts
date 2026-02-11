export interface IApiError {
    message: string;
    success: boolean;
}

export interface IApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
}
