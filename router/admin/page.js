const {Router} = require('express')
const router = Router()
const Category = require('../../model/category')
const Atribut = require('../../model/atribut')
const Book = require('../../model/book')
const Message = require('../../model/message')

router.get('/',async(req,res)=>{
    let category = await Category.find({status:1}).sort({order:1}).lean()
    let book = await Book.find({status: 1}).limit(8).sort({order:1}).lean()
    let booktop = await Book.find({status:1}).lean()
    let booklen = await Book.find().lean()
    let atribut = await Atribut.find().lean()
    booklen = booklen.length
    res.render('home',{
        isHome:true,
        layout: 'site',
        success: req.flash('success'),
        title: 'Bosh sahifa',
        category, book, booklen,atribut, booktop
    })
})

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


router.get('/category',async(req,res)=>{
    let atribut = await Category.find({status:1}).sort({order:1}).lean()
    let book = await Book.find({status: 1, news:1}).limit(8).sort({order:1}).lean()
    
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
    res.render('categoryid',{
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
    let category = await Atribut.find({status:1}).sort({order:1}).lean()
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
router.get('/books/:id',async(req,res)=>{
    let _id = req.params.id
    let book = await Book.findOne({_id}).sort({order:1}).lean()
    res.render('booksid',{
        isHome:true,
        layout: 'site',
        title: book.title,
        book
    })
})
router.post('/message', async (req, res) => {
    const { fullname,phone,message } = req.body
    const messages = await new Message({fullname,phone,message})
    await messages.save()
    req.flash('success', 'Xabaringiz adminlar uchun yuborildi!')
    res.redirect('/')
  })

module.exports = router