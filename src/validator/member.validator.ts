import { z } from 'zod'
export const memberValidator = z.object({
    body: z.object({
        projectname: z.string({
            required_error: 'project name is required',
        }),
        Teamname: z.string({
            required_error: 'Teamname is required',
        }),
        faculty: z.string({
            required_error: 'Faculty is required',
        }),
        semester: z.string({
            required_error: 'semester is required',
        }),
        email: z.string({
            required_error: 'e-mail is required',
        }),

        description: z.string().nullable(),
    }),
})


