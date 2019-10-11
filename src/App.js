import React from "react";
import "./App.css";
import Appcontainer from "./components/AppContainer";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header></Header>
      <main className="container">
        <div className="blurBg">
          <h1 className="text-center pageHeading">Finding Falcone!</h1>
          <Appcontainer />
        </div>
      </main>
      <div className="imageBg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,192L60,186.7C120,181,240,171,360,160C480,149,600,139,720,154.7C840,171,960,213,1080,202.7C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default App;
