import { useAuth } from "@/features/auth/hooks/useAuth"
import { Navigate } from "react-router"
import FullScreenLoader from "./FullScreenLoader"

type Props = {
    children: React.ReactNode
    redirectIfAuthenticated: boolean
}


function PublicRoute({ children, redirectIfAuthenticated }: Props) {

    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <FullScreenLoader />
    }

    if (user && redirectIfAuthenticated) {
        return <Navigate to="/" />;
    }

    return children
}

export default PublicRoute