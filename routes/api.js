// router
const router = require('express').Router()

// import controllers review, products
const userController = require('../controllers/userController.js')





// use routers
router.post('/local', userController.local)


router.post('/addUser', userController.addUser)
router.get('/users', userController.users)
router.post('/userById', userController.userById)
router.post('/removeUser', userController.removeUser)
router.post('/restoreUser', userController.restoreUser)
router.get('/softDeleteUsers', userController.softDeleteUsers)
router.post('/updateUser', userController.updateUser)
router.post('/removeTableRecord', userController.removeTableRecord)
router.post('/addMaltiUsers', userController.addMaltiUsers)
router.get('/usersCounts', userController.usersCounts)
router.get('/rawQuery', userController.rawQuery)
router.get('/oneToOne', userController.oneToOne)
router.get('/hasOne', userController.hasOne)
router.get('/scopes', userController.scopes)
router.get('/loading', userController.loading)



module.exports = router