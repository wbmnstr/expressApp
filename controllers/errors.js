exports.get404Page=(req,res)=>{
    res.status(404);
    res.render('404',{'title':'SAYFA YOK :('});
}