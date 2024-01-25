import * as adminService from '../services/admin.service'
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


