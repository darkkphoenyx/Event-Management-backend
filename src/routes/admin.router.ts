/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as adminController from '../controllers/admin.controller'
import { validate } from '../utils/validators'
import { loginBodyDTO, loginSchema } from '../validator/loginvalidator'
import { authenticateToken } from '../middleware/authenticate.middleware'
const router = Router()


router.post('/login',validate(loginSchema),adminController.login)

//Display dashboard (all data)
router.get('/dashboard', authenticateToken,adminController.dashboard)

//GET pending
router.get('/dashboard/status/pending',authenticateToken,adminController.getStatus)

//Verification
router.put('/dashboard/verify/:id',authenticateToken,adminController.sendVerification)

//REJECT
router.put('/dashboard/reject/:id',authenticateToken,adminController.rejectStatus)

//GET verified
router.get('/dashboard/status/verified',authenticateToken,adminController.displayVerified)



export default router


