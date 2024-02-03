import express from 'express'
import * as memberController from '../controllers/member.controller'
import  {memberValidator} from '../validator/member.validator'
import { validate } from '../utils/validate'
import multer from 'multer'

const router = express.Router()
const storage1 = multer.memoryStorage();
const upload = multer({storage: storage1})


router.post('/upload/picture',upload.single('file'),memberController.upload)
router.post('/register', validate(memberValidator),memberController.createMember)

export default router
