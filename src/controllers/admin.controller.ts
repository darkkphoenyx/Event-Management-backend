/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from 'express'
import * as adminService from '../services/admin.service'
import { generateqrcode, verificationemail } from '../utils/qr'
export const dashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const dashboardData = await adminService.getDashboard()
        console.log('DashboardDara: ', dashboardData)
        res.send(dashboardData)
    } catch (err) {
        next(err)
    }
}

//get request status
export const getStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await adminService.getRequest()
        console.log('Request is being verified by admin')
        res.json(response)
    } catch (error) {
        next(error)
    }
}

//send verification status
//now sending the verification code
export const sendVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await adminService.verify(Number(req.params.id))
        // console.log(response)
        //after verifying the user

        res.json(response)
    } catch (error) {
        next(error)
    }
}
