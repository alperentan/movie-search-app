import React from "react";
import { NavBar, Favorites, SearchBody } from "./components";
import { Routes, Route, HashRouter } from "react-router-dom";
function App() {
  return (
    <>
      <NavBar />
      <HashRouter>
        <Routes>
          <Route path="/" element={<SearchBody />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
