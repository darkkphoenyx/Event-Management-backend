/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../libs/prisma'
import Boom from '@hapi/boom'

//GET Team
export const getTeams = async () => {
    try {
        return await prisma.team.findMany({
            where: {
                status: 'Verified',
            },
            select: {
                id: true,
                teamName: true,
                projectId: true,
            },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound('No any verified data found.')
        } else {
            throw err
        }
    }
}

//GET members
export const getId = async (id: number) => {
    try {
        const getMember = await prisma.members.findMany({
            where: { teamId: Number(id) },
            select: {
                id: true,
                name: true,
            },
        })
        return getMember
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw Boom.notFound('error getting member info')
        } else {
            throw error
        }
    }
}

//UPDATE attendance
export const memberAttendance = async (id:number) => {
    try {
        await prisma.attendance.create({
            data: {
                date: new Date(),
                membersId: id,
            },
        })
    } catch (e: any) {
        throw e
    }
}
