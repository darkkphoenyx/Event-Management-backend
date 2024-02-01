
import { number } from 'zod';
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


//CREATE stall
const createStall =async () => {
    return prisma.stall.create({
        data:{
            stallId : 1,
        },
        select:
        {
            id:true,
        }
    })
}

//CREATE stream
const createStream = async (level:string,option:string,value:number) => {
    return prisma.stream.create({
        data:{
            level,  
            option,
            value,
        }
    })
}


export const createTeam = async (teamName:string, projectName:string,level:string, option:string, value:number,captainName:string,email:string, description:string) => {
  try{
    const project = await createProject(projectName, description); // Create or find the project
    const stall = await createStall()
    const stream = await createStream(level,option,value)
    const team = await prisma.team.create({
      data: {
            teamName: teamName,
            streamId:stream.id,
            captainName,
            email:email,
            projectId: project.id,
            stallId:stall.id
        },        
    });
    return team;
  }
  catch(err)
  {
    throw err
  }
};

export const createMembers = async (teamId:number, members:any) => {
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
        throw err
    }
};
