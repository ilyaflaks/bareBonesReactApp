import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import API from "../api/axios";

const Login = () => {
  const { setAuth } = useAuth();
  const [logEmail, setLogEmail] = useState("");
  const [logPwd, setLogPwd] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmitLog = async (e) => {
    e.preventDefault();

    try {
      let tempObj = { email: logEmail, password: logPwd };
      const response = await API.post("/users/login", JSON.stringify(tempObj), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      tempObj.password = null;
      setAuth(true);
      setSuccess("Success");
    } catch (err) {
      console.log("There was a problem");
      console.log(err);
      setSuccess("Error");
    }
  };
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmitLog}>
        <label>Email</label>
        <br />
        <input
          type="text"
          id="email"
          value={logEmail}
          onChange={(e) => {
            setLogEmail(e.target.value);
          }}
        ></input>
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          id="password"
          value={logPwd}
          onChange={(e) => {
            setLogPwd(e.target.value);
          }}
        ></input>
        <br />
        <button type="submit">Submit</button>
        <br />
        {success && <p>{success}</p>}
      </form>
      <Link to="/home">Home</Link> <br />
    </div>
  );
};

export default Login;
