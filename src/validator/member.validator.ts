import { z } from 'zod'
   export const memberValidator = z.object({
        body: z.object({
            teamName: z.string({
                required_error: 'teamName is required',
            }),
            level: z.string({
                required_error: 'level is required',
            }),
            option: z.string({
                required_error: 'option is required',
            }),
            value: z.number({
                required_error: 'value is required',
            }),
            projectName:z.string({
                required_error:'projectName is required'
            }),
            email: z.string({
                required_error: "email is required",
            }),
            captainName: z.string({
                required_error: 'captainName is required',
            }),
            members:z.array(z.string({
                required_error: 'Member list is required',
            })),
            description: z.string({
                required_error: 'description is required',
            }),
        }),
    })
