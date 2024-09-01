const express=require("express")
const app=express()
const connectdatabase=require("./server")
connectdatabase()
const cors = require("cors")
const todo=require("./todoRouter")
const path=require("path")
app.use(cors())
app.use(express.json())
app.use(todo)
app.use(express.static("build"))



// app.get("/",(req,res)=>{
//     res.send("Connection Successfull")
// })

app.use(express.static(path.join(__dirname,"../frontend/frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/frontend/build/index.html"))
})
app.listen(8000,()=>{
    console.log("connection successfull")
})