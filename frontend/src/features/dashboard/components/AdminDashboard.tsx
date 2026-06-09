import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { User } from "@/features/auth/types/auth.responses"
import type { TaskResponse } from "@/features/tasks/types/task.responses"
import {
    AlertTriangle,
    CheckCircle2,
    ClipboardList,
    Users,
} from "lucide-react"
import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

interface Props {
    users: User[]
    tasks: TaskResponse[]
}

export default function AdminDashboard({ users, tasks }: Props) {
    const completedTasks = tasks.filter((t) => t.status === "DONE")

    const overdueTasks = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "DONE")

    const statusData = [
        {
            name: "Todo",
            value: tasks.filter((t) => t.status === "TODO").length,
        },
        {
            name: "In Progress",
            value: tasks.filter((t) => t.status === "IN_PROGRESS").length,
        },
        {
            name: "Completed",
            value: tasks.filter((t) => t.status === "DONE").length,
        },
    ]

    const roleData = [
        {
            name: "Managers",
            value: users.filter((u) => u.role === "MANAGER").length,
        },
        {
            name: "Users",
            value: users.filter((u) => u.role === "USER").length,
        },
    ]

    const priorityData = [
        {
            name: "Low",
            value: tasks.filter((t) => t.priority === "LOW").length,
        },
        {
            name: "Medium",
            value: tasks.filter((t) => t.priority === "MEDIUM").length,
        },
        {
            name: "High",
            value: tasks.filter((t) => t.priority === "HIGH").length,
        },
        {
            name: "Critical",
            value: tasks.filter((t) => t.priority === "CRITICAL").length,
        }
    ]

    const workloadData = users.map((user) => ({
        name: user.name,
        tasks: tasks.filter((task) => task.assignedToId === user.id).length,
    })).sort((a, b) => b.tasks - a.tasks).slice(0, 5)

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Overview of users and tasks
                </p>
            </div>

            {/* KPI CARDS */}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Users"
                    value={users.length}
                    icon={<Users className="size-5" />}
                />

                <StatCard
                    title="Tasks"
                    value={tasks.length}
                    icon={<ClipboardList className="size-5" />}
                />

                <StatCard
                    title="Completed"
                    value={completedTasks.length}
                    icon={<CheckCircle2 className="size-5" />}
                />

                <StatCard
                    title="Overdue"
                    value={overdueTasks.length}
                    icon={<AlertTriangle className="size-5" />}
                />
            </div>

            {/* CHARTS */}

            <div className="grid gap-6 lg:grid-cols-2">
                <ChartCard title="Tasks By Status">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                dataKey="value"
                                label
                            >
                                {statusData.map((_, index) => (
                                    <Cell key={index} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Task Priority">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={priorityData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" radius={8} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <ChartCard title="Users By Role">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={roleData}
                                dataKey="value"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Top Workloads">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={workloadData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="tasks" radius={8} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* RECENT TASKS */}

            <Card>
                <CardHeader>
                    <CardTitle>Recent Tasks</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Assigned</TableHead>
                                <TableHead>Due Date</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {tasks.slice(0, 10).map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>
                                        {task.title}
                                    </TableCell>

                                    <TableCell>
                                        <Badge variant="secondary">
                                            {task.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <Badge>
                                            {task.priority}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        {task.assignedTo?.name ??
                                            "Unassigned"}
                                    </TableCell>

                                    <TableCell>
                                        {task.dueDate
                                            ? new Date(
                                                task.dueDate
                                            ).toLocaleDateString()
                                            : "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function StatCard({ title, value, icon }: {
    title: string
    value: number
    icon: React.ReactNode
}) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <p className="text-muted-foreground text-sm">
                        {title}
                    </p>

                    <p className="text-3xl font-bold">
                        {value}
                    </p>
                </div>

                {icon}
            </CardContent>
        </Card>
    )
}

function ChartCard({
    title,
    children,
}: React.PropsWithChildren<{
    title: string
}>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{children}</CardContent>
        </Card>
    )
}