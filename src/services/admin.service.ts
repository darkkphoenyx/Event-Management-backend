/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
const prisma = new PrismaClient()

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
//get request from user
export const getRequest = async () => {
    // Check if the user ID exists in the Database
    try {
        return await prisma.team.findMany({
            where: {
                status: 'pending',
            },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound('No any form submitted yet.')
        } else {
            throw err
        }
    }
}

//request is verified by admin
export const verify = async (id: number) => {
    try {
        const updatedTeam = await prisma.team.update({
            where: { id: Number(id) },
            data: {
                status: 'verified',
            },
        })
        return updatedTeam
    } catch (error: any) {
        // console.log(`Error updating team status: ${error.message}`);
        // throw error; // Rethrow the error to handle it elsewhere if needed
        if (error.code === 'P2025') {
            throw Boom.notFound('update error')
        } else {
            throw error
        }
    }
}
