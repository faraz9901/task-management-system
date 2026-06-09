import AuthenticatedRoute from "@/components/AuthenticatedRoute"

function Home() {
    return (
        <AuthenticatedRoute>
            <h1>Home</h1>
        </AuthenticatedRoute>
    )
}

export default Home