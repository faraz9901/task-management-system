import AuthenticatedRoute from "@/components/AuthenticatedRoute"
import PageHeader from "@/components/PageHeader"
import { Button } from "@/components/ui/button"

import { useRole } from "@/features/auth/hooks/useAuth"
import { Role } from "@/features/auth/types/auth.responses"
import TaskDialog from "../components/TaskDialog"
import TaskTable from "../components/TaskTable"
import { useMyTasks, useTasks } from "../hooks/useTasks"


function Tasks() {
    // const [query, setQuery] = useState<UserQueryDto>({ role: undefined, search: undefined })
    const { data } = useTasks()
    const { data: myTasks } = useMyTasks()
    const role = useRole()

    const tasks = role === Role.ADMIN ? data || [] : myTasks || []

    return (
        <AuthenticatedRoute>
            <div className="p-4 space-y-5">
                <PageHeader
                    title="Tasks"
                    subtitle="List of Tasks"
                    actions={role !== Role.USER ?
                        <TaskDialog mode="create" task={null}>
                            <Button>Add Task</Button>
                        </TaskDialog> : null
                    }
                />

                {/* <div className="grid grid-cols-2 gap-4">
                    <Input
                        placeholder="Search"
                        onChange={(e) => setQuery((prev) => ({ ...prev, search: e.target.value }))}
                        value={query.search}
                    />


                    <Select
                        value={query.role}
                        onValueChange={(value: string) => setQuery((prev) => ({ ...prev, role: value === 'all' ? undefined : value as Role }))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={'all'}>
                                All
                            </SelectItem>

                            <SelectItem value={Role.USER}>
                                {Role.USER}
                            </SelectItem>
                            <SelectItem value={Role.MANAGER}>
                                {Role.MANAGER}
                            </SelectItem>

                        </SelectContent>
                    </Select>


                </div> */}

                <TaskTable tasks={tasks} />
            </div>
        </AuthenticatedRoute >
    )
}

export default Tasks