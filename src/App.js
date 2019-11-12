import React from "react";
import "./App.css";
import { Layout } from "./bindings/layout";

const pages = [
  {
    bg: "brown",
    direction: "center"
  },
  {
    bg: "pink",
    direction: "right"
  },
  {
    bg: "red",
    direction: "right"
  },
  {
    bg: "orange",
    direction: "down"
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
