import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
    <Route path="/authSignup" element={<Signup />} />
    <Route path="/authLogin" element={<Login />} />
    <Route path="/" element={<Home />} />
    </Routes>
  )
}


