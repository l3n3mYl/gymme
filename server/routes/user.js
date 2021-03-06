const { Router } = require('express')
const userController = require('../controllers/users')
const protectedController = require('../controllers/protected')
const { withJWTAuthMiddleware } = require('express-kun')
const router = Router()
const secret = process.env.SECRET_KEY || 'yourSecretKey'

const protectedRouter = withJWTAuthMiddleware(router, secret)

router.post('/', userController.create)
router.post('/login', userController.login)
router.get('/del', userController.del)
router.post('/verifyJWT', userController.verifyJWT)
protectedRouter.get('/getInfo', protectedController.getInfo)
protectedRouter.post('/changeInfo', protectedController.changeInfo)
protectedRouter.post('/changePlan', protectedController.changePlan)

module.exports = router
