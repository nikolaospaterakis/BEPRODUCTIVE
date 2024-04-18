import React from "react"
import { Outlet } from "react-router-dom";

const Protected = () => {
    const token = localStorage.getItem("token")
}

return (
    token ? <Outlet /> : <Navigate to="LogIn" />
)

export default Protected