<<<<<<< HEAD






import { Router } from 'express'
import * as adminController from '../controllers/admin.controller'
import { validate } from '../utils/validators'
import { loginBodyDTO } from '../validator/loginvalidator'
import { authenticateToken } from '../middleware/authenticate.middleware'
const router = Router()

router.post('../admin/login',adminController.login)
export default Router

=======
import { Router } from 'express'
import * as adminController from '../controllers/admin.controller'
const router = Router()

router.get('/dashboard', adminController.dashboard)

export default router
>>>>>>> 914c8dd67ec7d4e964d7a0f357847a5c53e27933
