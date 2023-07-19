import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import API from "../api/axios";
import RequireAuth from "./RequireAuth"; //remove later

const Home = () => {
  const { auth, setAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>Welcome!</p>
      <br />
      {auth ? <p>You are logged in</p> : <p>You are not logged in</p>}
      <Link to="/login">Login</Link> <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <div>
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
