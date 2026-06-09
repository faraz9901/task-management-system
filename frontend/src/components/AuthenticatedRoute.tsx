import { useAuth } from "@/features/auth/hooks/useAuth"
import { Navigate } from "react-router"
import FullScreenLoader from "./FullScreenLoader"

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {

    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <FullScreenLoader />
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default AuthenticatedRoute