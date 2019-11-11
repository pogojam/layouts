import React from "react";
import "./App.css";
import { Layout } from "./bindings/layout";

const pages = [
  {
    bg: "#0000",
    direction: "center"
  },
  {
    bg: "pink",
    direction: "right"
  },
  {
    bg: "orange",
    direction: "bottom"
  }
];

function App() {
  return (
    <div className="App">
      <Layout pages={pages} />
    </div>
  );
}

export default App;
