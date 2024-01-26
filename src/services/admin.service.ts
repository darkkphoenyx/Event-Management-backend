import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { createAccessToken,createRefreshToken } from '../utils/token.util'
import  Boom  from '@hapi/boom'
import bcrypt from 'bcryptjs';


export const getDashboard = async () => {
    const teams = await prisma.team.findMany({
        select: {
            id: true,
            teamName: true,
            faculty: true,
            semester: true,
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
                    // Select the project fields you want
                    // For example: name, description, etc.
                    title: true,
                },
            })

            return {
                id: team.id,
                teamName: team.teamName,
                faculty: team.faculty,
                semester: team.semester,
                projectID: team.projectId,
                'project-name': project ? project.title : null,
            }
        })
    )
    return projects
    }






    


export async function login(userName: string, password: string ) {
    const user = await prisma.admin.findFirst({ where: { userName:userName} })
    console.log('second');
    if (!user) {
        console.log('hello');
        throw Boom.badRequest('Username or password is incorrect.')
    }

    const passwordMatch = password === user.password;
    console.log(passwordMatch);

    if (!passwordMatch) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   
    const accessToken = createAccessToken(userName)

    const refreshToken = createRefreshToken(userName)

    return { accessToken, refreshToken }
    
}