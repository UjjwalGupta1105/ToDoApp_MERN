const mongoose=require("mongoose")
const password = encodeURIComponent("Ujjwalgu9935@")

const connectdatabase=()=>{
    mongoose.connect(`mongodb+srv://rekhagu198:${password}@todoapp.c7wjs.mongodb.net/ToDoApp?retryWrites=true&w=majority`).then(()=>console.log("Database Connected")).catch((err)=>console.log(err))
}

module.exports=connectdatabase