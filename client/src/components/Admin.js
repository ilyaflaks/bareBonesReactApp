import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import API from "../api/axios";
//import axios from "axios";

const Admin = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [userData, setUserData] = useState([]);
  const { auth } = useAuth();

  const handleShowUsers = async (e) => {
    try {
      const response = await API.get("/users", {
        withCredentials: true,
      });

      const users = response.data.data;
      setUserData(users);
      setShowUsers((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have been assigned an Admin role if you can see this.</p>
      <button onClick={handleShowUsers}>Show Users</button>
      {showUsers && (
        <div>
          <h2>Our valued users:</h2>
          <ul>
            {userData.map((u, i) => {
              return (
                <li key={i}>
                  {u.userName}, {u.email}, member since:
                  {u.dateRegistered.substring(0, 10)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
