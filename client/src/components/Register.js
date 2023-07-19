import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    let tempObj = {
      user_name: userName,
      email: email,
      password: password,
    };
    try {
      const response = await API.post("/users", JSON.stringify(tempObj), {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      console.log(JSON.stringify(response));
      setSuccess("Success");
    } catch (err) {
      console.log("Error:");
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <label>User Name</label>
        <br />
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <br />

        <label>Email</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br />
        <br />
        <button type="submit">Submit</button>
        {success && <p>{success}</p>}
      </form>
      <Link to="/home">Home</Link> <br />
    </div>
  );
};

export default Register;
