import AuthenticatedRoute from "@/components/AuthenticatedRoute"
import RoleGuard from "@/components/RoleGuard"
import { Role } from "@/features/auth/types/auth.responses"
import { Link } from "react-router"

function Home() {
    return (
        <AuthenticatedRoute>
            <RoleGuard allowedRoles={[Role.ADMIN]} fallbackUrl={() => '/tasks'}>


                <Link to="/users">Users</Link>
                <Link to="/tasks">Tasks</Link>


            </RoleGuard>
        </AuthenticatedRoute>
    )
}

export default Home