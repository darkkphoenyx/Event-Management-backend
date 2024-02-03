
import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
const prisma = new PrismaClient()
import { createAccessToken,createRefreshToken } from '../utils/token.util'
import crypto from 'crypto'


//GET all data for dashboard
export const getDashboard = async () => {

    const teams = await prisma.team.findMany({
        select: {
            id: true,
            teamName: true,
            streamId: true,
            captainName:true,
            projectId: true,
            email: true,
            status: true,
            members: true,
        },
    })

        
    const projects = await Promise.all(
        teams.map(async (team) => {
            const project = await prisma.project.findFirst({
                where: {
                    id: team.projectId,
                },
                select: {
                    title: true,
                },
            })

            const stream = await prisma.stream.findFirst({
                where: {
                    id:team.streamId
                },
                select:{
                    option: true,
                    level:true
                }
            })

            return {
                id: team.id,
                teamName: team.teamName,
                captainName: team.captainName,
                'project-name': project ? project.title : null,
                'Stream': stream ? stream.option : null,
                'Level': stream ? stream.level : null,
                email: team.email,
                status: team.status,
                member: team.members,
            }
        })
    )
    return projects
    }

//GET request list
export const getRequest= async() => {
    // Check if the user ID exists in the Database
    try{
    return await prisma.team.findMany({
        where:{
            status: "Pending",
        }});
    }catch(err:any){
        if (err.code==='P2025')
        {
            throw Boom.notFound("No any forms submitted yet.")        
        }
        else{
            throw err
        }
    }
}

//OTP for token
function generateOTP() {
    const otpLength = 6;
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let otp = '';

    for (let i = 0; i < otpLength; i++) {
        const randomIndex = crypto.randomInt(characters.length);
        otp += characters.charAt(randomIndex);
    }

    return otp;
}

// update status to verified by admin
export const verify = async (id: number) => {
    try {
        const newOTP = generateOTP()
        const newStall = await prisma.stall.findFirst({
            where:{
                isFree: true,
            }
        })

        const newStallId = newStall?.stallId
        
        const qty = await prisma.members.count({
            where:{teamId:id},
        })

        let [team,coupon] = await prisma.$transaction([
             prisma.team.update({
                where: { id:Number(id)},
                data: {
                    status: "Verified",
                    stallId: newStallId,
                },
            }),
             prisma.coupon.create({
                data:{
                    teamId:id,
                    otp:newOTP,
                    quantity: qty,
                     
                }
            })
        ])

        const members = await prisma.members.findMany({
            where:{
                teamId:id,
            },
            select:{
                id:true,
                name: true,
            }
        })
        
        return {
            teamName:team.teamName, 
            captainName: team.captainName,
            email: team.email,
            otp: coupon.otp,
            members,
        }
    } catch (error:any) {

        if (error.code==='P2025')
        {
            throw Boom.notFound("update error")
        }
        else{
            throw error
        }
    }
}

//REJECT
export const reject = async (id: number) => {
    try {
        const updatedTeam = await prisma.team.update({
            where: { id:Number(id)},
            data: {
                status: "Rejected",
            },
        });
        return updatedTeam;
    } catch (error:any) {
        
        if (error.code==='P2025')
        {
            throw Boom.notFound("update error")
        }
        else{
            throw error
        }
    }
}

//display verified form
export const getVerified= async() => {
    try{
    return await prisma.team.findMany({
        where:{
            status: "Verified",
        }});
    }catch(err:any){
        if (err.code==='P2025')
        {
            throw Boom.notFound("No any forms verified yet.")        
        }
        else{
            throw err
        }
    }
}
  
//LOGIN 
export async function login(userName: string, password: string ) {
    const user = await prisma.admin.findFirst({ where: { userName:userName} })
    if (!user) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    const passwordMatch = password === user.password;

    if (!passwordMatch) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   
    const accessToken = createAccessToken(userName)

    const refreshToken = createRefreshToken(userName)

    return { accessToken, refreshToken }
    
}


export const memberImage = async(id : number)=>{
    try{
        return await prisma.members.findFirstOrThrow({
            where:{
                id: id
            },
        select:
        {
            memberphoto: true,
        }
    });
        }catch(err:any){
            if (err.code==='P2025')
            {
                throw Boom.notFound("Member not found")        
            }
            else{
                throw err
            }
        }
}