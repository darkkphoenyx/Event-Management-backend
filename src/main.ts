/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import memberRouter from './routes/member.router'
import adminRouter from './routes/admin.router'
import canteenRouter from './routes/canteen.router'
import buildError from './utils/build-errors'
import HttpStatus from 'http-status-codes'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use('/members', memberRouter)
app.use('/admin', adminRouter)
app.use('/canteen',canteenRouter)

app.use(function METHOD_NOT_ALLOWED(req: Request, res: Response) {
    res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
        error: {
            code: HttpStatus.METHOD_NOT_ALLOWED,
            message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
        },
    })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const error = buildError(err)
    res.status(error.code).json({ error })
})

export default app
