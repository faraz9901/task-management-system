import AuthenticatedRoute from "@/components/AuthenticatedRoute"
import PageHeader from "@/components/PageHeader"
import RoleGuard from "@/components/RoleGuard"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Role } from "@/features/auth/types/auth.responses"
import { useState } from "react"
import UserDialog from "../components/UserDialog"
import UserTable from "../components/UserTable"
import { useUsers } from "../hooks/useUsers"
import type { UserQueryDto } from "../types/user.types"

function Users() {
    const [query, setQuery] = useState<UserQueryDto>({ role: undefined, search: undefined })
    const { data } = useUsers(query)

    const users = data || []

    return (
        <AuthenticatedRoute>
            <RoleGuard allowedRoles={[Role.ADMIN]} fallbackUrl={() => '/tasks'}>
                <div className="p-4 space-y-5">
                    <PageHeader
                        title="Users"
                        subtitle="List of Users"
                        actions={
                            <UserDialog mode="create" user={null}>
                                <Button>Add User</Button>
                            </UserDialog>
                        }
                    />

                    <div className="grid grid-cols-2 gap-4">
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


                    </div>

                    <UserTable users={users} />
                </div>
            </RoleGuard>
        </AuthenticatedRoute>
    )
}

export default Users