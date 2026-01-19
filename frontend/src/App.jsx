import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Lifestyle from "./pages/Lifestyle";
import Food from "./pages/Food";
import Wishlists from "./pages/Wishlists";
import PostDetails from "./components/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/food" element={<Food />} />
        <Route path="/wishlists" element={<Wishlists />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
