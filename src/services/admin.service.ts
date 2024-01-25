import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom'
import prisma from '../utils/prisma'
import bcrypt from 'bcryptjs'

import {
    createAccessToken,
    verifyRefreshToken,
    verifyAccessToken,
    createRefreshToken,
} from '../utils/token.util'

//LOGIN
export const login = async (username: string, password: string) => {
    const adminUsername =process.env.ADMIN_USERNAME
    if (adminUsername !== username) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    const adminpassword = process.env.ADMIN_PASSWORD

    if (adminpassword!==password) {
        throw Boom.badRequest('Username or password is incorrect.')
    }
    const accessToken = createAccessToken(username)
    const refreshToken = createRefreshToken(username)

    return { accessToken, refreshToken }


}