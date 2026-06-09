import AuthenticatedRoute from "@/components/AuthenticatedRoute"
import RoleGuard from "@/components/RoleGuard"
import { Role } from "@/features/auth/types/auth.responses"
import { useTasks } from "@/features/tasks/hooks/useTasks"
import { useUsers } from "@/features/users/hooks/useUsers"
import AdminDashboard from "../components/AdminDashboard"

function Home() {

    const users = useUsers({})
    const tasks = useTasks({})

    return (
        <AuthenticatedRoute>
            <RoleGuard allowedRoles={[Role.ADMIN]} fallbackUrl={() => '/tasks'}>
                <AdminDashboard
                    tasks={tasks.data || []}
                    users={users.data || []}
                />
            </RoleGuard>
        </AuthenticatedRoute>
    )
}

export default Home