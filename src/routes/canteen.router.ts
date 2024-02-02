import { Router } from "express";
import * as canteenController from '../controllers/canteen.controller'
const router = Router()

router.get('/:value',canteenController.checkStatus)

export default router