import express from 'express'
import memberRouter from './routes/member.router'
import adminRouter from './routes/admin.router'
import { Request, Response, NextFunction } from 'express'
import buildError from './utils/build-errors'

const app = express()

app.use(express.json())

const PORT = 3000
app.listen(PORT, () =>
    console.log(`Server ready at: https://localhost:${PORT}`)
)

app.use('/todos', memberRouter)
app.use('/admin', adminRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const error = buildError(err)
    res.status(error.code).json({ error })
})
export default app
