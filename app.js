const express = require("express");
const  mongoose =require("mongoose");
const app=express();
const bodyparser=require("body-parser")
//import model
const dairy =require('./model')
//return for json
app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}));

const url="mongodb+srv://testing:test@atlascluster.ij20tlj.mongodb.net/da?retryWrites=true&w=majority";

//connection
mongoose.connect(url,
    {
    useUnifiedTopology:true,
    useNewUrlParser:true
}).
then(()=>{
    console.log("connect")
}).catch((err)=>{console.log("err")})



app.get('/',(req,res)=>{
    res.send("done")
})

app.post('/post',async(req,res)=>{
   // const data= new dairy({
    //    name:req.body.name,
    //    pass:req.body.pass,
    
   // })
   // data.save().then(()=>{
   //     res.json()
   // }).catch(err=>console.log(err))

const data=new dairy({

name:req.body.name,
pass:req.body.pass

})
try{

await data.save();
return res.json(await dairy.find());
 
}catch{
    console.log("err")
}



})

app.get('/data',async(req,res)=>{
    try{
const all= await dairy.find();
return res.json(all);
    }catch(err){
console.log(err.message)
    }
})

app.get('/data/:id',async(req,res)=>{
    try{
const dd=await dairy.findById(req.params.id);
res.json(dd)
console.log(dd)
    }catch(err){
console.log(err.message)
    }
})
app.delete('/data/:id',async(req,res)=>{
 
 
 //   await dairy.findByIdAndDelete(req.param.id).then(res.json(dairy.find())).catch((err)=>console.log(err.message))  
try{
await dairy.findByIdAndDelete(req.params.id);
return res.json( await dairy.find());
}catch(err){
console.log(err.message)
}


})
app.put('/data/:id',async(req,res)=>{
    try{
        const dd=dairy.findById(req.params.id);
        dd.save();
        res.json(dairy.find())

    }catch(e){
console.log(e.message)
    }
})

app.listen(3030,()=>{
    console.log("done");
})