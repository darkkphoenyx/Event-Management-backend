import express from 'express'
import * as memberController from '../controllers/member.controller'
import  {memberValidator} from '../validator/member.validator'
import { validate } from '../utils/validate'

const router = express.Router()

router.post('/register', validate(memberValidator),memberController.createMember)

export default router
