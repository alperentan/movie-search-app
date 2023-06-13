import React from "react";
import { NavBar, Favorites } from "./components";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/">
        <NavBar />
      </Route>
      <Route path="/favorites">
        <Favorites />
      </Route>
    </Routes>
  );
}

export default App;
