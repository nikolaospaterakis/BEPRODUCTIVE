import React from "react"
import { Outlet } from "react-router-dom";

const user = localStorage.getItem("login")

//console.log(user)

export default function Layout() {
  return (
    <main id="welcome-main">
      <Outlet />
    </main>
  )
};