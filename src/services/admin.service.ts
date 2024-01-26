/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { createAccessToken,createRefreshToken } from '../utils/token.util'
import  Boom  from '@hapi/boom'



export const getDashboard = async () => {
    const teams = await prisma.team.findMany({
        select: {
            id: true,
            teamName: true,
            faculty: true,
            semester: true,
            captainName:true,
            projectId: true,
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

            return {
                id: team.id,
                teamName: team.teamName,
                faculty: team.faculty,
                semester: team.semester,
                captainName: team.captainName,
                'project-name': project ? project.title : null,
            }
        })
    )
    return projects
    }
//get status-pending by admin 
export const getRequest= async() => {
    // Check if the user ID exists in the Database
    try{
    return await prisma.team.findMany({
        where:{
            status: "pending",
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

//update status to verified by admin
export const verify = async (id: number) => {
    try {

        const updatedTeam = await prisma.team.update({
            where: { id:Number(id)},
            data: {
                status: "verified",
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

//REJECT
export const reject = async (id: number) => {
    try {
        const updatedTeam = await prisma.team.update({
            where: { id:Number(id)},
            data: {
                status: "rejected",
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
            status: "verified",
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