import { z } from 'zod'
   export const memberValidator = z.object({
        body: z.object({
            teamName: z.string({
                required_error: 'teamName is required',
            }),
            faculty: z.string({
                required_error: 'faculty is required',
            }),
            projectName: z.string({
                required_error: 'projectName is required',
            }),
            semester: z.number({
                required_error: 'semester is required',
            }),
            email: z.string({
                required_error: "email is required",
            }),
            captainName: z.string({
                required_error: 'captainName is required',
            }),
            member:z.array(z.string()).optional(),
            
            description: z.string().optional(),
        }),
    })
