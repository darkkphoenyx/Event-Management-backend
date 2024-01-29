import { Request } from 'express'

export interface RequestWithUserObject extends Request {
    user: UserJWTPayload
}

export interface UserJWTPayload {
    userId: number
    email: string
    isAdmin: boolean
}