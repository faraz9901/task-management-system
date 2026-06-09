import { onError } from "@/lib/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { create } from "zustand"
import { authApi } from "../api/authApi"
import type { User } from "../types/auth.responses"

const AUTH_KEYS = {
    me: ["me"]
}

interface AuthState {
    user: User | null
    isLoading: boolean
}


export const useAuth = create<AuthState>(() => ({
    user: null,
    isLoading: true,
}))



export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => authApi.login(email, password),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me })
        },
        onError: onError
    })
}

export const useMe = () => {
    const setUser = (user: User | null) => useAuth.setState({ user });
    const setLoading = (isLoading: boolean) => useAuth.setState({ isLoading });

    const query = useQuery({
        queryKey: AUTH_KEYS.me,
        queryFn: authApi.getMe,
        retry: false,
    });

    useEffect(() => {
        setLoading(query.isPending);

        if (query.data) {
            setUser(query.data);
        }

        if (query.error) {
            setUser(null);
        }
    }, [query.data, query.error, query.isPending]);

    return query;
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.logout,

        onSuccess: () => {
            useAuth.setState({ user: null });
            queryClient.removeQueries({ queryKey: AUTH_KEYS.me, });
        },
        onError: onError
    });
};


export const useIsAdmin = () => useAuth((state) => state.user?.role === "ADMIN");