/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as attendanceController from '../controllers/attendance.controller'
// import { authenticateToken } from '../middleware/authenticate.middleware'
const router = Router()

//GET verified team 
router.get('/',attendanceController.getAttendance)

//GET members by id
router.get('/:id',attendanceController.getById)

//POST attendance
router.post('/:id',attendanceController.postAttendance)

export default router;
