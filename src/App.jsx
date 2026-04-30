import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

      {/* ✅ OUTSIDE Routes */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;