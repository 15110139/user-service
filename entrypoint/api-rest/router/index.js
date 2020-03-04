const express = require('express')
const router = express.Router()

const {
    createUserController
} = require('../controller/create-user')
const {
    getUserController
} = require('../controller/get-user')

const {
    deleteUserController
} = require("../controller/delete-user")

const {
    updateUserInfoController
} = require('../controller/update-user-info')

const {
    listUserController
} = require('../controller/list-user')

const {
    loginController
} = require('../controller/login')

/**
 * User router
 */

router.post('/user', createUserController)
router.get('/user/:userId', getUserController)
router.get('/user', listUserController)
router.delete('/user/:userId', deleteUserController)
router.put('/user/:userId', updateUserInfoController)
router.post('/login', loginController)


/**
 * Loan request
 */


module.exports.router = router