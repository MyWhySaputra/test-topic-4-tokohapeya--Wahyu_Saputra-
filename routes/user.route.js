const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/user.controller')
const { CheckPostReq } = require('../middleware/middleware')

router.get('/', Get)
router.post('/', CheckPostReq, Insert)
router.get('/:id', GetByPK)
router.put('/:id', Update)
router.delete('/:id', Delete)

module.exports = router