// import { Router } from 'express'
// import * as adminController from '../controllers/admin.controller'
// import { validate } from '../utils/validators'
// import { loginBodyDTO, loginSchema } from '../validator/loginvalidator'
// import { authenticateToken } from '../middleware/authenticate.middleware'
// const router = Router()

// //LOGIN
// router.post('/login',validate(loginSchema),adminController.login)

// //Display dashboard (all data)
// router.get('/dashboard', authenticateToken,adminController.dashboard)

// //GET pending
// router.get('/dashboard/status/pending',authenticateToken,adminController.getRequest)

// //Verification
// router.patch('/dashboard/verify/:id',authenticateToken,adminController.sendVerification)

// //REJECT
// router.patch('/dashboard/reject/:id',authenticateToken,adminController.rejectStatus)

// //GET verified
// router.get('/dashboard/status/verified',authenticateToken,adminController.displayVerified)



// export default router


