const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   description:{
    type:String,
   },
   done:{
    type:Boolean,
    default:false
   }
    
})
const todo=new mongoose.model("toDo",todoSchema)
module.exports=todo