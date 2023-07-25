const mongoose = require("mongoose")

const dairy=new mongoose.Schema({
name:{
    type:String,
    require:true,
},
pass:{
    type:String ,
    require:true,
}


})
module.exports=mongoose.model('dairy',dairy);