import { Prisma, PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
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

import {
    createAccessToken,
    verifyRefreshToken,
    verifyAccessToken,
    createRefreshToken,
} from '../utils/token.util'

//LOGIN
export const login = async (username: string, password: string) => {
    const adminUsername =process.env.ADMIN_USERNAME
    if (adminUsername !== username) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    const adminpassword = process.env.ADMIN_PASSWORD

    if (adminpassword!==password) {
        throw Boom.badRequest('Username or password is incorrect.')
    }
    const accessToken = createAccessToken(username)
    const refreshToken = createRefreshToken(username)

    return { accessToken, refreshToken }


}