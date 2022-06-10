const {Router} = require('express')
const router = Router()
const Book = require('../../model/book')
const upload = require('../../middleware/file')
const Atribut = require('../../model/atribut')
const Category = require('../../model/category')

router.get('/',async(req,res)=>{
    let book = await Book.find().populate('atribut').sort({_id:-1}).lean()
    let atribut = await Atribut.find().populate('category').sort({_id:-1}).lean()
    book = book.map(item=>{
        item.top = item.top == 1 ? '<span class="badge bg-success">Top kitob</span>' : '<span class="badge bg-warning">Yo`q</span>'
        item.news = item.news == 1 ? '<span class="badge bg-success">Yangi kitob</span>' : '<span class="badge bg-warning">Yo`q</span>'
        item.status = item.status == 1 ? '<span class="badge bg-success">Faol</span>' : '<span class="badge bg-warning">O`chirilgan</span>'
        return item
    })
    res.render('admin/book/index',{
        title:'Kitoblar ro`yhati',
        book, isBook:true, atribut
    })
})  

router.get('/view/:id',async(req,res)=>{
    let _id = req.params.id
    let book = await Book.findOne({_id}).populate('atribut').lean()
    book.top = book.top == 1 ? '<span class="badge bg-success">Top kitob</span>' : '<span class="badge bg-warning">Yo`q</span>'
    book.news = book.news == 1 ? '<span class="badge bg-success">Yangi kitob</span>' : '<span class="badge bg-warning">Yo`q</span>'
    book.status = book.status == 1 ? '<span class="badge bg-success">Faol</span>' : '<span class="badge bg-warning">O`chirilgan</span>'
    // book.review = book.review.map(item=>{
    //     item.createdAt = item.createdAt.toLocaleString()
    //     item.status = item.status == 1 ? '<span class="badge bg-success">Активные</span>' : '<span class="badge bg-warning">Отключен</span>'
    //     return item
    // })
    res.render('admin/book/view',{
        title: `${book.title}`,
        book
    })
})

router.get('/delete/:id',async(req,res)=>{
    let _id = req.params.id
    await Book.findByIdAndRemove(_id)
    res.redirect('/admin/book')
})

router.get('/status/:id',async(req,res)=>{
    let _id = req.params.id
    let book = await Book.findOne({_id})
    book.status = book.status == 0 ? 1 : 0
    await book.save()
    res.redirect('/admin/book')
})
router.get('/top/:id',async(req,res)=>{
    let _id = req.params.id
    let book = await Book.findOne({_id})
    book.top = book.top == 0 ? 1 : 0
    await book.save()
    res.redirect('/admin/book')
})
router.get('/news/:id',async(req,res)=>{
    let _id = req.params.id
    let book = await Book.findOne({_id})
    book.news = book.news == 0 ? 1 : 0
    await book.save()
    res.redirect('/admin/book')
})


router.post('/',async(req,res)=>{
    let data = req.body
    data.status = data.status || 0
    data.top = data.top || 0
    data.news = data.news || 0
        let img = req.files && req.files.img1
        let file = req.files && req.files.file
        const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let imgpath = `uploads/${uniquePreffix}_${img.name}`
        let filepath = `uploads/${uniquePreffix}_${file && file.name}`
        data.img = imgpath
        data.file = filepath
        // await newBook.save()
        // res.send(JSON.stringify('ok'))
        if (file) {
            file.mv(filepath,async err => {
                if (err) res.send(JSON.stringify(err))
                img.mv(imgpath,async err => {
                    if (err) res.send(JSON.stringify(err))
                    let newBook = await new Book(data)
                    await newBook.save()
                    res.send(JSON.stringify('ok'))
                })
            })
        } else {
            img.mv(imgpath,async err => {
                if (err) res.send(JSON.stringify(err))
                let newBook = await new Book(data)
                await newBook.save()
                res.send(JSON.stringify('ok'))
            })
        }
})


module.exports = router
