/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import qrcode from 'qrcode'
import nodemailer from 'nodemailer'
export async function generateQRCode(
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
//sending mail for verification
export async function sendEmail(
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

//sending mail for reject
export async function sendMailForReject(email: any, paragraph: any) {
    const transporter: any = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eventmanagement.texas@gmail.com',
            pass: 'tgvb ynwk xcol xlig',
        },
    })

    const methodOption = {
        from: 'eventmanagement.texas@gmail.com',
        to: email,
        subject: 'Notice of Proposal/Application Status --TEXAS EXPO 2024',
        text: paragraph,
    }

    try {
        const info = await transporter.sendMail(methodOption)
        console.log('Email sended SuccessFully', (await info).response)
    } catch (err) {
        console.log(err)
    }
}
