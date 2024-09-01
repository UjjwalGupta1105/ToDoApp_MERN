import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

function App() {
  const [data,newData]=useState({
    name:"",
    description:"",
    done:false,
  });

  // To get Data from Local Storage
  const getList=async()=>{
    const list=await axios.get("http://localhost:8000/todo").then((res)=>newList(res.data)).catch((err)=>console.log(err))
   }

  //  Creating all state variables
  
  const [List,newList]=useState([])

  const [updateIcon,setUpdateIcon]=useState(false)
  const [updateItem,setUpdateItem]=useState("")
  const [search,setSearch]=useState("")
  let [filteredList,setFilteredList]=useState("")

  // Renders List on first Render
  useEffect(()=>{
    getList()
  },[])
  

//  Updating or Adding Data in the Local Storage if any change occurs in the List...
  const changed=(e)=>{
      newData({...data,[e.target.name]:e.target.value})
  }

  // Adding or Updating a name(ToDo)...
const clicked=async()=>{
    if(updateItem){
      const _id=updateItem
      await axios.patch(`http://localhost:8000/todo/${_id}`,data)
        getList()
        setUpdateItem("") 
        setUpdateIcon(false)
    }
    else{
      const name=data.name
      const description=data.description
      async function upload(){
        await axios.post("http://localhost:8000/todo",{name,description})
        getList()
      }
      upload()
     }

  newData({
    name:"",
    description:"",
    done:false
  })
}

// Deleting a Task
const cancel=async(_id)=>{
  console.log(_id)
  await axios.delete(`http://localhost:8000/todo/${_id}`)
  getList()
}

// Updating the Task List
const update=async(_id)=>{
    setUpdateIcon(true)
  const item=List.find((item)=>{
    return item._id===_id
  })
  newData({
    name:item.name,
    description:item.description,
    done:item.done
  })
  setUpdateItem(item._id)
}

// Description showcase handing
const showDescription=(_id,key)=>{

    if(document.getElementById(_id).style.display=="none"){
        document.getElementById(_id).style.display="block"
        document.getElementById(key).innerHTML=`<span>🡹</span>`
    }
    else{
        document.getElementById(_id).style.display="none"
        document.getElementById(key).innerHTML=`<span> 🡻 </span>`

    }
}

// Search Handling
const searchTask=(name)=>{
    setSearch(name)

    setFilteredList(
        List.filter((elemnt,index)=>{
        return elemnt.name.toLowerCase().includes(name.toLowerCase())
     }))
}

// Checkbox Handling
const setData=async(_id)=>{
  const item=List.find((item)=>{
    return item._id===_id
  })
  await axios.patch(`http://localhost:8000/todo/${_id}`,{done:!item.done})
  getList()
}

// User Intereface[UI] of the ToDo Web Page... 
 return (<>
      <div className="main">
          <h1>To Do list</h1>
          <div className='superSend'>

             </div>
          
          <input type='text' className='search' value={search} name="search" onChange={(e)=>searchTask(e.target.value)} placeholder='Search for a Task...'></input>
          <div className='input-section'>

             <div>
                 <input type='text' value={data.name} name="name" onChange={changed} placeholder='Add a Item....'></input>
                <input type='text' value={data.description} name="description" onChange={changed} placeholder='Description....'></input>
            </div>
            <div>
                { updateIcon ?  <button  className='submitButton' onClick={clicked}>Edit</button> :  <button className='submitButton' onClick={clicked}>Add ToDo</button> }
            </div>

          </div>

          <div>

          <ol>

     { search ?  
         ( filteredList && ( filteredList.map((items,key)=>{
          return(
            <>
                <div className='items'>
                    <li>
                              <div className='item-name'>{items.name}</div><br/>
                              <div  className="des" id={items._id}>{items.description}</div>
                    </li>

                    <div className="allButtons">
                        <Checkbox className='checkBox' type='checkBox' checked={items.done} name="done" onChange={()=>setData(`${items._id}`)}  />
                        <button className='des-button' id={key} onClick={()=>showDescription(`${items._id}`,`${key}`)}>🡹</button>
                        <button onClick={()=>{
                              cancel(`${items._id}`)
                          }}><DeleteIcon/></button>
                        <button onClick={()=>{
                            update(`${items._id}`)
                        }}><EditIcon/></button>

                    </div>
                </div>
            </>
                          
                          )
                  })
                     
    ) ) 

              :
               
 List && (List.map((items,key)=>{
         return(
            <>
                <div className='items'>
                    <li>
                              <div className='item-name'>{items.name}</div><br/>
                              <div  className="des" id={items._id}>{items.description}</div>
                    </li>

                    <div className="allButtons">
                        <Checkbox className='checkBox' type='checkBox' checked={items.done} name="done" onChange={()=>setData(`${items._id}`)}  />
                        <button className='des-button' id={key} onClick={()=>showDescription(`${items._id}`,`${key}`)}>🡹</button>
                        <button onClick={()=>{
                              cancel(`${items._id}`)
                          }}><DeleteIcon/></button>
                        <button onClick={()=>{
                            update(`${items._id}`)
                        }}><EditIcon/></button>

                    </div>
                </div>
            </>
                          
          )
       })) 
       }
              </ol>
          </div>
      </div>
  </>)
}

export default App;
