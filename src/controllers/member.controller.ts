import { NextFunction, Request, Response } from 'express'
import * as memberService from '../services/member.service'
import HttpStatusCode from 'http-status-codes'

export const createMember = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await memberService.postMember(req.body )
        const response = {
            message: 'Member added successfully',
            user: user,
        }

        return res.status(HttpStatusCode.CREATED).json(response)
      
    } catch (e) {
        next(e)
    }
}
