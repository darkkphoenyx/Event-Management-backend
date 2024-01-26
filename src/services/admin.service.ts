import { Prisma, PrismaClient } from '@prisma/client'
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
