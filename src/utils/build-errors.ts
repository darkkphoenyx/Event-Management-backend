/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import HttpStatus from 'http-status-codes'
import { ZodError } from 'zod'

function buildError(err: any) {
    // Validation errors
    if (err instanceof ZodError) {
        return {
            code: HttpStatus.BAD_REQUEST,
            message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
            details: err.issues.map((issue) => issue.message),
        }
    }

    // HTTP errors
    if (err.isBoom) {
        return {
            code: err.output.statusCode,
            message: err.output.payload.message || err.output.payload.error,
        }
    }
    console.log('here?')

    console.log(err)

    // Return INTERNAL_SERVER_ERROR for all other cases
    return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    }
}

export default buildError
