const {Router} = require('express')
const router = Router()
// const Category = require('../../model/category')
// const Atribut = require('../../model/atribut')
// const Book = require('../../model/book')

router.get('/',async(req,res)=>{
    // let category = await Category.find().lean()
    // let atribut = await Atribut.find().lean()
    // let book = await Book.find().lean()
    // let bookTop = await Book.find({top:1}).lean()
    res.render('index.hbs',{
        isHome:true,
        layout: 'site',
        title: 'Bosh sahifa',
    })
})

module.exports = router