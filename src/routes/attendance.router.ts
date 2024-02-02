/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as attendanceController from '../controllers/attendance.controller'
// import { authenticateToken } from '../middleware/authenticate.middleware'
const router = Router()

//GET verified team 
router.get('/attendance',attendanceController.getAttendance)

//GET members by id
router.get('/attendance/:id',attendanceController.getById)

router.get('/stall')
export default router;
