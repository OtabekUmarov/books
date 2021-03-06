const {Router} = require('express')
const router = Router()
const auth = require('./middleware/auth')


// admin router
router.use('/',require('./router/admin/page'))
router.use('/api',require('./router/api'))
router.use('/admin/user',require('./router/admin/user'))
router.use('/admin/category',auth,require('./router/admin/category'))
router.use('/admin/atribut',auth,require('./router/admin/atribut'))
router.use('/admin/book',auth,require('./router/admin/book'))
router.use('/admin/message',auth,require('./router/admin/message'))

module.exports = router