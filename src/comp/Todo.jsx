import TodoCss from "./todo.module.css"
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import Task from "./Task";
function Todo() {

        const [task,setTask] = useState("")
        const [complete, setComplete] = useState("")
        const [remaining, setRemaining] = useState("")
        const [total, setTotal] = useState("")
        const darkMode = useRef();
        const darkModeIcon = useRef();


        const todoData = JSON.parse(localStorage.getItem("todo_items")) || []

        const [alltodo,setAllTodo] = useState(todoData)

        function handleForm(e){
            e.preventDefault();
            if(!task){
                toast.error("please add task 😊")
            }else{
                let isVerified = alltodo.some((value,index) => {
                    return value.todoTask.toLowerCase() === task.toLowerCase();
                })

                if(isVerified){
                    toast.error("task already added ❌")
                    setTask("")
                }else{
                     setAllTodo([...alltodo, {todoTask: task, complete: false}])
                     toast.success("task added✅")
                setTask("");  
                } 
            }
        }
        function handleCheck(id){
            const copyofAllTodo = [...alltodo];
            copyofAllTodo[id].complete = !copyofAllTodo[id].complete;
            setAllTodo(copyofAllTodo)
        } 
        function handleDelete(id){
          const copyofAllTodo = [...alltodo]
          const deletedValue = copyofAllTodo.filter((value,index)=> { 
            return index !== id;
          });
          setAllTodo(deletedValue)
        }
        function handleUpdate(id){
            const copyofAllTodo = [...alltodo]
            let oldTask = copyofAllTodo[id].todoTask
            let newTask = prompt(`Update Task :- ${oldTask}`, oldTask)
            const newObj = {todoTask: newTask, complete: false}

            copyofAllTodo.splice(id,1,newObj)
            setAllTodo(copyofAllTodo)
        }
        useEffect(() => {
            const copyofAllTodo = [...alltodo];
            const completeTasks = copyofAllTodo.filter((value,index) => {
                return value.complete;
            })

            const remainingTasks = copyofAllTodo.filter((value,index) => {
                return !value.complete;
            })
             const totalTasks = copyofAllTodo.filter((value,index) => {
                return value;
            })

            setComplete(completeTasks.length)
            setRemaining(remainingTasks.length)
            setTotal(totalTasks.length)

            localStorage.setItem("todo_items", JSON.stringify(copyofAllTodo))

        }, [alltodo])
       function handleDarkMode(){
        const bgcolor = darkMode.current.style.backgroundColor;
        if(bgcolor ==="" || bgcolor ==="white"){
            darkMode.current.style.backgroundColor = "black";
            darkMode.current.style.color = "white";
            darkModeIcon.current.className = "bi bi-toggle-on";  
        }else{
            darkMode.current.style.backgroundColor = "white";
            darkMode.current.style.color = "black";
            darkModeIcon.current.className = "bi bi-toggle-off";
        }
       }
       function handleClearAll(){
            setAllTodo([])
       }
    return ( 
        <div ref={darkMode}>
              <div className={TodoCss.main}>
                <div>
                    <form action="" onSubmit={handleForm}>
                        <h1 className="text-center">Todo Application 📝 <i className="bi bi-toggle-off" ref={darkModeIcon} onClick={handleDarkMode}></i></h1>
                        <Task ctask = {complete} rtask = {remaining} ttask ={total}/>
                        <input type="text" name="" id="" className={TodoCss.input_box}
                        value={task}
                        onChange={(e)=>{setTask(e.target.value)}}
                        placeholder="What would you like to do?"/>
                        <input type="submit" value="Add Task" className={TodoCss.btn}/>
                       {alltodo.length === 0 ? <h5 className="text-center">No Task added😒</h5>:alltodo.map((items,index) => (
                            <ul key={index}>
                                <input type="checkbox" name="" id="" className="me-3" checked={items.complete}  onClick={() =>{handleCheck(index)}}/>
                                <span className="fw-bold fs-4" style={{textDecoration: items.complete? "line-through" : "none"}}>{items.todoTask}
                                </span>
                                <i className="bi bi-trash3-fill text-danger fs-4 float-end " onClick={() => {
                                    handleDelete(index)
                                }}></i>
                                <i className="bi bi-pencil-square text-success float-end me-2" onClick={() => {
                                    handleUpdate(index)
                                }}></i>
                            </ul>
                           ))
                        }   
                    </form>
                    <button className={TodoCss.btn_clear} onClick={handleClearAll}>Clear All Task</button>
                </div>
              </div>
        </div>
     );
}

export default Todo;