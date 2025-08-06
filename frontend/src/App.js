import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileGenerator from "./components/ProfileGenerator";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileGenerator />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;