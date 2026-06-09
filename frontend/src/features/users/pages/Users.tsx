import AuthenticatedRoute from "@/components/AuthenticatedRoute"
import RoleGuard from "@/components/RoleGuard"
import { Role } from "@/features/auth/types/auth.responses"

function Users() {
    return (
        <AuthenticatedRoute>
            <RoleGuard allowedRoles={[Role.ADMIN]} fallbackUrl={() => '/tasks'}>
                <h1>Users</h1>
            </RoleGuard>
        </AuthenticatedRoute>
    )
}

export default Users