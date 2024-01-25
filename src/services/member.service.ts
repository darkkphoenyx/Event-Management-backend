import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
import prisma from '../libs/prisma'
import { string } from 'zod';
export const postMember = async (data:any) => {
    try {
        const { projectname, teamname, faculty, semester, email, status } = data;
        // Assuming Team and Project models are related
    const createdTeam = await prisma.team.create({
      data: {
        teamName:teamname,
        faculty,
        semester,
        status,
        project: {
          connect: { id: projectID }
        },
      },
      include: {
        project: true,
      },
    });
    return createdTeam;
    } catch (err: any) {
        console.error('Error creating team:', err);
        if (err.code === 'P2002' ) {
            throw Boom.badRequest( `Data cannot be entered in Database` )
        }
        throw err
    }
}

