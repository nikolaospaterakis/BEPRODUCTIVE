import React from "react"
import { auth, db, users } from "../firebase/firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"

export default function AboutPage() {
    
  const navigate = useNavigate()  
    
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [email, setEmail] = React.useState("")

  function handleChange(event){
    const {value} = event.target
    event.target.name === "username" ? setUsername(value) : (
        event.target.name === "email" ? setEmail(value) : setPassword(value)
    )
  }

  const handleSubmit = async (event) => {
    console.log(`username: ${username} password: ${password} email: ${email}`)
    event.preventDefault()
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential)
        const user = userCredential.user
        const userInfo = {
            id: userCredential.user.uid,
            username: username
        }
        const newUser = await addDoc(users, userInfo)
        localStorage.setItem("token", user.accessToken)
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/Inside")
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section>
        <h1>BE PRODUCTIVE</h1>
        <form>
            <label>
                Username
            </label>
            <input name="username" type="text" placeholder="themostproductiveever" onChange={handleChange}/>
            <label>
                Email
            </label>
            <input name="email" type="email" placeholder="awesome@gmail.com" onChange={handleChange}/>
            <label>
                Password
            </label>
            <input name="password" type="password" placeholder="********" onChange={handleChange}/>
            <button type="button" onClick={handleSubmit}>Sign Up</button>
        </form>
        <h3>Already have an account? <Link className="link-ref" to="/LogIn">click here</Link></h3>
    </section>
  );
}