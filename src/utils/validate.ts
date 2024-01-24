/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

//Middleware to validate request parameters and body against a Zod schema.
export const validate =(schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Parse and validate request body, query, and params using the provided Zod schema
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            // Continue to the next middleware if validation is successful
            return next()
        } catch (error) {
            // Pass the validation error to the next middleware
            next(error)
        }
    }