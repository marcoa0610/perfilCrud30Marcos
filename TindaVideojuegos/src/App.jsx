import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "../src/pages/Home";
import NotFound from "./pages/PageNotFound";
import Users from "./pages/Games";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/games/:id?" element={<Users />} />
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users/:id?" element={<Users />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
