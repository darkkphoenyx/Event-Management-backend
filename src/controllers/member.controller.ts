import { NextFunction, Request, Response } from 'express'
import * as memberService from '../services/member.service'
import HttpStatusCode from 'http-status-codes'

export const createMember = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const{teamName, projectName,level, option, value,captainName, email,members,description} = req.body;
        const team = await memberService.createTeam(teamName, projectName,level, option,value,captainName,email,description)
        const member = await memberService.createMembers(team.id,members)
        const response = {
            message: 'Member added successfully',
            member:member,
            team:team,
        }        
        return res.status(HttpStatusCode.CREATED).json(response)
    } catch (e) {
        next(e)
    }
}
