const {Router} = require('express')
const router = Router()
const auth = require('./middleware/auth')

router.use('/',require('./router/page'))
router.use('/api',require('./router/api'))
router.use('/user',require('./router/user'))
router.use('/admin/category',auth,require('./router/admin/category'))
router.use('/admin/atribut',auth,require('./router/admin/atribut'))
router.use('/admin/book',auth,require('./router/admin/book'))



module.exports = router