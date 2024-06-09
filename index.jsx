import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx"
import Welcome from "./components/Welcome.jsx"
import LogIn from "./components/LogIn.jsx"
import SignUp from "./components/SignUp.jsx"
import Inside from "./components/Inside.jsx"
import MyPro from "./components/MyPro.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout />}>
          <Route index element={<Welcome />} />
          <Route path="LogIn" element={<LogIn />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Inside" element={<Inside />} />
          <Route path="MyProductivity" element={<MyPro />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)