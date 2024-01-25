/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from 'express'
import * as adminService from '../services/admin.service'

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
  
