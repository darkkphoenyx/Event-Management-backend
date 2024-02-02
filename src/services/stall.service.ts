// import prisma from "../libs/prisma"
// import Boom  from "@hapi/boom"

// export const get = async () => {
//     try {
//         const newStall = await prisma.stall.findFirst({where: {isFree:true,} });
//         const stallId=newStall
//        return stallId
//     } catch (error:any) {
        
//         if (error.code==='P2025')
//         {
//             throw Boom.notFound("update error")
//         }
//         else{
//             throw error
//         }
//     }
// }