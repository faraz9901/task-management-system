export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        USER: "/auth/me",
        LOGOUT: "/auth/logout",
    },

    USER: {
        GET_ALL: "/users",
        GET_ONE: "/users/:id",
        CREATE: "/users",
        UPDATE: "/users/:id",
        DELETE: "/users/:id",
    },

    TASK: {
        GET_ALL: "/tasks",
        GET_MY_TASKS: "/tasks/me",
        GET_ONE: "/tasks/:id",
        CREATE: "/tasks",
        UPDATE: "/tasks/:id",
        DELETE: "/tasks/:id",
    },
}