import { Prisma, PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
import {
    createAccessToken,
    verifyRefreshToken,
    verifyAccessToken,
    createRefreshToken,
} from '../utils/token.util'
import * as dotenv from 'dotenv'
dotenv.config();



const prisma = new PrismaClient()

export const getDashboard = async () => {
    const teams = await prisma.team.findMany({
        select: {
            id: true,
            teamName: true,
            faculty: true,
            semester: true,
            projectID: true,
        },
    })

    const projects = await Promise.all(
        teams.map(async (team) => {
            const project = await prisma.project.findFirst({
                where: {
                    id: team.projectID,
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
                projectID: team.projectID,
                'project-name': project ? project.title : null,
            }
        })
    )
    return projects
}



export async function login(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    const passwordMatch = await(password, user.password)

    if (!passwordMatch) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const accessToken = createAccessToken(user.id, user.isAdmin)

    const refreshToken = createRefreshToken(user.id, user.isAdmin)

    return { accessToken, refreshToken }
}