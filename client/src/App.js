import { useState, useEffect, useContext } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* protected route */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
