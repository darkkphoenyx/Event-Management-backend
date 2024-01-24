import express, { NextFunction, Request, Response } from 'express'

import memberRoute from './routes/member.router'
import buildError from './utils/build-error'
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use('/members', memberRoute)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const error = buildError(err)
    res.status(error.code).json({ error })
})

export default app
