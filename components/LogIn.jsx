import React from "react"
import { auth } from "../firebase/firebase.js"
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"

export default function AboutPage() {

  const navigate = useNavigate()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  function handleChange(event){
    const {value} = event.target
    event.target.name === "email" ? setEmail(value) : setPassword(value)
  }

  const handleSubmit = async (event) => {
    //console.log(`email: ${email} password: ${password}`)
    event.preventDefault()
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        //console.log(userCredential)
        const user = userCredential.user
        user.accesToken = true
        localStorage.setItem("token", user.accesToken)
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/Inside")
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section className="sec-login">
        <h1>BE PRODUCTIVE</h1>
        <div>
          <form>
              <label>
                  Email
              </label>
              <input name="email" type="email" placeholder="awesome@gmail.com" onChange={handleChange}/>
              <label>
                  Password
              </label>
              <input name="password" type="password" placeholder="********" onChange={handleChange}/>
              <button type="button" onClick={handleSubmit}>Log In</button>
          </form>
          <h3>You don't have account yet? <Link className="link-ref" to="/SignUp">click here</Link></h3>
        </div>
    </section>
  );
}