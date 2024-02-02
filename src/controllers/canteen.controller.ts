import * as canteenService from '../services/canteen.services'
import { Request,Response,NextFunction } from 'express'
import path from 'path';

export const checkStatus = async (req: Request,res: Response, next: NextFunction)=>{
    const otp = req.params.value
    try
    {
    const check = await canteenService.checkStatus(otp)
    const htmlcontent = `<h1>${check?.Quantity} Coupon worth Rs.50</h1>`;
    res.end(htmlcontent);
    }
    catch(err)
    {
        const htmlcontent = `<h1>Sorry, Please bring a valid token</h1>`;
    res.end(htmlcontent);
        next(err)
    }
}