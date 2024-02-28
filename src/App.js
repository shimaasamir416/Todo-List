import React, { useState ,useEffect} from 'react';
import './App.css';
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodo,setTodo] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodo,setCompletedTodo] = useState([]);
  


  const handleAddTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription,
    };
    let updatedTodoArr = [...allTodo];
    updatedTodoArr.push(newTodoItem);
    setTodo(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };
  const handleDeleteTodo = index=>{
    let reducedTodo = [...allTodo];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodo(reducedTodo);
  }

  const handleDeleteCompletedTodo = index=>{
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodo',JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);
  };

  const handleComplete = index=> {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy= now.getFullYear();
    let h =now.getHours();
    let m =now.getMinutes();
    let s =now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s ;
    let filteredItem ={...allTodo[index],completedOn:completedOn,} 



    let updatedcompletedArr = [...completedTodo];
    updatedcompletedArr.push(filteredItem);
    setCompletedTodo(updatedcompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodo', JSON.stringify(updatedcompletedArr))
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let saveCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
    if(savedTodo){
      setTodo(savedTodo);
    }
    if(saveCompletedTodo){
      setCompletedTodo(saveCompletedTodo);
    }
  },[])
  return (
    <div className="App">
      <h1>My To Do List</h1>
      <div className='list-wrapper'>
        <div className='list-input'>
          <div className='list-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Enter your Task" />
          </div>
          <div className='list-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Enter your Task Description" />
          </div>
          <div className='list-input-item'>
            <button type="button" onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>To Do</button>
          <button className={`secondBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen===false && allTodo.map ((item, index)=> {
            return(
              <div className='todo-list-item' key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              <div>
                <MdDeleteOutline className='icon' onClick={()=> handleDeleteTodo (index)} title="delete?"/>
                <FaCheck className='check-icon' onClick={()=> handleComplete(index)} title="complete?"/>
              </div>
            </div>
            )
          })}

          {isCompleteScreen===true && completedTodo.map ((item, index)=> {
              return(
                <div className='todo-list-item' key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small> Completed on: {item.completedOn}</small></p>
                <div>
                  <MdDeleteOutline className='icon' onClick={()=> handleDeleteCompletedTodo (index)} title="Delete?"/>
                  {/* <FaCheck className='check-icon' onClick={()=> handleComplete(index)} title="complete?"/> */}
                </div>
              </div>
              );
            })}

        </div>
      </div>
    </div>
  );
}

export default App;
