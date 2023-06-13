import React from "react";
import { NavBar, Favorites } from "./components";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
