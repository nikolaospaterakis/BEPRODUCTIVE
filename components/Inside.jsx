
import React, { useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth, users, db } from "../firebase/firebase"
import { useNavigate, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGgCircle } from '@fortawesome/free-brands-svg-icons'
import ToDoList from "./ToDoList"
import { nanoid } from "nanoid"
import { addDoc, collection, doc, getDocs, onSnapshot, query, where, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { async } from "@firebase/util"

//          <FontAwesomeIcon icon={faGgCircle}/>

export default function Layout() {

    const usersRef = collection(db, "users")
    const pass =  localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()
    const [toDoList, setToDoList] = React.useState([])
    const [favoriteList, setFavoriteList] = React.useState([])
    const [id, setId] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [txt, setTxt] = React.useState("")

    const handleLogOut = async (event) => {
        await signOut(auth)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/LogIn")
    }
    
    
    React.useEffect(() => {
        const q = query(usersRef, where("email", "==", `${email}`))
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                setId(doc.id)
                setToDoList(doc.data().todoList)
                setFavoriteList(doc.data().favoriteList)
            })
        })
        
    }, [toDoList.length || favoriteList.length])

    const email = user.email

    async function newToDo(){
        const newToDo = {
            id: nanoid(),
            title: title,
            isFinished: false,
            isFavorite: false
        }
        setToDoList(prevToDo => [...prevToDo, newToDo ])
        setTxt("")
    }

    async function updateBase(){
        const docRef = doc(db, 'users', `${id}`)
        updateDoc(docRef, {
            todoList: toDoList,
            favoriteList: favoriteList
        })
    }

    function updateFavoriteList(item){
        let exists = false
        const wantedFav = favoriteList.filter(fav => {
            return fav.id === item.id ? fav : ""
       })
        wantedFav.length > 0 ? (
            exists = !exists
        ) : ""
        
        if(exists){
            setFavoriteList(oldFavoriteList => oldFavoriteList.filter(fav => fav.id !== item.id))
        } else {
            setFavoriteList(oldFavoriteList => [...oldFavoriteList, {
                id: item.id,
                isFavorite: true,
                isFinished: item.isFinished,
                title: item.title
            } ])
        }
        
    }


    updateBase()

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

    function favoreIt(item){
        setToDoList(oldToDoList => oldToDoList.map(todo => {
            return todo.id === item.id ? {
                ...item,
                isFavorite: !item.isFavorite
            } : todo
        }))
        updateFavoriteList(item)
    }
    
    return pass ? (
        <section id="sec-inside">
            <h1>BE PRODUCTIVE</h1>
            <div>
                <ToDoList 
                    items={toDoList}
                    favItems={favoriteList}
                    txt={txt}
                    addItem={newToDo}
                    reverseIt={finishIt}
                    handleChange={(event) => handleChange(event.target.value)}
                    deleteIt={deleteIt}
                    favoreIt={favoreIt}
                />
            </div>
            <button id="out" type="button" onClick={handleLogOut}>Log out</button>
        </section>
  ) : <section>
        <FontAwesomeIcon icon={faGgCircle} />
        <h2>You have to log in first</h2>
        <Link className="lmust" to="/LogIn">Log In</Link>
    </section>
};