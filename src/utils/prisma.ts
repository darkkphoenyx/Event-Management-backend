import { PrismaClient } from "@prisma/client"
let prisma=new PrismaClient({


log:['query'],
})


export default prisma 
