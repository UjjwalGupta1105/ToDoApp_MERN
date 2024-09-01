const express=require("express")
const router=express.Router()
const todo=require("./todoModel")
router.use(express.json())

router.get("/todo",async(req,res)=>{
    try {
        const todos=await todo.find()
        res.status(200).send(todos)
    } catch (error) {
        res.status(400).send(error)
    }
   
})
router.post("/todo",async(req,res)=>{
    try {
        console.log("Came")
        const {name,description}=req.body
        const newTodo=new todo({
            name,description
        })
        console.log(newTodo)
        const savenewTodo=await newTodo.save()
        console.log("Done")
        res.status(200).send(savenewTodo)
    } catch (error) {
        res.status(400).send("Facing some issue in saving ToDo")
    }
})
router.patch("/todo/:id",async(req,res)=>{
    try {
        const update=await todo.findByIdAndUpdate(req.params.id,req.body)
        await update.save()
       res.status(201).send({
        success:true
       })
    } catch (error) {
        res.status(400).send("Your Request Cannot be Processed at This Time....")
    }
})
router.delete("/todo/:id",async(req,res)=>{
    try {
        console.log("camo")
        console.log(req.params.id)
        const names=await todo.findByIdAndDelete(req.params.id)

        res.status(201).send({
           success:true
          })
    } catch (error) {
        res.status(400).send("Facing issue In Deleting todo....")
    }

})

module.exports=router