const {Router} = require('express')
const router = Router()
const User = require('../model/user')
const auth = require('../middleware/auth')

router.get('/',auth,async(req,res)=>{
    let users = await User.find().lean()
    res.render('users/index',{
        title:'Foydalanuvchilar',
        users
    })
})


router.get('/login',(req,res)=>{
    res.render('users/login',{
        layout:'no-head',
        error: req.flash('error')
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if (err) throw err
        res.redirect('/admin')
    })
})

router.post('/login',(req,res)=>{
    const {login,password} = req.body
    if (login == 'admin' && password == '123123d.'){
        req.session.isAuthed = true
        res.redirect('/admin')
    } else {
        req.flash('error','Login parolda yoki sizda xatolik bor!')
        res.redirect('/user/login')
    }
})

module.exports = router