import { z } from 'zod'
export const memberValidator = z.object({
    body: z.object({
        projectname: z.string({
            required_error: 'project name is required',
        }),
        teamname: z.string({
            required_error: 'teamname is required',
        }),
        faculty: z.string({
            required_error: 'faculty is required',
        }),
        semester: z.string({
            required_error: 'semester is required',
        }),
        email: z.string({
            required_error: 'e-mail is required',
        }),

        description: z.string().optional(),
    }),
})


