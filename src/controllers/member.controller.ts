import { NextFunction, Request, Response } from 'express'
import * as memberService from '../services/member.service'
import HttpStatusCode from 'http-status-codes'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()



//UPLOAD picture
export const upload =async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try
    {
        const file = req.file?.buffer
        const fileName = req.file?.filename?? 'unnamed file'
        if(file)
        {
        const uploadPictureURL =await memberService.imgUrl(file, fileName)
        console.log(uploadPictureURL)
        res.json({"url":uploadPictureURL})
        }
    }catch(err)
    {
        throw err
    }
}



// export const pics = async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//     const {id} = req.params
//     try {
//         const picture = await prisma.picture.findUnique({
//           where: { id: parseInt(id) },
//         });
    
//         if (!picture) {
//           return res.status(404).json({ error: 'Picture not found' });
//         }
    
//         // Convert the picture buffer to Base64
//         const base64Image = picture.data.toString('base64');
    
//         // Send the Base64-encoded image as a data URL
//         res.status(200).send(`data:image/png;base64,${base64Image}`);
//       }  catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
// }


export const createMember = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const{teamName, projectName,level, option, value,captainName, email,members,description} = req.body;
        const team = await memberService.createTeam(teamName, projectName,level, option,value,captainName,email,description)
            const member = await memberService.createMembers(team.id,members)
            const response = {
                message: 'Member added successfully',
                member:member,
                team:team,
            }        
            return res.status(HttpStatusCode.CREATED).json(response)
        
    } catch (e) {
        next(e)
    }
}
