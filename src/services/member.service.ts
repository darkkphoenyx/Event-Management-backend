import { number } from 'zod';
import prisma from '../libs/prisma'
import sdk, {ID} from 'node-appwrite'

const client = new sdk.Client();

const storage = new sdk.Storage(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('65bcac05530c93449f12') // Your project ID
    .setKey('1ca4f77096e2c3661044370fc009bd79076ddc3a165bc640915dd438b0455da69e5cea10489ed6f61573bfb3757925541553172377f06bb72f1a28306a9a76dfafa4bc6f0ac9034d8cdd6f5a94f95fba7fdd21942e248400baf40d6fc5ee695ca19edefae13b098fa96e22369e5e5ededed05610ce0e0066fe33ce5130308b3e') // Your secret API key
;


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

//STORE pictures
export const imgUrl = async(file: Buffer, fileName :string)=>{

    try { 
    const promise = storage.createFile('65bcac40a8e5bf1b6263', ID.unique(), sdk.InputFile.fromBuffer(file,fileName));
    const fileID = (await promise).$id
    const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/65bcac40a8e5bf1b6263/files/${fileID}/view?project=65bcac05530c93449f12`
    return  fileURL
      } catch (error) {
        throw error
      }
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
