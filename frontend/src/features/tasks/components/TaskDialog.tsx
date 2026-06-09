import { LoadingButton } from "@/components/LoaderButton"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRole } from "@/features/auth/hooks/useAuth"
import { useUsers } from "@/features/users/hooks/useUsers"
import { useEffect, useState } from "react"
import { useCreateTask, useUpdateTask } from "../hooks/useTasks"
import type { CreateTaskDto, TaskPriority, TaskStatus } from "../types/task.dto"
import type { TaskResponse } from "../types/task.responses"


type Props = {
    children: React.ReactNode
    task: TaskResponse | null
    mode: "edit" | "create"
}

function TaskDialog({ task, children, mode }: Props) {
    const createTask = useCreateTask()
    const updateTask = useUpdateTask()
    const { data: users } = useUsers({})
    const role = useRole()


    const isDisabled = mode === "edit" && role === "USER"


    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState<CreateTaskDto>({
        dueDate: null,
        title: "",
        description: "",
        priority: "LOW",
        status: "TODO",
        assignedToId: null
    })

    useEffect(() => {
        if (open) {
            setFormData({
                dueDate: task?.dueDate || null,
                title: task?.title || "",
                description: task?.description || "",
                priority: task?.priority || "LOW",
                status: task?.status || "TODO",
                assignedToId: task?.assignedToId || null
            })
        }
    }, [task, open])

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async () => {
        if (mode === "create") {
            await createTask.mutateAsync(formData)
        } else {
            if (!task) return

            await updateTask.mutateAsync({
                id: task.id ?? "",
                task: {
                    assignedToId: formData.assignedToId || null,
                    dueDate: formData.dueDate || undefined,
                    title: formData.title || "",
                    description: formData.description || "",
                    priority: formData.priority || "LOW",
                    status: formData.status || "TODO",
                }
            })
        }

        setOpen(false)
    }

    const isLoading = createTask.isPending || updateTask.isPending

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="max-w-xl w-full">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Create Task" : "Edit Task"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleFormChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Priority</Label>

                        <Select
                            value={formData.priority}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value as TaskPriority }))}
                            disabled={isDisabled}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="LOW">LOW</SelectItem>
                                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                                <SelectItem value="HIGH">HIGH</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>

                        <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as TaskStatus }))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="TODO">TODO</SelectItem>
                                <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                                <SelectItem value="DONE">DONE</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Assigned To</Label>

                        <Select
                            value={formData.assignedToId ?? "unassigned"}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, assignedToId: value === "unassigned" ? null : value }))}
                            disabled={isDisabled}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select User" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="unassigned">
                                    Unassigned
                                </SelectItem>

                                {users?.map((user) => (
                                    <SelectItem
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>

                        <Input
                            id="dueDate"
                            type="date"
                            value={formData.dueDate ? new Date(formData.dueDate).toISOString().split("T")[0] : ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: new Date(e.target.value) || null }))}
                            disabled={isDisabled}
                        />
                    </div>

                    <LoadingButton
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        loading={isLoading}
                        loadingText="Saving..."
                    >
                        {mode === "create" ? "Create Task" : "Update Task"}
                    </LoadingButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDialog