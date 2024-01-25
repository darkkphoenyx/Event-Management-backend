import express from 'express'
import memberRouter from './routes/member.router'
import adminRouter from './routes/admin.router'

const app = express()

app.use(express.json())

const PORT = 3000
app.listen(PORT, () =>
    console.log(`Server ready at: https://localhost:${PORT}`)
)

app.use('/todos', memberRouter)
app.use('/admin', adminRouter)
export default app
