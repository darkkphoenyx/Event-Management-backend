// import { NextFunction, Request, Response } from 'express'
// import * as memberService from '../services/member.service'
// import HttpStatusCode from 'http-status-codes'

// export const createMember = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const{teamName,faculty,semester,captainName,projectName, email,members,description} = req.body;
//         const team = await memberService.createTeam(teamName,faculty,semester,captainName, email,projectName,description)
//         const member = await memberService.createMembers(team.id,members)
//         const response = {
//             message: 'Member added successfully',
//             member:member,
//             team:team,
//         }        
//         return res.status(HttpStatusCode.CREATED).json(response)
//     } catch (e) {
//         next(e)
//     }
// }
