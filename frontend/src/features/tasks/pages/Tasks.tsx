import AuthenticatedRoute from "@/components/AuthenticatedRoute"
import PageHeader from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRole } from "@/features/auth/hooks/useAuth"
import { Role } from "@/features/auth/types/auth.responses"
import { useState } from "react"
import TaskDialog from "../components/TaskDialog"
import TaskTable from "../components/TaskTable"
import { useMyTasks, useTasks } from "../hooks/useTasks"
import { TaskPriority, TaskStatus, type TaskQueryDto } from "../types/task.dto"


function Tasks() {
    const [query, setQuery] = useState<TaskQueryDto>({ title: undefined, priority: undefined, status: undefined })
    const { data } = useTasks(query)
    const { data: myTasks } = useMyTasks(query)
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

                <div className="grid grid-cols-3 gap-4">
                    <Input
                        placeholder="Search by title"
                        onChange={(e) => setQuery((prev) => ({ ...prev, title: e.target.value }))}
                        value={query.title}
                    />


                    <Select
                        value={query.priority || 'all'}
                        onValueChange={(value: string) => setQuery((prev) => ({ ...prev, priority: value === 'all' ? undefined : value as TaskPriority }))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={'all'}>
                                All
                            </SelectItem>

                            {Object.values(TaskPriority).map((priority) => (
                                <SelectItem key={priority} value={priority}>
                                    {priority}
                                </SelectItem>
                            ))}

                        </SelectContent>
                    </Select>

                    <Select
                        value={query.status || 'all'}
                        onValueChange={(value: string) => setQuery((prev) => ({ ...prev, status: value === 'all' ? undefined : value as TaskStatus }))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={'all'}>
                                All
                            </SelectItem>

                            {Object.values(TaskStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}

                        </SelectContent>
                    </Select>


                </div>

                <TaskTable tasks={tasks} />
            </div>
        </AuthenticatedRoute >
    )
}

export default Tasks