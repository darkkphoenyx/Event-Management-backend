/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import * as adminService from '../services/admin.service'
import { generateQRCode, sendEmail, sendMailForReject } from '../utils/email'
import path from 'path'
import { loginBodyDTO } from '../validator/loginvalidator'
import { generateIDCardPDF, sendEmailWithAttachments } from '../utils/pdf'

//LOGIN
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userName, password } = loginBodyDTO.parse(req.body)
        const { accessToken, refreshToken } = await adminService.login(
            userName,
            password
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        }).json({ accessToken })
    } catch (error) {
        next(error)
    }
}

//Dashboard data
export const dashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const dashboardData = await adminService.getDashboard()
        console.log('DashboardDara: ', dashboardData)
        res.send(dashboardData)
    } catch (err) {
        next(err)
    }
}

//get status by admin
export const getRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await adminService.getRequest()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

export const sendVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id: number = parseInt(req.params.id, 10)
    const response = await adminService.verify(id)
    const { teamName, captainName, otp } = response
    const outputImagePath = path.join(__dirname, 'qrcode.png')
    const { email } = response
    //Destruct ani spread use gareko
    const { members } = response
    const [...rest] = members
    //Project Name ko lagi aba
    const { project } = response
    const [...proj] = project
    console.log(proj[0].title)
    //aba Team Name ko lagi
    const { team2 } = response
    const [...tea] = team2
    console.log(tea[0].teamName)

    // console.log([...rest])
    // const sampleMemebers = [...rest]
    // const {[members]} = response;
    const paragraph = ` 
     TeamName : ${teamName} \n 
     Dear Team Captain, ${captainName}\n
      I trust this email finds you well, We appreciate your continued participation in the Texas Expo.\n
      Your team has been verified successfully. 
      Attached below is a QR for the canteen token for all your team members.
     
     Stall No: 

      
    Best regards,



 `
    console.log(response)

    const formedString = `localhost:3000/canteen/${otp}`
    try {
        await generateQRCode(formedString, outputImagePath)
        await sendEmail(email, 'Team Verified', paragraph, outputImagePath)
        const sampleMember = [...rest]
        console.log(sampleMember)
        const ProjectName = proj[0].title
        const TeamName = tea[0].teamName
        const pdfPaths = await generateIDCardPDF(
            sampleMember,
            TeamName,
            ProjectName
        )
        await sendEmailWithAttachments(pdfPaths, email)
        res.json(response)
    } catch (err) {
        res.status(500).send('Error sending email')
    }
}

export const displayDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const displayData = await adminService.getDashboard()
        res.status(201).json({
            message: 'Here it is your list of all Teams',
            data: {
                displayData,
            },
        })
    } catch (err: any) {
        next(err)
    }
}
//REJECT
export const rejectStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await adminService.reject(Number(req.params.id))
        const { teamName } = response
        const { email } = response
        const paragraph = `
        Dear ${teamName},
        
        I regret to inform you that after careful consideration and thorough review, Your team's Registration has not been approved at this time. We appreciate the opportunity to have been considered and value the time and effort invested in the evaluation process. While we understand that our proposal did not meet the necessary criteria or expectations, we remain committed to improving and welcome any constructive feedback that can guide us in enhancing our future submissions. We acknowledge the competitive nature of the selection process and are grateful for the chance to have participated. Despite this setback, we are determined to learn from this experience and continue striving for excellence in our endeavors.
        
        Thank you for your consideration.`
        await sendMailForReject(email, paragraph)
        res.json(response)
    } catch (error) {
        next(error)
    }
}

//display status-verified to admin
export const displayVerified = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await adminService.getVerified()
        console.log('Request is being verified by admin')
        res.json(response)
    } catch (error) {
        next(error)
    }
}
