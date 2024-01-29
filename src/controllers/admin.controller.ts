import { Request, Response, NextFunction } from 'express'
import * as adminService from '../services/admin.service'
import qrcode from 'qrcode'
import nodemailer from 'nodemailer'
import path from 'path'
import {loginBodyDTO} from '../validator/loginvalidator'

//LOGIN
export const login =async(req:Request,res:Response,next:NextFunction
  )=>{
    try{
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
export const getRequest=async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await adminService.getRequest()
        console.log('Request is being verified by admin')
        res.json(response)
    } catch (error) {
        next(error)
    }
}


//send verification status
async function generateQRCode(
    data: string | qrcode.QRCodeSegment[],
    outputPath: string
) {
    try {
        await qrcode.toFile(outputPath, data)
        console.log('QR Code generated successfully:', outputPath)
    } catch (error: any) {
        console.error('Error generating QR Code:', error.message)
        throw error
    }
}

async function sendEmail(
    toEmail: string,
    subject: string,
    text: string,
    attachmentPath: string
) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eventmanagement.texas@gmail.com',
            pass: 'tgvb ynwk xcol xlig',
        },
    })

    const mailOptions = {
        from: 'eventmanagement.texas@gmail.com',
        to: toEmail,
        subject: subject,
        text: text,

        attachments: [
            {
                filename: 'qrcode.png',
                path: attachmentPath,
                cid: 'qrcode',
            },
        ],
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent successfully:', info.response)
    } catch (error: any) {
        console.error('Error sending email:', error.message)
        throw error
    }
}

export const sendVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id: number = parseInt(req.params.id, 10)
    const response = await adminService.verify(id)
    const { teamName, captainName, status, faculty, semester } = response
    const outputImagePath = path.join(__dirname, 'qrcode.png')
    const { email } = response
    const paragraph = ` 
     TeamName : ${teamName} \n 
     Dear ${captainName}\n
     Faculty: ${faculty}\n
     Semester : ${semester}\n
      I trust this email finds you well, We appreciate your continued participation in the Texas Expo.\n
      Your team has been verified successfully. 
      Attached below is a QR for the canteen token for all your team members.
     
     Stall No: 

      
     Best regards,



    `
    console.log(response)

    const formedString = `${teamName} Led By ${captainName} is Authroized or Verified ${status} from ${faculty}, ${semester}`
    try {
        await generateQRCode(formedString, outputImagePath)
        await sendEmail(
            email,
            'Team Verified',
            paragraph,
            outputImagePath
        )
        res.send('Email sent SuccessFully!')
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
export const rejectStatus=async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        const response = await adminService.reject(Number(req.params.id));
        res.json(response)
    }
    catch(error){
        next(error)
    }
    
}


//display status-verified to admin 
export const displayVerified=async(
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
      const response = await adminService.getVerified();
      console.log("Request is being verified by admin")
      res.json(response)
    } 
    catch (error) {
      next(error)
    }
}
  
