import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
import prisma from '../libs/prisma'
// import { string } from 'zod';
// export const postMember = async (data:any) => {
//     try {
//         const { projectname, teamname, faculty, semester, email, status } = data;
//         // Assuming Team and Project models are related
//     const createdTeam = await prisma.team.create({
//       data: {
//         teamName:teamname,
//         faculty,
//         semester,
//         status,
//         project: {
//           connect: { id: projectID }
//         },
//       },
//       include: {
//         project: true,
//         members:true,
//       },
//     });
//     return createdTeam;
//     } catch (err: any) {
//         console.error('Error creating team:', err);
//         if (err.code === 'P2002' ) {
//             throw Boom.badRequest( `Data cannot be entered in Database` )
//         }
//         throw err
//     }
// }



const createProject = async (title:string, description:string) => {
  const project = await prisma.project.create({
      data: {
          title,
          description,
      },
  });
  return project;
};

const createTeam = async (teamName:string, faculty:string, semester:number, email:string, projectName:string) => {
  const project = await createProject(projectName, ''); // Create or find the project
  const team = await prisma.team.create({
      data: {
          teamName: teamName,
          faculty,
          semester,
          email:email,
          projectId: project.id,
      },
  });
  return team;
};

const createMembers = async (teamId:number, members:any) => {
  const createdMembers = await Promise.all(
      members.map(async (memberName: any) => {
          const member = await prisma.members.create({
              data: {
                  name: memberName,
                  teamId,
              },
          });
          return member;
      })
  );
  return createdMembers;
};

// const teamData = {
//   teamName: 'Team A',
//   faculty: 'Engineering',
//   semester: 'Spring 2024',
//   email: 'teamA@example.com',
//   projectName: 'Project A',
//   teamCaptain: 'Captain Name', // Assuming you have a team captain field
//   members: ['member 1', 'member 2', 'member 3'],
// };

// const team = await createTeam(
//   teamData.teamName,
//   teamData.faculty,
//   teamData.semester,
//   teamData.email,
//   teamData.projectName
// );

// Assuming you want to associate members with the team
const createdMembers = await createMembers(team.id, teamData.members);

console.log('Team:', team);
console.log('Members:', createdMembers);
