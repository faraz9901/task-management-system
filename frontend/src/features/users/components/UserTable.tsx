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
import type { User } from "@/features/auth/types/auth.responses"
import { formatDate } from "@/lib/utils"
import { Edit, Trash } from "lucide-react"
import { useDeleteUser } from "../hooks/useUsers"
import UserDialog from "./UserDialog"


type Props = {
    users: User[]
}

function UserTable({ users }: Props) {

    const deleteUser = useDeleteUser()


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell className="flex justify-center gap-4" >

                            <UserDialog mode="edit" user={user} >
                                <Button size="icon" >
                                    <Edit />
                                </Button>
                            </UserDialog>


                            <LoadingButton
                                onClick={() => deleteUser.mutate(user.id ?? "")}
                                variant="destructive"
                                loading={deleteUser.isPending}
                                loadingText=" "
                                disabled={deleteUser.isPending}
                                size="icon"
                            >
                                <Trash />
                            </LoadingButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UserTable