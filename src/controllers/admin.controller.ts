import { Request, Response, NextFunction } from 'express'
import * as adminService from '../services/admin.service'
<<<<<<< HEAD
import { Request,Response,NextFunction } from 'express'
import {loginBodyDTO} from '../validator/loginvalidator'


export const login =async(req:Request,res:Response,next:NextFunction
  
  
  )=>{try{

  const { email, password } = loginBodyDTO.parse(req.body)

const { accessToken, refreshToken } = await adminService.login(
    email,
    password
)
res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
}).json({ accessToken })
} catch (error) {
next(error)
}
}


=======

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
>>>>>>> 914c8dd67ec7d4e964d7a0f357847a5c53e27933
