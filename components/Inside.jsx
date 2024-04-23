import React from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useNavigate, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGgCircle } from '@fortawesome/free-brands-svg-icons'
import ToDoList from "./ToDoList"
import { nanoid } from "nanoid"

//          <FontAwesomeIcon icon={faGgCircle}/>

export default function Layout() {
    
    const navigate = useNavigate()
    const [toDoList, setToDoList] = React.useState([])
    const [title, setTitle] = React.useState("")
    const [txt, setTxt] = React.useState("")

    const handleLogOut = async (event) => {
        await signOut(auth)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/LogIn")
    }
   
    const pass =  localStorage.getItem("token")

    function newToDo(){
        const newToDo = {
            id: nanoid(),
            title: title,
            isFinished: false
        }
        setToDoList(prevToDo => [newToDo, ...prevToDo])
        setTxt("")
    }

    function handleChange(value){
        setTitle(value)
        setTxt(value)
    }

    function finishIt(item){
        setToDoList(oldToDoList => oldToDoList.map(todo => {
            return todo.id === item.id ? {
                ...item,
                isFinished: !item.isFinished
            } : todo
        }))
    }

    function deleteIt(item){
        setToDoList(oldToDoList => oldToDoList.filter(todo => todo.id !== item.id))
    }
    
    return pass ? (
        <section id="sec-inside">
            <h1>BE PRODUCTIVE</h1>
            <div>
                <ToDoList 
                    items={toDoList}
                    txt={txt}
                    addItem={newToDo}
                    reverseIt={finishIt}
                    handleChange={(event) => handleChange(event.target.value)}
                    deleteIt={deleteIt}
                />
            </div>
            <button id="out" type="button" onClick={handleLogOut}>Get out...</button>
        </section>
  ) : <section>
        <FontAwesomeIcon icon={faGgCircle} />
        <h2>You have to log in first</h2>
        <Link className="lmust" to="/LogIn">Log In</Link>
    </section>
};