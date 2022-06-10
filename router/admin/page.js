const {Router} = require('express')
const router = Router()
const Category = require('../../model/category')
const Atribut = require('../../model/atribut')
const Book = require('../../model/book')

router.get('/admin',async(req,res)=>{
    let category = await Category.find().lean()
    let atribut = await Atribut.find().lean()
    let book = await Book.find().lean()
    let bookTop = await Book.find({top:1}).lean()
    res.render('admin',{
        isHome:true,
        title: 'Bosh sahifa',
        category, atribut, book,bookTop
    })
})

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

router.get('/category',async(req,res)=>{
    let atribut = await Category.find({status:1}).sort({order:1}).lean()
    let book = await Book.find({status: 1, top:1}).limit(8).sort({order:1}).lean()
    res.render('category',{
        isHome:true,
        layout: 'site',
        title: 'Kitob turlari',
        atribut, book
    })
})
router.get('/category/:id',async(req,res)=>{
    let _id = req.params.id
    let atribut = await Atribut.find({status:1, category: _id}).sort({order:1}).lean()
    let book = await Book.find({status: 1, top:1}).limit(8).sort({order:1}).lean()
    // let bookTop = await Book.find({top:1}).lean()
    res.render('category',{
        isHome:true,
        layout: 'site',
        title: 'Kitob turlari',
        atribut, book
    })
})
router.get('/genre',async(req,res)=>{
    let category = await Atribut.find({status:1}).sort({order:1}).lean()
    let book = await Book.find({status: 1}).limit(8).sort({order:1}).lean()
    res.render('genre',{
        isHome:true,
        layout: 'site',
        title: 'Kitoblar',
        category, book
    })
})
router.get('/genre/:id',async(req,res)=>{
    let _id = req.params.id
    let category = await Category.find({status:1}).sort({order:1}).lean()
    let book = await Book.find({atribut:_id,status: 1, top:1}).limit(8).sort({order:1}).lean()
    // let bookTop = await Book.find({top:1}).lean()
    res.render('genre',{
        isHome:true,
        layout: 'site',
        title: 'Kitoblar',
        category, book
    })
})
router.get('/books',async(req,res)=>{
    let category = await Category.find({status:1}).sort({order:1}).lean()
    let book = await Book.find({status: 1}).sort({order:1}).lean()
    res.render('books',{
        isHome:true,
        layout: 'site',
        title: 'Kitoblar',
        category, book
    })
})

module.exports = router