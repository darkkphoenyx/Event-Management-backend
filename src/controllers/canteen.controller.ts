import * as canteenService from '../services/canteen.services'
import { Request,Response,NextFunction } from 'express'

export const checkStatus = async (req: Request,res: Response, next: NextFunction)=>{
    const otp = req.params.value
    try
    {
    const check = await canteenService.checkStatus(otp)
    res.json(check)
    }
    catch(err)
    {
        next(err)
    }
}