import { api } from "@/lib/api"
import { ENDPOINTS } from "@/lib/ENDPOINTS"
import { type User } from "../types/auth.responses"

export const authApi = {
    login: async (email: string, password: string) => api.post(ENDPOINTS.AUTH.LOGIN, { email, password }),
    getMe: async () => api.get<User>(ENDPOINTS.AUTH.USER),
    logout: async () => api.delete(ENDPOINTS.AUTH.LOGOUT)

}