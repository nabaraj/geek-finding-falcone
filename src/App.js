import React from "react";
import "./App.css";
import Appcontainer from "./components/AppContainer";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header></Header>
      <main className="container">
        <h1 className="text-center">Finding Falcone!</h1>
        <Appcontainer />
      </main>
    </div>
  );
}

export default App;
