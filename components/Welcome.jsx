import React from "react"
import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <section>
        <h1>BE PRODUCTIVE</h1>
        <img src="../img/happy.jpg"/>
        <div className="footer">
            <Link className="link" to="/LogIn">Log In</Link> 
            <Link className="link" to="/SignUp">Sign Up </Link>
        </div>
    </section>
  );
}