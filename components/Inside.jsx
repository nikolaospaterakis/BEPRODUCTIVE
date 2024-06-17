
import React, { useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth, users, db } from "../firebase/firebase"
import { useNavigate, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGgCircle } from '@fortawesome/free-brands-svg-icons'
import { faBars } from "@fortawesome/free-solid-svg-icons"
import ToDoList from "./ToDoList"
import { nanoid } from "nanoid"
import { addDoc, collection, doc, getDocs, onSnapshot, query, where, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { async } from "@firebase/util"
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons"

//          <FontAwesomeIcon icon={faGgCircle}/>

export default function Layout() {

    const usersRef = collection(db, "users")
    const pass =  localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()
    const [toDoList, setToDoList] = React.useState([])
    const [favoriteList, setFavoriteList] = React.useState([])
    const [completedList, setCompletedList] = React.useState([])
    const [id, setId] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [txt, setTxt] = React.useState("")
    const [timerOn, setTimerOn] = React.useState(false)
    const [duration, setDuration] = React.useState(0)
    const [menuOn, setMenuOn] = React.useState(false)


    const menuStyle = {
        backgroundColor: menuOn ? "white" : "transparent",
        height: menuOn ? "100%" : "",
        alignItems: menuOn ? "flex-start" : "center",
        width: menuOn ? "50%" : "100%",
        right: menuOn ? "0" : "",
        flexDirection: menuOn ? "row-reverse" : "row",
        borderLeft: menuOn ? "2px solid black" : "none",
        borderRadius: menuOn ? ".5em" : "0",
        gridTemplateAreas: menuOn 
            ?   `
                "m" 
                "t" 
                "b" 
                `
            : `"t m"`,
        gridTemplateRows: menuOn ? "1f 10fr 4fr" : "auto",
        gridTemplateColumns: menuOn ? "auto" : "14fr 1fr",
        paddingBottom : "1em"
    }
    
    const menuH1Style = {
        gridArea: "t",
        justifySelf: "center",
        fontSize: menuOn ? "1.2em" : "1.8em"
    }

    const menuIconStyle = {
        gridArea: "m"
    }

    const menuButtonStyle = {
        gridArea: "b",
        display: menuOn ? "inline" : "none",
        alignSelf: "flex-end",
        justifySelf: "center"
    }

    const menuMyPro = {
        display: menuOn ? "inline" : "none"
    }

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
                setCompletedList(doc.data().completedList)
            })
        })
        
    }, [toDoList.length || favoriteList.length])

    const email = user.email

    async function newToDo(){
        const newToDo = {
            id: nanoid(),
            title: title,
            isFinished: false,
            isFavorite: false,
            isOn: false,
            duration: duration
        }
        setToDoList(prevToDo => [...prevToDo, newToDo ])
        setTxt("")
    }

    async function updateBase(){
        const docRef = doc(db, 'users', `${id}`)
        updateDoc(docRef, {
            todoList: toDoList,
            favoriteList: favoriteList,
            completedList: completedList
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
                isFinished: false,
                title: item.title,
                isOn: false
            } ])
        }
        
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
        console.log(completedList)
        if(item.isFinished){
            setCompletedList(oldCompletedList => [...oldCompletedList, item])
            setToDoList(oldToDoList => oldToDoList.filter(todo => todo.id !== item.id))
        } else {
            setToDoList(oldToDoList => oldToDoList.filter(todo => todo.id !== item.id))
        }
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

    function addFromFavToList(item){
        const doesExist = toDoList.filter(todo => todo.id === item.id)
        doesExist.length > 0 
            ? (
                setToDoList(prevToDo => [...prevToDo, item ])
            )
            : setToDoList(prevToDo => [...prevToDo, item ])
    }

    function reverseIt(item){
        setToDoList(oldToDoList => oldToDoList.map(todo => {
            return todo.id === item.id ? {
                ...item,
                isOn: !item.isOn
            } : todo
        }))
    }
    

    updateBase()
    
    return pass ? (
        <section id="sec-inside">
            <div className="nav" style={menuStyle}>
                <div className="inner-menu">
                    <h1 style={menuH1Style}>BE PRODUCTIVE</h1>     
                    <Link style={menuMyPro} className="link-to-mypro" to="/MyProductivity">MyProductivity</Link>
                    <Link style={menuMyPro} className="link-to-mygroup" to="/MyGroup">MyGroup</Link>
                </div>
                {menuOn 
                    ? <FontAwesomeIcon
                        style={menuIconStyle} 
                        icon={faRectangleXmark} 
                        className="icon-menu" 
                        onClick={() => setMenuOn(prevValue => !prevValue)} 
                    /> 
                    : <FontAwesomeIcon
                        style={menuIconStyle} 
                        icon={faBars} 
                        className="icon-menu" 
                        onClick={() => setMenuOn(prevValue => !prevValue)}
                    />}
                    <button style={menuButtonStyle} id="out" type="button" onClick={handleLogOut}>Log out</button>
            </div>
            <div className="toDoList">
                <ToDoList 
                    items={toDoList}
                    favItems={favoriteList}
                    txt={txt}
                    addItem={newToDo}
                    finishIt={finishIt}
                    handleChange={(event) => handleChange(event.target.value)}
                    deleteIt={deleteIt}
                    favoreIt={favoreIt}
                    addFromFavToList={addFromFavToList}
                    timerOn={timerOn}
                    reverseIt={reverseIt}
                />
            </div>
        </section>
  ) : <section>
        <FontAwesomeIcon icon={faGgCircle} />
        <h2>You have to log in first</h2>
        <Link className="lmust" to="/LogIn">Log In</Link>
    </section>
};