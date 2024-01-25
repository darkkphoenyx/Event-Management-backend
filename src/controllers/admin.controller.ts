import { Request, Response, NextFunction } from 'express'
import * as adminService from '../services/admin.service'

import {loginBodyDTO} from '../validator/loginvalidator'


export const login =async(req:Request,res:Response,next:NextFunction
  
  
  )=>{try{

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
