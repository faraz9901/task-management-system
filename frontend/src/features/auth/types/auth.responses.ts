export const Role = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    USER: 'USER'
} as const

export type Role = typeof Role[keyof typeof Role]


export interface User {
    id: string
    name: string
    email: string
    role: Role
    createdAt: Date
    updatedAt: Date
}