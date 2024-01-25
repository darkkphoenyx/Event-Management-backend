import { constants } from 'buffer'
import { z } from 'zod'

export const loginBodyDTO = z.object({
    username: z.string({
        required_error: 'email is required',
    }),
    password: z.string({
        required_error: 'password is required',
    }),
})



export const loginSchema = z.object({
    body: loginBodyDTO,
})  

































