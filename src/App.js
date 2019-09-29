import React from "react";
import "./App.css";
import Appcontainer from "./components/AppContainer";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header></Header>
      <div className="container">
        <h1 className="text-center">Finding Falcone!</h1>
        <Appcontainer />
      </div>
    </div>
  );
}

export default App;
