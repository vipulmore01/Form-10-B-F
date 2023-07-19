import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/loginComponent"
import { Home } from "./pages/Home/home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
