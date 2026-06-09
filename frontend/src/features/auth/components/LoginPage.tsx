import PublicRoute from "@/components/PublicRoute"

function LoginPage() {
    return (
        <PublicRoute redirectIfAuthenticated={true}>
            Login
        </PublicRoute>
    )
}

export default LoginPage