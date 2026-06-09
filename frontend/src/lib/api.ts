import { create, isAxiosError, type AxiosRequestConfig } from "axios";

export const axiosInstance = create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiError";
    }
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const extractError = (error: unknown, fallback = "Something went wrong"): string => {
    if (error instanceof ApiError) {
        return error.message;
    }

    if (isAxiosError(error)) {
        return error.response?.data?.message ?? fallback;
    }

    return fallback;
};

export const api = {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await axiosInstance.get<ApiResponse<T>>(url, config);

            if (!data.success) {
                throw new ApiError(data.message);
            }

            return data.data;
        } catch (error) {
            throw new ApiError(extractError(error));
        }
    },

    async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await axiosInstance.post<ApiResponse<T>>(url, body, config);

            if (!data.success) {
                throw new ApiError(data.message);
            }

            return data.data;
        } catch (error) {
            throw new ApiError(extractError(error));
        }
    },

    async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await axiosInstance.put<ApiResponse<T>>(url, body, config);

            if (!data.success) {
                throw new ApiError(data.message);
            }

            return data.data
        } catch (error) {
            throw new ApiError(extractError(error));
        }
    },

    async patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await axiosInstance.patch<ApiResponse<T>>(url, body, config);

            if (!data.success) {
                throw new ApiError(data.message);
            }

            return data.data
        } catch (error) {
            throw new ApiError(extractError(error));
        }
    },

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await axiosInstance.delete<ApiResponse<T>>(url, config);

            if (!data.success) {
                throw new ApiError(data.message);
            }

            return data.data
        } catch (error) {
            throw new ApiError(extractError(error));
        }
    },
};