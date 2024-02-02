import { PrismaClient } from "@prisma/client"
import Boom  from "@hapi/boom"
const prisma = new PrismaClient()

export const checkStatus = async (otp: any)=>{
    try{
   const newCoupon =  await prisma.coupon.findFirstOrThrow({
        where:{
            otp:otp
        }
    })

    if(newCoupon.is_valid)
    {
        return {"Validity": "Verified",
            "Quantity" :newCoupon.quantity}
    }
}catch(err: any)
{
    if (err.code === 'P2025') throw Boom.notFound("Not found")
        else throw err
}
}