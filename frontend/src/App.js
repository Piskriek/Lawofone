import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileGenerator from "./components/ProfileGenerator";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;