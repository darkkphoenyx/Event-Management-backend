// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { PrismaClient } from '@prisma/client'
// import Boom from '@hapi/boom'
// import { displayVerified } from '../controllers/admin.controller'
// const prisma = new PrismaClient()
// import cryptoRandomString from 'crypto-random-string'
// import { createAccessToken,createRefreshToken } from '../utils/token.util'
// import crypto from 'crypto'


// //GET all data for dashboard
// export const getDashboard = async () => {
//     const teams = await prisma.team.findMany({
//         select: {
//             id: true,
//             teamName: true,
//             faculty: true,
//             semester: true,
//             captainName:true,
//             projectId: true,
//             email: true,
//             status: true,
//             members: true,
//         },
//     })


//     const projects = await Promise.all(
//         teams.map(async (team) => {
//             const project = await prisma.project.findFirst({
//                 where: {
//                     id: team.projectId,
//                 },
//                 select: {
//                     title: true,
//                 },
//             })

//             return {
//                 id: team.id,
//                 teamName: team.teamName,
//                 faculty: team.faculty,
//                 semester: team.semester,
//                 captainName: team.captainName,
//                 'project-name': project ? project.title : null,
//                 email: team.email,
//                 status: team.status,
//                 member: team.members,
//             }
//         })
//     )
//     return projects
//     }

// //GET request list
// export const getRequest= async() => {
//     // Check if the user ID exists in the Database
//     try{
//     return await prisma.team.findMany({
//         where:{
//             status: "Pending",
//         }});
//     }catch(err:any){
//         if (err.code==='P2025')
//         {
//             throw Boom.notFound("No any forms submitted yet.")        
//         }
//         else{
//             throw err
//         }
//     }
// }

// //OTP for token
// function generateOTP() {
//     const otpLength = 6;
//     const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

//     let otp = '';

//     for (let i = 0; i < otpLength; i++) {
//         const randomIndex = crypto.randomInt(characters.length);
//         otp += characters.charAt(randomIndex);
//     }

//     return otp;
// }

// //update status to verified by admin
// export const verify = async (id: number) => {
//     try {
//         const newOTP = generateOTP()
//         const qty = await prisma.members.count({
//             where:{teamId:id},
//         })

//         const [team,coupon] = await prisma.$transaction([
//              prisma.team.update({
//                 where: { id:Number(id)},
//                 data: {
//                     status: "Verified",
//                 },
//             }),
//              prisma.coupon.create({
//                 data:{
//                     teamId:id,
//                     otp:newOTP,
//                     quantity: qty,
                     
//                 }
//             })
//         ])
//         return team
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

// //REJECT
// export const reject = async (id: number) => {
//     try {
//         const updatedTeam = await prisma.team.update({
//             where: { id:Number(id)},
//             data: {
//                 status: "Rejected",
//             },
//         });
//         return updatedTeam;
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

// //display verified form
// export const getVerified= async() => {
//     try{
//     return await prisma.team.findMany({
//         where:{
//             status: "Verified",
//         }});
//     }catch(err:any){
//         if (err.code==='P2025')
//         {
//             throw Boom.notFound("No any forms verified yet.")        
//         }
//         else{
//             throw err
//         }
//     }
// }
  
// //LOGIN 
// export async function login(userName: string, password: string ) {
//     const user = await prisma.admin.findFirst({ where: { userName:userName} })
//     if (!user) {
//         throw Boom.badRequest('Username or password is incorrect.')
//     }

//     const passwordMatch = password === user.password;

//     if (!passwordMatch) {
//         throw Boom.badRequest('Username or password is incorrect.')
//     }

//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   
//     const accessToken = createAccessToken(userName)

//     const refreshToken = createRefreshToken(userName)

//     return { accessToken, refreshToken }
    
// }
