export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        USER: "/auth/me",
        LOGOUT: "/auth/logout",
    },

    USER: {
        GET_ALL: "/users",
        GET_ONE: (id: string) => `/users/${id}`,
        CREATE: "/users",
        UPDATE: (id: string) => `/users/${id}`,
        DELETE: (id: string) => `/users/${id}`,
    },

    TASK: {
        GET_ALL: "/tasks",
        GET_MY_TASKS: "/tasks/me",
        GET_ONE: (id: string) => `/tasks/${id}`,
        CREATE: "/tasks",
        UPDATE: (id: string) => `/tasks/${id}`,
        DELETE: (id: string) => `/tasks/${id}`,
    },
}