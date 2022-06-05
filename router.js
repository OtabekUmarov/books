const {Router} = require('express')
const router = Router()
const auth = require('./middleware/auth')


// admin router
router.use('/',auth,require('./router/admin/page'))
router.use('/api',require('./router/api'))
router.use('/admin/user',require('./router/admin/user'))
router.use('/admin/category',auth,require('./router/admin/category'))
router.use('/admin/atribut',auth,require('./router/admin/atribut'))
router.use('/admin/book',auth,require('./router/admin/book'))

// site router

module.exports = router