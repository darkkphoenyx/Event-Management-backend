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
            console.log(error,"this is validation error in validate");         
            next(error)
        }
    }

// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { NextFunction, Request, Response } from 'express'
// import { AnyZodObject } from 'zod'

// // Middleware to validate request parameters and body against a Zod schema.
// export const validate = (schema: AnyZodObject) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // Ensure that req.body, req.query, and req.params are defined before passing them to parseAsync
//       const requestData = {
//         body: req.body || {},
//         query: req.query || {},
//         params: req.params || {},
//       };

//       // Parse and validate request body, query, and params using the provided Zod schema
//       await schema.parseAsync(requestData);

//       // Continue to the next middleware if validation is successful
//       return next();
//     } catch (error) {
//       // Pass the validation error to the next middleware
//       console.error("Validation error in validate:", error);
//       next(error);
//     }
//   };

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// Middleware to validate request parameters and body against a Zod schema.
export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure that req.body, req.query, and req.params are defined
      const bodyData = req.body !== undefined ? req.body : {};
      const queryData = req.query !== undefined ? req.query : {};
      const paramsData = req.params !== undefined ? req.params : {};

      // Parse and validate request body, query, and params using the provided Zod schema
      await schema.parseAsync({
        body: bodyData,
        query: queryData,
        params: paramsData,
      });

      // Continue to the next middleware if validation is successful
      return next();
    } catch (error) {
      // Pass the validation error to the next middleware
      console.error("Validation error in validate:", error);
      next(error);
    }
  };
