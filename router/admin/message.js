const {Router} = require('express')
const router = Router()
const Message = require('../../model/message')

router.get('/',async(req,res)=>{
    let message = await Message.find().lean()
    res.render('admin/message',{
        title:"Kelib tushgan xabarlar",
        message, isMessage:true
    })
})  


module.exports = router
