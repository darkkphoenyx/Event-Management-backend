import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
import prisma from '../libs/prisma'

const createProject = async (title:string, description:string) => {
  const project = await prisma.project.create({
      data: {
          title,
          description,
      },
  });
  return project;
};

export const createTeam = async (teamName:string, faculty:string, semester:number, captainName:string,email:string, projectName:string, description:string) => {
    console.log("line no 16 in service");
    
  try{
    const project = await createProject(projectName, description); // Create or find the project
    const team = await prisma.team.create({
      data: {
            teamName: teamName,
            faculty,
            semester,
            captainName,
            email:email,
            projectId: project.id,
        },        
    });
    return team;
  }
  catch(err)
  {
    console.log(err,"this is error");
    throw err
  }
};

export const createMembers = async (teamId:number, members:any) => {
    console.log('line no 40 in service');
    console.log(members, "this is a member")
    try{
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
    }
    catch(err)
    {
        console.log(err,"this is error in member table");
        throw err
    }
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

// // Assuming you want to associate members with the team
// const createdMembers = await createMembers(team.id, teamData.members);

// console.log('Team:', team);
// console.log('Members:', createdMembers);
