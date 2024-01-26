/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from 'express'
import * as adminService from '../services/admin.service'
import path from 'path'
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

//get request status
export const getStatus = async (
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
import qrcode from 'qrcode'
import nodemailer from 'nodemailer'
// eslint-disable-next-line @typescript-eslint/require-await
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
            user: 'xtmeopbadalund@gmail.com',
            pass: 'ltnj nfrv poga yich',
        },
    })

    const mailOptions = {
        from: 'xtmeopbadalund@gmail.com',
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
     Dear ${captainName}, ${faculty}\n
     Semester : ${semester}\n
      I trust this email finds you well, We appreciate your continued participation  in the Texas Expo. As a part of our ongoing commitment to security and  To ensure the accuracy and security of your Team information , we kindly    request to Check for verification process at your earliest convenience. This 
      process is simple and should only take a few minutes of your time  request to Check for verification process at your earliest convenience. This process is simple and should only take a few minutes of your time \n
     
     
      Here are the steps to complete the verification : \n

      1. Click or dowload the following qr code
      2. This will verify that you are At Expo Event and that you have Authroized to Canteen food.
      We understand the importance of your time and assure you that this process is designed to enhance the security of your account and safeguard your sensitive information.\n
    
      Please do not hesitate to reach out to our dedicated support team at [Support Email/Phone Number]. We are here to assist you every step of the way.\n 

      Thank you for your prompt attention to this matter. We value your trust and look forward to continuing to serve you.

     Best regards,



    `
    console.log(response)

    const formedString = `${teamName} Led By ${captainName} is Authroized or Verified ${status} from ${faculty}, ${semester}`
    try {
        await generateQRCode(formedString, outputImagePath)
        await sendEmail(
            email,
            'QR CODE VERIFICATION',
            paragraph,
            outputImagePath
        )
        res.send('Email sent SuccessFully!')
    } catch (err) {
        res.status(500).send('Error sending email')
    }
}

export const displayVerified = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const displayData = await adminService.displayData()
        res.status(201).json({
            message: 'Here it is your list of verified Teams',
            data: {
                displayData,
            },
        })
    } catch (err: any) {
        next(err)
    }
}
