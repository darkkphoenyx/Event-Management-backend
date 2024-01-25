/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as adminController from '../controllers/admin.controller'
const router = Router()

router.get('/dashboard', adminController.dashboard)

router.get('/dashboard/status',adminController.getStatus)

router.put('/dashboard/verification/:id',adminController.sendVerification)

export default router
