import { Router } from 'express'
import * as adminController from '../controllers/admin.controller'
import { validate } from '../utils/validators'
import { loginBodyDTO, loginSchema } from '../validator/loginvalidator'
import { authenticateToken } from '../middleware/authenticate.middleware'
const router = Router()


router.post('/login',adminController.login)
router.get('/dashboard', authenticateToken,validate(loginSchema),adminController.dashboard)
export default router


