import { Router } from 'express'
import * as adminController from '../controllers/admin.controller'
import { validate } from '../utils/validators'
import { loginBodyDTO } from '../validator/loginvalidator'
import { authenticateToken } from '../middleware/authenticate.middleware'
const router = Router()


router.post('../admin/login',adminController.login)
router.get('/dashboard', adminController.dashboard)
export default Router


