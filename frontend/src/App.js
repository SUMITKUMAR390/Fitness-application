import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkoutPage from "./pages/WorkoutPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout/:id" element={<WorkoutPage />} />
      </Routes>
    </>
  );
}

export default App;
