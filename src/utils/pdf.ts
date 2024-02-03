/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import PDFDocument from 'pdfkit'
// import fs from 'fs';
import fs from 'fs'
import nodemailer from 'nodemailer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const generateIDCardPDF = async (
    members: any,
    TeamName: any,
    ProjectName: any
) => {
    const pdfPaths = []

    for (const member of members) {
        const doc = new PDFDocument({
            size: [400, 600],
        })

        const pdfPath = `./pdfs/${member.name}_IDCard.pdf`
        pdfPaths.push(pdfPath)

        const stream = fs.createWriteStream(pdfPath)
        doc.pipe(stream)

        doc.font('Helvetica-Bold')
        doc.fontSize(18).text('Member ID Card', { align: 'center' })
        doc.moveDown().moveDown()

        doc.moveDown().moveDown().moveDown().moveDown().moveDown()
        doc.fontSize(16)
            .fillColor('#555')
            .text(`Name: ${member.name}`, { align: 'center' })
        doc.moveDown().moveDown()
        doc.fontSize(16)
            .fillColor('#555')
            .text(`Member ID: ${member.id}`, { align: 'center' })
        doc.moveDown().moveDown()
        doc.fontSize(16)
            .fillColor('#555')
            .text(`Team Name:${TeamName}`, { align: 'center' })
        doc.moveDown().moveDown()
        doc.fontSize(16)
            .fillColor('#555')
            .text(`Project Name: ${ProjectName}`, { align: 'center' })
        doc.moveDown()

        doc.fontSize(12)
            .fillColor('#777')
            .text('This ID card is valid for access to specific areas.', {
                align: 'center',
            })

        // const pageWidth = doc.page.width;
        // const imageWidth = 150;
        // const xCoordinate = (pageWidth - imageWidth) / 2;
        // const texas = `src/utils/texas.png`;
        // doc.image(texas, xCoordinate, doc.y, { width: imageWidth });
        doc.moveDown()

        doc.end()

        // Save the PDF path to the database
        await prisma.members.update({
            where: { id: member.id },
            data: { pdfPath },
        })
    }

    return pdfPaths
}

export const sendEmailWithAttachments = async (
    pdfPaths: any,
    recipientEmail: any
) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eventmanagement.texas@gmail.com',
            pass: 'tgvb ynwk xcol xlig',
        },
    })

    const mailOptions = {
        from: 'eventmanagement.texas@gmail.com',
        to: recipientEmail,
        subject: 'ID Cards',
        text: 'Attached are your ID Cards.',
        attachments: pdfPaths.map((pdfPath: any) => ({
            filename: pdfPath.split('/').pop(),
            path: pdfPath,
            encoding: 'base64',
        })),
    }

    return transporter.sendMail(mailOptions)
}
