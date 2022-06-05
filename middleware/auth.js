module.exports = (req,res,next) =>{
    if (!req.session.isAuthed){
        res.redirect('/admin/user/login')
    }
    next()
}