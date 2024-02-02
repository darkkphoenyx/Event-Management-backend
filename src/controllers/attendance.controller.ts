/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from 'express'
import HttpStatusCode from 'http-status-codes'
import * as attendanceService from '../services/attendance.service'


//GET team
export const getAttendance=async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await attendanceService.getTeams()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

//GET members
export const getById=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        const response = await attendanceService.getId(Number(req.params.id))
        res.json(response)
    }catch(err){
        next(err)
    }
}

//POST attendance
export const postAttendance=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        const response = await attendanceService.memberAttendance(Number(req.params.id))
        const message = {
                        message: 'Attendance done successfully.',
                        response:response
              }        
              return res.status(HttpStatusCode.CREATED).json(message)
    }catch(err){
        next(err)
    }
}


