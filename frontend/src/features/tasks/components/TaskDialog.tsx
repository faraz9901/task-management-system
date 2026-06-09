import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import type { TaskResponse } from "../types/task.responses"

type Props = {
    children: React.ReactNode
    task: TaskResponse | null,
    mode: "edit" | "create",
}

function TaskDialog({ task, children, mode }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>




        </Dialog>
    )
}

export default TaskDialog