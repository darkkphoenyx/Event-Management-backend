import { z } from 'zod'

export const loginBodyDTO = z.object({
    email: z.string({
        required_error: 'email is required',
    }),
    password: z.string({
        required_error: 'password is required',
    }),
})