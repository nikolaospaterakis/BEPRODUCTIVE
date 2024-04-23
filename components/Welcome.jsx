import React from "react"
import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <section id="sec">
        <h1>BE PRODUCTIVE</h1>
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGlzNmQ0cmhnMHJoOWhtN2JwNWVnbTJoMHJzYno0YmtycnE0dXNybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iidFTlW3p3G9i/giphy.gif"/>
        <div className="footer">
            <Link className="link" to="/LogIn">Log In</Link> 
            <Link className="link" to="/SignUp">Sign Up </Link>
        </div>
    </section>
  );
}