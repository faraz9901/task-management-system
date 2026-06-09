import AuthenticatedRoute from "@/components/AuthenticatedRoute";

function Tasks() {
    return (
        <AuthenticatedRoute>
            <h1>Tasks</h1>
        </AuthenticatedRoute>
    )
}

export default Tasks