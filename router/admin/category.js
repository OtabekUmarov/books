const {Router} = require('express')
const router = Router()
const Category = require('../../model/category')

router.get('/',async(req,res)=>{
    let category = await Category.find().sort({_id:-1}).lean()
    category = category.map(cat=>{
        cat.status = cat.status == 1 ? '<span class="badge bg-success">Faol</span>' : '<span class="badge bg-warning">O\'chirilgan</span>'
        return cat
    })
    res.render('admin/category',{
        title:"Kategoriyalar ro'yhati",
        category, isCategory:true
    })
})  

router.get('/delete/:id',async(req,res)=>{
    let _id = req.params.id
    await Category.findByIdAndRemove(_id)
    res.redirect('/admin/category')
})

router.get('/status/:id',async(req,res)=>{
    let _id = req.params.id
    let category = await Category.findOne({_id})
    category.status = category.status == 0 ? 1 : 0
    await category.save()
    res.redirect('/admin/category')
})
router.post('/',async(req,res)=>{
    let {title,order,status} = req.body
    status = status || 0
    let newCategory = await new Category({title,order,status})
    await newCategory.save()
    res.send(JSON.stringify('ok'))
})
router.post('/save',async(req,res)=>{
    let {_id,title,order,status} = req.body
    status = status || 0
    let category = {title,order,status}
    await Category.findByIdAndUpdate(_id,category)
    res.redirect('/admin/category')
})

module.exports = router
