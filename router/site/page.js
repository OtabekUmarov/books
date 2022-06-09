const {Router} = require('express')
const router = Router()
const Category = require('../../model/category')
const Atribut = require('../../model/atribut')
const Book = require('../../model/book')

router.get('/',async(req,res)=>{
    let category = await Category.find({status:1}).sort({order:1}).lean()
    // let atribut = await Atribut.find().lean()
    // let book = await Book.find().lean()
    // let bookTop = await Book.find({top:1}).lean()
    res.render('index.hbs',{
        isHome:true,
        layout: 'site',
        title: 'Bosh sahifa',
        category
    })
})
router.get('/category/:id',async(req,res)=>{
    let _id = req.params.id
    let atribut = await Atribut.find({status:1, category: _id}).sort({order:1}).lean()
    // let atribut = await Atribut.find().lean()
    // let book = await Book.find().lean()
    // let bookTop = await Book.find({top:1}).lean()
    res.render('category',{
        isHome:true,
        layout: 'site',
        title: 'Kitob turlari',
        atribut
    })
})
module.exports = router