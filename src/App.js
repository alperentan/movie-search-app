import React from "react";
import { NavBar, Favorites } from "./components";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route exact path="/" element={<NavBar />} />
      <Route exact path="/favorites" element={<Favorites />} />
    </Switch>
  );
}

export default App;
