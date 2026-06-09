import { LoadingButton } from "@/components/LoaderButton"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useRole } from "@/features/auth/hooks/useAuth"
import { formatDate } from "@/lib/utils"
import { Edit, Trash } from "lucide-react"
import { useDeleteTask } from "../hooks/useTasks"
import type { TaskResponse } from "../types/task.responses"
import TaskDialog from "./TaskDialog"


type Props = {
    tasks: TaskResponse[]
}

function TaskTable({ tasks }: Props) {
    const role = useRole()
    const deleteUser = useDeleteTask()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead> Assigned To</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.priority}</TableCell>
                        <TableCell>{task.status}</TableCell>
                        <TableCell>{formatDate(task.createdAt)}</TableCell>
                        <TableCell>{task.createdBy?.name}</TableCell>
                        <TableCell>{task.assignedTo?.name || "N/A"}</TableCell>
                        <TableCell className="flex justify-center gap-4" >

                            <TaskDialog mode="edit" task={task} >
                                <Button size="icon" >
                                    <Edit />
                                </Button>
                            </TaskDialog>


                            {role !== "USER" && <LoadingButton
                                onClick={() => deleteUser.mutate(task.id ?? "")}
                                variant="destructive"
                                loading={deleteUser.isPending}
                                loadingText=" "
                                disabled={deleteUser.isPending}
                                size="icon"
                            >
                                <Trash />
                            </LoadingButton>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TaskTable