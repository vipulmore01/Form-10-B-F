import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MobilePanComponent from "./pages/Login/MobilePanComponent"
import { Home } from "./pages/Home/home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MobilePanComponent />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
