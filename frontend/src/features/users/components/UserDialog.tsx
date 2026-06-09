import { LoadingButton } from "@/components/LoaderButton"
import { PasswordInput } from "@/components/PasswordInput"
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
import { Role, type User } from "@/features/auth/types/auth.responses"
import { useEffect, useState } from "react"
import { useCreateUser, useUpdateUser } from "../hooks/useUsers"
import type { CreateUserDto } from "../types/user.types"

type Props = {
    children: React.ReactNode
    user: User | null
    mode: "edit" | "create"
}

function UserDialog({ user, children, mode }: Props) {
    const createUser = useCreateUser()
    const updateUser = useUpdateUser()

    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState<CreateUserDto>({
        email: "",
        name: "",
        password: "",
        role: "USER",
    })

    useEffect(() => {
        if (open) {
            setFormData({
                email: user?.email || "",
                name: user?.name || "",
                password: "",
                role: user?.role || "USER",
            })
        }
    }, [user, open])

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async () => {
        if (mode === "create") {
            await createUser.mutateAsync(formData)
        } else {
            if (!user) return

            await updateUser.mutateAsync({
                id: user.id ?? "",
                user: {
                    ...formData,
                    password: formData.password || undefined,
                },
            })
        }

        setOpen(false)
    }

    const isLoading = createUser.isPending || updateUser.isPending

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Create User" : "Edit User"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleFormChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password
                            {mode === "edit" && (
                                <span className="text-muted-foreground ml-1 text-xs">
                                    (leave blank to keep current password)
                                </span>
                            )}
                        </Label>

                        <PasswordInput
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleFormChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>

                        <Select
                            value={formData.role}
                            onValueChange={(value: Role) => setFormData((prev) => ({ ...prev, role: value, }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value={Role.USER}>
                                    {Role.USER}
                                </SelectItem>
                                <SelectItem value={Role.MANAGER}>
                                    {Role.MANAGER}
                                </SelectItem>

                            </SelectContent>
                        </Select>
                    </div>

                    <LoadingButton
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        loading={isLoading}
                        loadingText="Saving..."
                    >
                        {mode === "create" ? "Create User" : "Update User"}
                    </LoadingButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserDialog