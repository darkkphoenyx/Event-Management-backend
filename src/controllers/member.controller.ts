import { NextFunction, Request, Response } from 'express'
import * as memberService from '../services/member.service'
import HttpStatusCode from 'http-status-codes'

export const createMember = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('line no 10');
    
    try {
        const{teamName,faculty,semester,captainName,projectName, email,members,description} = req.body
        console.log('line no 14');
        
        const team = await memberService.createTeam(teamName,faculty,semester,captainName, email,projectName,description)
        console.log('line no 17');
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
