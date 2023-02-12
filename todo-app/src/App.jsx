import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
import {IoMdMicrophone} from "react-icons/io"
import {BsFillMicFill} from "react-icons/bs"
import "./App.css";
function App() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [searchword, setSearchword] = useState("");
  const [speak,setSpeak]=useState("")
  function HandleTask(e) {
    // e.preventDefault();
    setTask(e.target.value);
  }
  function HandleSubmit() {
    const obj = {
      id: nanoid(3),
      todo: task,
      deleted: false,
      completed: false,
    };
    if (obj.todo !== "") {
      setTodo([...todo, obj]);
      setTask("");
    }
  }
  function HandleDelete(i) {
    console.log(i);
    todo.splice(i, 1);
    setTodo([...todo]);
  }
  function HandleComplete(i) {
    console.log(i);
    todo[i].completed = !todo[i].completed;
    setTodo([...todo]);
  }
  function HandleSpeak(){
    const SpeechRecognition = window.webkitSpeechRecognition;
const speech = new SpeechRecognition();
speech.onresult = event => {
 console.log(event);
 setSearchword(event.results[0][0].transcript)
}
speech.start()
}
function HandleTodoSpeak(){
const SpeechRecognition = window.webkitSpeechRecognition;
const speech = new SpeechRecognition();
speech.onresult = event => {
 console.log(event);
 setSpeak(event.results[0][0].transcript)
}
speech.start()
const obj = {
  id: nanoid(3),
  todo: speak,
  deleted: false,
  completed: false,
}
if(obj.todo!== ""){
setTodo([...todo, obj]);
setTask("");
}
  }
  return (
    <div className="App">
      <h5>Total Task {todo.filter((x) => x.completed === false).length}</h5>
      <h1>Todo List</h1>
     
        <input
          value={searchword} type="search"
          onChange={(e) => setSearchword(e.target.value)}
        />
        <button onClick={HandleSpeak}><BsFillMicFill/></button>
        <br />
        <input value={task} onChange={HandleTask} />
        <button onClick={HandleSubmit}>Add Task</button>
        <button onClick={HandleTodoSpeak}><IoMdMicrophone/></button>
         
      <ol>
        {todo
          ?.filter((x) =>
            x.todo.toLowerCase().includes(searchword.toLowerCase())
          )
          .map((x, i) => {
            return (
              <li
                key={x.id}
                style={{
                  textDecoration: x.completed ? "line-through" : "none",
                }}
              >
                {x.todo}
                <button onClick={(e) => HandleDelete(x.id)}>Delete</button>
                <button onClick={(e) => HandleComplete(i)}>Complete</button>
              </li>
            )
          })}
      </ol>
    </div>
  );
}
export default App;
