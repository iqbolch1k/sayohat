import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Tours from "./pages/Tours"
import TourDetail from "./pages/TourDetail"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tours" element={<Tours/>}/>
        <Route path="/tours/tour/:id" element={<TourDetail/>}/>
      </Routes>
    </div>
  )
}

export default App