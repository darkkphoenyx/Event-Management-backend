/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
//creating an qrcode and sending it as the email

import qrcode from 'qrcode'
import nodemailer from 'nodemailer'
// eslint-disable-next-line @typescript-eslint/require-await
export const generateqrcode = async (userData: any, OutputImagepath: any) => {
    try {
        qrcode.toFile(OutputImagepath, userData)
        console.log('QR CODE IS GENERATING', OutputImagepath)
    } catch (err: any) {
        console.log('Error generating QR CODE', err.message)
        throw err
    }
}

export const verificationemail = async (
    toEmail: any,
    subject: string,
    text: string,
    attachmentPath: any
) => {
    //creating an transport path
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'xtmeopbadalund@gmail.com',
            pass: '',
        },
    })

    let methodOption = {
        from: 'xtmeopbadalund@gmail.com',
        to: toEmail,
        subject: subject,
        text: text,
        attachment: [
            {
                filename: 'qrcode.png',
                path: attachmentPath,
                cid: 'qrcode',
            },
        ],
    }

    try {
        const info = transporter.sendMail(methodOption)
        console.log('Email sent Successfully', (await info).response)
    } catch (err: any) {
        console.log('Error sending email', err.message)
        throw err
    }
}
