let mongoose=require('mongoose')



let userSchema=   new mongoose.Schema({
name : String,
age : Number,

})

module.exports=mongoose.model('User',userSchema)