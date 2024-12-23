import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/Home"
import CustomPage from "./Pages/CustomPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/custom" element={<CustomPage />} />
      </Routes>
    </Router>
  );
};

export default App;
