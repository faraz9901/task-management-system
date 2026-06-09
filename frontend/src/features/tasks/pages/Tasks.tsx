import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

function Tasks() {
    return (
        <AuthenticatedRoute>
            <PageHeader
                title="Tasks"
                subtitle="List of tasks"
                actions={<Button>Create task</Button>}
            />
        </AuthenticatedRoute>
    )
}

export default Tasks