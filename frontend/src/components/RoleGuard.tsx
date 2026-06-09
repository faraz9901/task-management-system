import { useAuth } from '@/features/auth/hooks/useAuth';
import type { Role } from '@/features/auth/types/auth.responses';
import React from 'react';
import { Navigate } from 'react-router';

type Props = {
    children: React.ReactNode
    allowedRoles: Role[]
    fallbackUrl: (role: Role) => string
}

function RoleGuard({ children, allowedRoles, fallbackUrl }: Props) {

    const { user } = useAuth()


    if (!user) {
        return <Navigate to="/login" />
    }


    if (!allowedRoles.includes(user.role)) {
        return <Navigate to={fallbackUrl(user.role)} />
    }


    return children
}

export default RoleGuard