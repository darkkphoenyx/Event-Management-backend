/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from 'express'
import * as adminService from '../services/admin.service'

import {loginBodyDTO} from '../validator/loginvalidator'


export const login =async(req:Request,res:Response,next:NextFunction
  
  
  )=>{
    try{

    const { userName, password } = loginBodyDTO.parse(req.body)
    const { accessToken, refreshToken } = await adminService.login(
    userName,
    password
)
res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
}).json({ accessToken })

} catch (error) {
next(error)
}
}



export const dashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const dashboardData = await adminService.getDashboard()
        console.log("DashboardDara: ", dashboardData)
        res.send(dashboardData)
    } catch (err) {
        next(err)
    }
}

//get status by admin 
export const getStatus=async(
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
      const response = await adminService.getRequest();
      console.log("Request is being verified by admin")
      res.json(response)
    } 
    catch (error) {
      next(error)
    }
}

//to verify status by admin
export const sendVerification=async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const response = await adminService.verify(Number(req.params.id));
        // console.log(response)
        res.json(response)
    }
    catch(error){
        next(error)
    }
    
}
//REJECT
export const rejectStatus=async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const response = await adminService.reject(Number(req.params.id));
        res.json(response)
    }
    catch(error){
        next(error)
    }
    
}


//display status-verified to admin 
export const displayVerified=async(
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
      const response = await adminService.getVerified();
      console.log("Request is being verified by admin")
      res.json(response)
    } 
    catch (error) {
      next(error)
    }
}
  
