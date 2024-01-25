import * as jwt from 'jsonwebtoken'

// export const createAccessToken = ( username: "admin") => {
    export const createAccessToken = ( username: string) => {
    return jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET as string, 
      {
            expiresIn: '1hr',
        }
    )
}

// export const createRefreshToken = ( username:"admin") => {
    export const createRefreshToken = ( username:string) => {
    return jwt.sign(
        { username},
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: '1d',
        }
    )
}

export const verifyAccessToken = (accessToken: string) => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
}

export const verifyRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
}