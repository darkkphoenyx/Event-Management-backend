/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import memberRouter from './routes/member.router'
import adminRouter from './routes/admin.router'
import buildError from './utils/build-errors'
import HttpStatus from 'http-status-codes'




const app = express()

app.use(express.json())

const PORT = 3000
app.listen(PORT, () =>
    console.log(`Server ready at: https://localhost:${PORT}`)
)

app.use('/todos', memberRouter)
app.use('/admin', adminRouter)


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
