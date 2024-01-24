import { PrismaClient } from '@prisma/client'
import Boom from '@hapi/boom'
import prisma from '../libs/prisma'
export const postMember = async (data:any) => {
    try {
        const createdMember = await prisma.members.create({
            data,
            
        })
        console.log("this is service ")

        return createdMember
    } catch (err: any) {
        if (err.code === 'P2002' ) {
            throw Boom.badRequest( `Data cannot be entered in Database` )
        }

        throw err
    }
}

