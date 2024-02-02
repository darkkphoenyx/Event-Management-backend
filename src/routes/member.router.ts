import express from 'express'
import * as memberController from '../controllers/member.controller'
import  {memberValidator} from '../validator/member.validator'
import { validate } from '../utils/validate'
import multer from 'multer'
import base64Img from 'base64-img'

const router = express.Router()
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.get('/pics/:id',memberController.pics)
router.post('/upload',upload.single('userPicture'),memberController.upload)
router.post('/register', validate(memberValidator),memberController.createMember)

export default router
