import { Router } from 'express'
import * as adminController from '../controllers/admin.controller'
const router = Router()

router.get('/dashboard', adminController.dashboard)

export default router
