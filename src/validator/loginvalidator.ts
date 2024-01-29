
import { z } from 'zod'

export const loginBodyDTO = z.object({
    userName: z.string({
        required_error: 'username is required',
    }),
    password: z.string({
        required_error: 'password is required',
    }),
})



export const loginSchema = z.object({
    body: loginBodyDTO,
})  

































